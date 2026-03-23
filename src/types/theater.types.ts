export interface ITheater {
    id: string;
    name: string;
    address: string;
    location: string;
    logo: string | null;
    system_id: string;
    system: {
        id: string;
        name: string;
        logo: string;
        description: string;
    };
    created_at: string;
}

export interface TheaterDto {
    name: string;
    address: string;
    location: string;
    system_id: string;
    logo?: string | null;
}
