import { PermissionStatus, createPermissionHook, EventEmitter, Platform } from 'expo-modules-core';
import { isAudioEnabled, throwIfAudioIsDisabled } from './AudioAvailability';
import { RecordingOptionsPresets } from './RecordingConstants';
import { Sound } from './Sound';
import ExponentAV from './ExponentAV'; // Asegúrate de que la ruta es correcta

const _DEFAULT_PROGRESS_UPDATE_INTERVAL_MILLIS = 5000; // Define un valor por defecto

let _recorderExists = false;
const eventEmitter = Platform.OS === 'android' ? new EventEmitter(ExponentAV) : null;

/**
 * Checks user's permissions for audio recording.
 * @return A promise that resolves to an object of type `PermissionResponse`.
 * @platform android
 * @platform ios
 */
export async function getPermissionsAsync() {
    return ExponentAV.getPermissionsAsync();
}

/**
 * Asks the user to grant permissions for audio recording.
 * @return A promise that resolves to an object of type `PermissionResponse`.
 * @platform android
 * @platform ios
 */
export async function requestPermissionsAsync() {
    return ExponentAV.requestPermissionsAsync();
}

/**
 * Check or request permissions to record audio.
 * This uses both `requestPermissionAsync` and `getPermissionsAsync` to interact with the permissions.
 *
 * @example
 * ```ts
 * const [permissionResponse, requestPermission] = Audio.usePermissions();
 * ```
 */
export const usePermissions = createPermissionHook({
    getMethod: getPermissionsAsync,
    requestMethod: requestPermissionsAsync,
});

export class Recording {
    _subscription = null;
    _canRecord = false;
    _isDoneRecording = false;
    _finalDurationMillis = 0;
    _uri = null;
    _onRecordingStatusUpdate = null;
    _progressUpdateTimeoutVariable = null;
    _progressUpdateIntervalMillis = _DEFAULT_PROGRESS_UPDATE_INTERVAL_MILLIS;
    _options = null;

    _cleanupForUnloadedRecorder = async (finalStatus) => {
        this._canRecord = false;
        this._isDoneRecording = true;
        this._finalDurationMillis = finalStatus?.durationMillis ?? 0;
        _recorderExists = false;
        if (this._subscription) {
            this._subscription.remove();
            this._subscription = null;
        }
        this._disablePolling();
        return await this.getStatusAsync(); // Automatically calls onRecordingStatusUpdate for the final state.
    };

    _pollingLoop = async () => {
        if (isAudioEnabled() && this._canRecord && this._onRecordingStatusUpdate != null) {
            this._progressUpdateTimeoutVariable = setTimeout(this._pollingLoop, this._progressUpdateIntervalMillis);
            try {
                await this.getStatusAsync();
            } catch {
                this._disablePolling();
            }
        }
    };

    _disablePolling() {
        if (this._progressUpdateTimeoutVariable != null) {
            clearTimeout(this._progressUpdateTimeoutVariable);
            this._progressUpdateTimeoutVariable = null;
        }
    }

    _enablePollingIfNecessaryAndPossible() {
        if (isAudioEnabled() && this._canRecord && this._onRecordingStatusUpdate != null) {
            this._disablePolling();
            this._pollingLoop();
        }
    }

    _callOnRecordingStatusUpdateForNewStatus(status) {
        if (this._onRecordingStatusUpdate != null) {
            this._onRecordingStatusUpdate(status);
        }
    }

    async _performOperationAndHandleStatusAsync(operation) {
        throwIfAudioIsDisabled();
        if (this._canRecord) {
            const status = await operation();
            this._callOnRecordingStatusUpdateForNewStatus(status);
            return status;
        } else {
            throw new Error('Cannot complete operation because this recorder is not ready to record.');
        }
    }

    static createAsync = async (options = RecordingOptionsPresets.LOW_QUALITY, onRecordingStatusUpdate = null, progressUpdateIntervalMillis = null) => {
        const recording = new Recording();
        if (progressUpdateIntervalMillis) {
            recording._progressUpdateIntervalMillis = progressUpdateIntervalMillis;
        }
        recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
        await recording.prepareToRecordAsync({
            ...options,
            keepAudioActiveHint: true,
        });
        try {
            const status = await recording.startAsync();
            return { recording, status };
        } catch (err) {
            recording.stopAndUnloadAsync();
            throw err;
        }
    };

