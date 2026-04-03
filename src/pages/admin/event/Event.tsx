import React, { useState, useEffect } from 'react';
import { useEvents, useEventMutations } from '../../../hooks/useEvent';
import type { IEvent } from '../../../types/event.types';
import NewsEventHeader from './EventHeader';
import NewsEventFilters from './EventFilters';
import NewsEventTable from './EventTable';
import NewsEventForm from './EventForm';
import DeleteNewsEventModal from './DeleteEventModal';
import AdminPagination from '../../../components/common/AdminPagination';

const NewsEvent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'NEWS' | 'EVENT'>('ALL');
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data: newsEvents, isLoading: isLoadingList } = useEvents();
    const { createEvent: createNewsEvent, updateEvent: updateNewsEvent, deleteEvent: deleteNewsEvent } = useEventMutations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IEvent | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, typeFilter]);

    const filteredItems = newsEvents?.filter((item: IEvent) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
        return matchesSearch && matchesType;
    }) || [];

    const totalItems = filteredItems.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(totalItems / limit) || 1;

    const handleOpenAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: IEvent) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('type', data.type);

        if (data.thumbnail && data.thumbnail.length > 0) {
            formData.append('thumbnail', data.thumbnail[0]);
        }

        if (editingItem) {
            updateNewsEvent.mutate({ id: editingItem.id, eventDto: formData }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createNewsEvent.mutate(formData, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (itemToDelete) {
            deleteNewsEvent.mutate(itemToDelete, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    if (paginatedItems.length === 1 && page > 1) {
                        setPage(page - 1);
                    }
                }
            });
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <NewsEventHeader
                totalItems={newsEvents?.length || 0}
                onAdd={handleOpenAdd}
            />
            <NewsEventFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
            />
            <div className="flex flex-col gap-4">
                <NewsEventTable
                    items={paginatedItems}
                    isLoading={isLoadingList}
                    onEdit={handleOpenEdit}
                    onDelete={(id) => {
                        setItemToDelete(id);
                        setIsDeleteModalOpen(true);
                    }}
                />
                {!isLoadingList && (
                    <AdminPagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
            {isModalOpen && (
                <NewsEventForm
                    key={editingItem?.id || 'new'}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    editingItem={editingItem}
                    isPending={createNewsEvent.isPending || updateNewsEvent.isPending}
                />
            )}
            <DeleteNewsEventModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isPending={deleteNewsEvent.isPending}
            />
        </div>
    );
};

export default NewsEvent;
