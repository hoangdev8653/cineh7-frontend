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
    description: string;
    duration: number;
    releaseDate: string;
    trailer: string;
    poster?: string;
    rating: number;
    comingSoon: boolean;
    isShowing: boolean;
    slug: string;
    created_at: string;
    updated_at?: string;
    metadata?: MovieMetadata;
}

export interface MovieDto {
    title: string;
    description: string;
    duration: number;
    releaseDate: string;
    trailer: string;
    poster_url?: string;
    rating: number;
    comingSoon: boolean;
    isShowing: boolean;
    slug: string;
    metadata?: MovieMetadata;
}
