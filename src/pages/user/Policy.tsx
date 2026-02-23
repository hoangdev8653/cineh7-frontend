
const Policy = () => {
    return (
        <div className="min-h-screen  py-12 px-4 sm:px-8 lg:px-16 text-[#1e293b]">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-600 to-indigo-700 -z-10 rounded-b-[3rem] opacity-10" />

            <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-16 border border-slate-100 relative overflow-hidden">
                {/* Glossy overlay */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

                <h1 className="text-5xl font-black text-center mb-16 text-[#0f172a] tracking-tight relative">
                    Chính sách <span className="text-blue-600">&</span> Điều khoản
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 relative">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">01</div>
                            <h2 className="text-2xl font-bold text-[#0f172a]">Điều khoản sử dụng</h2>
                        </div>
                        <p className="leading-relaxed text-[#475569] text-lg pl-1">
                            Chào mừng bạn đến với <span className="font-bold text-blue-600">CINE-H7</span>. Bằng cách sử dụng trang web của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào mà không cần thông báo trước.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl">02</div>
                            <h2 className="text-2xl font-bold text-[#0f172a]">Chính sách bảo mật</h2>
                        </div>
                        <p className="leading-relaxed text-[#475569] text-lg pl-1">
                            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Thông tin được thu thập chỉ nhằm mục đích nâng cao trải nghiệm người dùng và xử lý đặt vé. Chúng tôi không bao giờ chia sẻ dữ liệu của bạn cho bên thứ ba.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4 md:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">03</div>
                            <h2 className="text-3xl font-bold text-[#0f172a]">Chính sách đặt vé & Hoàn tiền</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="font-bold mb-2 text-blue-600">Không đổi trả</h4>
                                <p className="text-sm text-slate-500">Vé đã mua không thể thay đổi hoặc hoàn trả ngoại trừ các trường hợp do rạp quy định.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="font-bold mb-2 text-blue-600">Kiểm tra thông tin</h4>
                                <p className="text-sm text-slate-500">Vui lòng kiểm tra kỹ phim, suất chiếu và chỗ ngồi trước khi xác nhận thanh toán.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="font-bold mb-2 text-blue-600">Hoàn tiền 100%</h4>
                                <p className="text-sm text-slate-500">Trường hợp suất chiếu bị hủy, chúng tôi hỗ trợ hoàn tiền hoặc đổi suất chiếu khác.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4 md:col-span-2">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center font-black text-xl">04</div>
                            <h2 className="text-2xl font-bold text-[#0f172a]">Trách nhiệm người dùng</h2>
                        </div>
                        <p className="leading-relaxed text-[#475569] text-lg pl-1">
                            Bạn có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Nghiêm cấm sử dụng trang web cho các mục đích bất hợp pháp hoặc gây cản trở hoạt động của hệ thống CINE-H7. Mọi vi phạm sẽ bị xử lý theo quy định của pháp luật.
                        </p>
                    </section>
                </div>


            </div>
        </div>
    );
};

export default Policy;
