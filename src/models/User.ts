export type User = {
  email: string;
  name?: string; // Opcional si es necesario
  token: string; // Obligatorio
};

export type ChatScreenRouteProp = {
  params: {
    user: User;
    chatId: string;   
    userEmail: string;
  };
};
