export interface IEvent {
    id: string;
    type: 'NEWS' | 'EVENT';
    title: string;
    slug: string;
    thumbnail: string;
    content: string;
    created_at: string;
}

export interface EventDto {
    type: 'NEWS' | 'EVENT';
    title: string;
    slug: string;
    thumbnail: File | string;
    content: string;
}
