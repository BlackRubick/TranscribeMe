import create from 'zustand';

type User = {
  email: string;
  name?: string; // Solo si es necesario
};

type UserStore = {
  user: User | null;
  set: (user: User) => void;
  clear: () => void; // Método para limpiar datos del usuario
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  set: (user) => set(() => ({ user })),
  clear: () => set(() => ({ user: null })),
}));
