export const SAMPLE_SEATS = Array.from({ length: 100 }, (_, i) => ({
    soGhe: i + 1,
    trangThai: Math.random() > 0.1 ? "Trong" : "DaDat",
    loaiGhe: i < 20 ? "Vip" : "Thuong"
}));
