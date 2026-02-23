import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, CheckCircle2, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/path';

const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log('Login data:', data);
        // Xử lý logic đăng nhập ở đây (gọi API)
    };

    return (
        <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center p-4 text-[#1e293b]">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-10 transition-all">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Đăng nhập</h1>
                    <p className="text-[#64748b] text-sm">Vui lòng nhập thông tin tài khoản để tiếp tục</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#1e293b] block" htmlFor="email">
                            Email
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-blue-600 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                {...register('email')}
                                type="email"
                                id="email"
                                placeholder="hhoang@gmail.com"
                                className={`w-full bg-[#f8fafc] border ${errors.email ? 'border-red-500' : 'border-[#e2e8f0]'
                                    } rounded-xl py-2.5 pl-11 pr-4 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#1e293b] block" htmlFor="password">
                            Mật khẩu
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-blue-600 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                {...register('password')}
                                type="password"
                                id="password"
                                placeholder="••••••••••"
                                className={`w-full bg-[#f8fafc] border ${errors.password ? 'border-red-500' : 'border-[#e2e8f0]'
                                    } rounded-xl py-2.5 pl-11 pr-4 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Utilities */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                            <div className="relative w-5 h-5">
                                <input
                                    {...register('rememberMe')}
                                    type="checkbox"
                                    className="peer hidden"
                                />
                                <div className="w-5 h-5 border-2 border-[#e2e8f0] rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all" />
                                <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xs text-[#64748b] group-hover:text-[#1e293b] transition-colors">
                                Ghi nhớ đăng nhập
                            </span>
                        </label>
                        <Link
                            to="#"
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>

                {/* Alternatives (Login with Email/Social) */}
                <div className="mt-8">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#f1f5f9]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-[#94a3b8] font-medium tracking-wider">Hoặc tiếp tục với</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 border border-[#e2e8f0] rounded-xl py-2.5 hover:bg-[#f8fafc] transition-colors group">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            <span className="text-sm font-semibold text-[#475569]">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-[#e2e8f0] rounded-xl py-2.5 hover:bg-[#000] hover:text-white transition-colors group text-[#475569]">
                            <Github size={20} />
                            <span className="text-sm font-semibold group-hover:text-white">Github</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-10">
                    <p className="text-sm text-[#64748b]">
                        Chưa có tài khoản?{' '}
                        <Link
                            to={PATH.REGISTER}
                            className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;