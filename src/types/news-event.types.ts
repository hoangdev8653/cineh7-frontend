export interface INewsEvent {
    id: string;
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    type: 'NEWS' | 'EVENT';
    created_at: string;
}

export interface NewsEventDto {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    type: 'NEWS' | 'EVENT';
}
