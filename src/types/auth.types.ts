export interface IUser {
    id: string;
    email: string;
    full_name?: string;
    name?: string;
    role: string;
    avatar?: string;
    auth_method?: string;
    is_active?: boolean;
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
    full_name: string;
    phone?: string;
}
