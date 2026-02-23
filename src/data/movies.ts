export interface Movie {
    id: number;
    title: string;
    image: string;
    tags: string[];
    rating: string;
}

export const SAMPLE_MOVIES: Movie[] = [
    {
        id: 1,
        title: "Captain Marvel",
        image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Hành Động", "Viễn Tưởng"],
        rating: "8.5"
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Siêu Anh Hùng", "Kịch Tính"],
        rating: "9.0"
    },
    {
        id: 3,
        title: "Spider-Man: No Way Home",
        image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Hành Động", "Phiêu Lưu"],
        rating: "8.7"
    },
    {
        id: 4,
        title: "Doctor Strange in the Multiverse of Madness",
        image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Phép Thuật", "Kinh Dị"],
        rating: "7.8"
    },
    {
        id: 5,
        title: "The Batman",
        image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Tội Phạm", "Hành Động"],
        rating: "8.3"
    },
    {
        id: 6,
        title: "Sonic the Hedgehog 2",
        image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        tags: ["Hoạt Hình", "Hài Hước"],
        rating: "7.5"
    }
];
