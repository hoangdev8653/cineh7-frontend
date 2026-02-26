export interface INewsEvent {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    type: 'NEWS' | 'EVENT';
    createdAt: string;
}

export interface NewsEventDto {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    type: 'NEWS' | 'EVENT';
}
