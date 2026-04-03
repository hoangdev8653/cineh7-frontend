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
    setUser: (user: IUser) => void;
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

export interface ForgotPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    newPassword: string;
    token: string;
}

export interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface EditRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingUser: IUser | null;
    onRoleChange: (role: string) => void;
    isLoading: boolean;
}

export interface UserPaginationProps {
    totalUsers: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

export interface UserTableProps {
    users: IUser[] | undefined;
    isLoading: boolean;
    onEditRole: (user: IUser) => void;
    onDeleteUser: (userId: string) => void;
}