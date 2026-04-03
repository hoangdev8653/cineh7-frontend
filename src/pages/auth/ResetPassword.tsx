import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { PATH } from "../../utils/path";
import { useAuthMutations } from "../../hooks/useAuth";
import { resetPasswordSchema } from "../../schema/auth";

type ResetFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const { resetPasswordMutation } = useAuthMutations();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetFormValues) => {
        if (!token) return;
        await resetPasswordMutation.mutateAsync({
            newPassword: data.newPassword,
            token: token,
        });
    };

    return (
        <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center p-4 text-[#1e293b]">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-10 transition-all">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Đặt lại mật khẩu</h1>
                    <p className="text-[#64748b] text-sm">
                        Hãy thiết lập mật khẩu mới một cách an toàn và dễ nhớ nhé.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-1.5">
                        <label
                            className="text-sm font-semibold text-[#1e293b] block"
                            htmlFor="newPassword"
                        >
                            Mật khẩu mới
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-blue-600 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                {...register("newPassword")}
                                type="password"
                                id="newPassword"
                                placeholder="••••••••••"
                                className={`w-full bg-[#f8fafc] border ${errors.newPassword ? "border-red-500" : "border-[#e2e8f0]"
                                    } rounded-xl py-2.5 pl-11 pr-4 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label
                            className="text-sm font-semibold text-[#1e293b] block"
                            htmlFor="confirmPassword"
                        >
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-blue-600 transition-colors">
                                <ShieldCheck size={18} />
                            </div>
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                id="confirmPassword"
                                placeholder="••••••••••"
                                className={`w-full bg-[#f8fafc] border ${errors.confirmPassword ? "border-red-500" : "border-[#e2e8f0]"
                                    } rounded-xl py-2.5 pl-11 pr-4 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl space-y-2">
                        <p className="text-xs font-bold text-blue-700 flex items-center gap-2">
                            <CheckCircle2 size={14} />
                            Mật khẩu an toàn bao gồm:
                        </p>
                        <ul className="text-[10px] text-blue-600/80 space-y-1 font-medium list-disc list-inside">
                            <li>Độ dài tối thiểu 6 ký tự</li>
                            <li>Nên có cả chữ cái và chữ số</li>
                            <li>Hạn chế sử dụng các mật khẩu phổ biến</li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                    </button>
                </form>

                <div className="text-center mt-10">
                    <p className="text-sm text-[#64748b]">
                        Quay lại{" "}
                        <Link
                            to={PATH.LOGIN}
                            className="font-bold text-blue-600 hover:text-blue-700 transition-all"
                        >
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
