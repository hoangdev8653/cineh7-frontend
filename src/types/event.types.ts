import { z } from "zod";
import { newsEventSchema } from "../schema/event";

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

export interface DeleteNewsEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

export interface NewsEventFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    typeFilter: 'ALL' | 'NEWS' | 'EVENT';
    onTypeFilterChange: (value: 'ALL' | 'NEWS' | 'EVENT') => void;
}

export interface NewsEventHeaderProps {
    totalItems: number;
    onAdd: () => void;
}

export interface NewsEventTableProps {
    items: IEvent[];
    isLoading: boolean;
    onEdit: (item: IEvent) => void;
    onDelete: (id: string) => void;
}

export type NewsEventFormData = z.infer<typeof newsEventSchema>;

export interface NewsEventFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NewsEventFormData) => void;
    editingItem: IEvent | null;
    isPending: boolean;
}