import * as z from 'zod';
import { theaterSchema } from '../schema/theater';

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

export interface TheaterDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface TheaterHeaderProps {
    onAdd: () => void;
}

export interface TheaterListProps {
    theaterData?: any;
    isLoading: boolean;
    onEdit: (theater: ITheater) => void;
    onDelete: (id: string) => void;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface TheaterSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export type TheaterFormData = z.infer<typeof theaterSchema>;

export interface TheaterFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingTheater: ITheater | null;
    onSubmit: (data: TheaterDto | FormData) => void;
    systems: any[];
    isPending: boolean;
}