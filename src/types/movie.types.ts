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
    release_date: string;
    video_url: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
    metadata: MovieMetadata;
}

export interface MovieDto {
    title: string;
    description: string;
    duration: number;
    release_date: string;
    video_url: string;
    poster_url?: string;
    metadata: MovieMetadata;
}