    getStatusAsync = async () => {
        // Automatically calls onRecordingStatusUpdate.
        if (this._canRecord) {
            return this._performOperationAndHandleStatusAsync(() => ExponentAV.getAudioRecordingStatus());
        }
        const status = {
            canRecord: false,
            isRecording: false,
            isDoneRecording: this._isDoneRecording,
            durationMillis: this._finalDurationMillis,
        };
        this._callOnRecordingStatusUpdateForNewStatus(status);
        return status;
    };

    setOnRecordingStatusUpdate(onRecordingStatusUpdate) {
        this._onRecordingStatusUpdate = onRecordingStatusUpdate;
        if (onRecordingStatusUpdate == null) {
            this._disablePolling();
        } else {
            this._enablePollingIfNecessaryAndPossible();
        }
        this.getStatusAsync();
    }

    setProgressUpdateInterval(progressUpdateIntervalMillis) {
        this._progressUpdateIntervalMillis = progressUpdateIntervalMillis;
        this.getStatusAsync();
    }

    async prepareToRecordAsync(options = RecordingOptionsPresets.LOW_QUALITY) {
        throwIfAudioIsDisabled();
        if (_recorderExists) {
            throw new Error('Only one Recording object can be prepared at a given time.');
        }
        if (this._isDoneRecording) {
            throw new Error('This Recording object is done recording; you must make a new one.');
        }
        if (!options || !options.android || !options.ios) {
            throw new Error('You must provide recording options for android and ios in order to prepare to record.');
        }
        const extensionRegex = /^\.\w+$/;
        if (!options.android.extension ||
            !options.ios.extension ||
            !extensionRegex.test(options.android.extension) ||
            !extensionRegex.test(options.ios.extension)) {
            throw new Error(`Your file extensions must match ${extensionRegex.toString()}.`);
        }
        if (!this._canRecord) {
            if (eventEmitter) {
                this._subscription = eventEmitter.addListener('Expo.Recording.recorderUnloaded', this._cleanupForUnloadedRecorder);
            }
            const { uri, status } = await ExponentAV.prepareAudioRecorder(options);
            _recorderExists = true;
            this._uri = uri;
            this._options = options;
            this._canRecord = true;
            const currentStatus = { ...status, canRecord: true };
            this._callOnRecordingStatusUpdateForNewStatus(currentStatus);
            this._enablePollingIfNecessaryAndPossible();
            return currentStatus;
        } else {
            throw new Error('This Recording object is already prepared to record.');
        }
    }

    async getAvailableInputs() {
        return ExponentAV.getAvailableInputs();
    }

    async getCurrentInput() {
        return ExponentAV.getCurrentInput();
    }

    async setInput(inputUid) {
        return ExponentAV.setInput(inputUid);
    }

    async startAsync() {
        return this._performOperationAndHandleStatusAsync(() => ExponentAV.startAudioRecording());
    }

    async pauseAsync() {
        return this._performOperationAndHandleStatusAsync(() => ExponentAV.pauseAudioRecording());
    }

    async stopAndUnloadAsync() {
        if (!this._canRecord) {
            if (this._isDoneRecording) {
                throw new Error('Cannot unload a Recording that has already been unloaded.');
            } else {
                throw new Error('Cannot unload a Recording that has not been prepared.');
            }
        }

        let stopResult;
        let stopError;
        try {
            stopResult = await ExponentAV.stopAudioRecording();
        } catch (err) {
            stopError = err;
        }

        if (Platform.OS === 'web' && stopResult?.uri !== undefined) {
            this._uri = stopResult.uri;
        }

        await ExponentAV.unloadAudioRecorder();
        const status = await this._cleanupForUnloadedRecorder(stopResult);
        return stopError ? Promise.reject(stopError) : status;
    }

    getURI() {
        return this._uri;
    }

    async createNewLoadedSoundAsync(initialStatus = {}, onPlaybackStatusUpdate = null) {
        if (this._uri == null || !this._isDoneRecording) {
            throw new Error('Cannot create sound when the Recording has not finished!');
        }
        return Sound.createAsync(
            { uri: this._uri }, initialStatus, onPlaybackStatusUpdate, false
        );
    }
}
export { PermissionStatus };
export * from './RecordingConstants';
export * from './Recording.types';
