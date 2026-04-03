import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { PATH } from "../../utils/path";
import { useAuthMutations } from "../../hooks/useAuth";
import { forgotPasswordSchema } from "../../schema/auth";

type ForgotFormValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
    const { forgotPasswordMutation } = useAuthMutations();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotFormValues) => {
        await forgotPasswordMutation.mutateAsync(data);
    };

    return (
        <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center p-4 text-[#1e293b]">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-10 transition-all">
                <div className="mb-8">
                    <Link
                        to={PATH.LOGIN}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Quay lại đăng nhập
                    </Link>
                </div>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Mail size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Quên mật khẩu?</h1>
                    <p className="text-[#64748b] text-sm">
                        Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1.5">
                        <label
                            className="text-sm font-semibold text-[#1e293b] block"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-blue-600 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                placeholder="hhoang@gmail.com"
                                className={`w-full bg-[#f8fafc] border ${errors.email ? "border-red-500" : "border-[#e2e8f0]"
                                    } rounded-xl py-2.5 pl-11 pr-4 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || forgotPasswordMutation.isSuccess}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            "Đang gửi..."
                        ) : forgotPasswordMutation.isSuccess ? (
                            "Đã gửi thành công"
                        ) : (
                            <>
                                <Send size={18} />
                                Gửi yêu cầu
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-10">
                    <p className="text-sm text-[#64748b]">
                        Cần hỗ trợ?{" "}
                        <Link
                            to={PATH.POLICY}
                            className="font-bold text-blue-600 hover:text-blue-700 transition-all"
                        >
                            Liên hệ chúng tôi
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
