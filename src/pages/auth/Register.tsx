import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, Github, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/path';

const registerSchema = z.object({
    full_name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),

});

type RegisterFormValues = z.infer<typeof registerSchema>;

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        console.log('Register data:', data);
        // Xử lý logic đăng ký ở đây (gọi API)
    };

    return (
        <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl shadow-blue-900/5 p-4 md:p-6 my-2 text-[#1e293b]">
                {/* Header */}
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold mb-2">Đăng ký</h1>
                    <p className="text-[#64748b] text-sm">Tham gia cộng đồng CineH7 để nhận ưu đãi</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                    {/* Full Name Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold block" htmlFor="full_name">
                            Họ và tên
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-blue-600 transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                {...register('full_name')}
                                type="text"
                                id="full_name"
                                placeholder="Nguyễn Văn A"
                                className={`w-full bg-[#f8fafc] border ${errors.full_name ? 'border-red-500' : 'border-[#e2e8f0]'
                                    } rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.full_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold block" htmlFor="email">
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
                                placeholder="example@gmail.com"
                                className={`w-full bg-[#f8fafc] border ${errors.email ? 'border-red-500' : 'border-[#e2e8f0]'
                                    } rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold block" htmlFor="password">
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
                                    } rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-[#94a3b8] text-sm`}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none mt-4"
                    >
                        {isSubmitting ? 'Đang khởi tạo...' : 'Đăng ký tài khoản'}
                    </button>
                </form>

                {/* Social Register */}
                <div className="mt-4">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#f1f5f9]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-[#94a3b8] font-medium tracking-wider">Hoặc đăng ký bằng</span>
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
                <div className="text-center mt-8">
                    <p className="text-sm text-[#64748b]">
                        Đã có tài khoản?{' '}
                        <Link
                            to={PATH.LOGIN}
                            className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;