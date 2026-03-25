export interface MovieMetadata {
    director: string;
    actors: string[];
    rating: string;
    genre: string;
    language: string;
}

export interface IMovie {
    id: string;
    title: string;
    slug: string;
    trailer: string;
    description: string;
    releaseDate: string;
    rating: number;
    duration: number;
    poster?: string;
    comingSoon: boolean;
    isShowing: boolean;
    created_at: string;
    updated_at?: string;
    metadata?: MovieMetadata;
}

export interface MovieDto {
    title: string;
    slug: string;
    trailer: File | string;
    description: string;
    releaseDate: string;
    rating: number;
    duration: number;
    poster: File | string;
    comingSoon: boolean;
    isShowing: boolean;
}
