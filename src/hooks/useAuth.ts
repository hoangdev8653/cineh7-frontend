import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login, register } from "../apis/auth"
import type { LoginDto, RegisterDto } from "../types/auth.types"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { PATH } from "../utils/path"

export const useAuthMutations = () => {
    const queryClient = useQueryClient();
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: (loginDto: LoginDto) => login(loginDto),
        onSuccess: (data: any) => {
            const { user, accessToken } = data;
            setAuth(user, accessToken);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            navigate(PATH.USER_LAYOUT);
        },
    });

    const registerMutation = useMutation({
        mutationFn: (registerDto: RegisterDto) => register(registerDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });

    return {
        loginMutation,
        registerMutation,
    };
};