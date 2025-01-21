export interface User {
  walletAddress: string;
  name: string;
}

export interface UserCreateDTO {
  walletAddress: string;
}

export interface UserUpdateDTO {
  walletAddress: string;
  name: string;
}

export interface ServiceResponse<T> {
  message: string;
  data?: T;
  error?: {
    error: string;
    message: string;
  };
}
