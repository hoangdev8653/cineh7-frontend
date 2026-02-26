export interface IUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    avatar?: string;
}

export interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    isInitialized: boolean;
    setAuth: (user: IUser, accessToken: string) => void;
    setAccessToken: (accessToken: string) => void;
    clearAuth: () => void;
    setInitialized: (value: boolean) => void;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
}
