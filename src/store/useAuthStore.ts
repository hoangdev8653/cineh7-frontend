import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, IUser } from '../types/auth.types';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isInitialized: false,

            setAuth: (user: IUser, accessToken: string) =>
                set({ user, accessToken, isInitialized: true }),

            setAccessToken: (accessToken: string) =>
                set({ accessToken }),

            clearAuth: () =>
                set({ user: null, accessToken: null, isInitialized: true }),

            setInitialized: (value: boolean) =>
                set({ isInitialized: value }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
