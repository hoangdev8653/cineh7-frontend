import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, MessageCircle, ChevronUp } from 'lucide-react';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative">
            <footer className="bg-[#0b0c10] text-[#9ca3af] pt-8 pb-8 border-t border-white/5">
                <div className="container mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-16">
                    {/* Column 1: VỀ CINE-H7 */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-white font-bold text-xl uppercase mb-3">Về CINE-H7</h4>
                            <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                        </div>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="#" className="hover:text-white transition-colors">Hệ thống rạp</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Cụm rạp</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Liên hệ</Link></li>
                        </ul>

                    </div>

                    {/* Column 2: QUY ĐỊNH & ĐIỀU KHOẢN */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-white font-bold text-xl uppercase mb-3 text-nowrap">Quy định & điều khoản</h4>
                            <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                        </div>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="#" className="hover:text-white transition-colors">Quy định thành viên</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Điều khoản</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Hướng dẫn đặt vé trực tuyến</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Quy định và chính sách chung</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors text-nowrap">Chính sách bảo vệ thông tin cá nhân</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: CHĂM SÓC KHÁCH HÀNG */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-white font-bold text-xl uppercase mb-3">Chăm sóc khách hàng</h4>
                            <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                        </div>
                        <div className="space-y-3 text-sm font-medium">
                            <p><span className="text-white">Hotline:</span> 1900 1234</p>
                            <p><span className="text-white">Giờ làm việc:</span> 9:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ, Tết)</p>
                            <p><span className="text-white">Email hỗ trợ:</span> cskh@cineh7.com.vn</p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-lg uppercase mb-6 tracking-wider">Mạng xã hội</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-[#3b5998] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/20">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#ff0000] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-24 flex flex-col gap-4 z-[100]">
                <a href="tel:19001234" className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg hover:animate-pulse transition-all">
                    <Phone size={28} />
                </a>
                <a href="#" className="w-14 h-14 bg-gradient-to-tr from-[#006aff] to-[#00d2ff] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                    <MessageCircle size={28} />
                </a>
                <a href="#" className="w-14 h-14 bg-[#0068ff] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all font-bold text-sm italic">
                    Zalo
                </a>
                <button
                    onClick={scrollToTop}
                    className="w-14 h-14 bg-transparent border-2 border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white/10 transition-all mt-4"
                >
                    <ChevronUp size={28} />
                </button>
            </div>

            <div className="bg-[#151720] py-6 border-t border-white/5 text-center text-xs font-semibold tracking-wide text-gray-500">
                © 2024 CINE-H7. ALL RIGHTS RESERVED.
            </div>
        </div>
    );
}

export default Footer;
