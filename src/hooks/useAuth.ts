import { useMutation, useQueryClient } from "@tanstack/react-query"
import { forgotPassword, login, register, resetPassword } from "../apis/auth"
import type { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from "../types/auth.types"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { PATH } from "../utils/path"
import { setLocalStorage } from "../utils/localStorage"
import { toast } from "react-toastify"

export const useAuthMutations = () => {
    const queryClient = useQueryClient();
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: (loginDto: LoginDto) => login(loginDto),
        onSuccess: (data: any) => {
            const { user, access_token } = data.data;
            setAuth(user, access_token);
            setLocalStorage("user", user);
            setLocalStorage("access_token", access_token);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            if (user.role === "ADMIN") {
                navigate(PATH.ADMIN_LAYOUT);
            } else {
                navigate(PATH.USER_LAYOUT);
            }
        },
    });

    const registerMutation = useMutation({
        mutationFn: (registerDto: RegisterDto) => register(registerDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: (forgotPasswordDto: ForgotPasswordDto) => forgotPassword(forgotPasswordDto),
        onSuccess: () => {
            toast.success("Yêu cầu đã được gửi. Vui lòng kiểm tra email của bạn!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
        }
    });

    const resetPasswordMutation = useMutation({
        mutationFn: (resetPasswordDto: ResetPasswordDto) => resetPassword(resetPasswordDto),
        onSuccess: () => {
            toast.success("Mật khẩu của bạn đã được đặt lại thành công!");
            navigate(PATH.LOGIN);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Mã token không hợp lệ hoặc đã hết hạn");
        }
    });

    return {
        loginMutation,
        registerMutation,
        forgotPasswordMutation,
        resetPasswordMutation
    };
};