import React, { useState } from 'react';
import { useNewsEvents, useNewsEventMutations } from '../../../hooks/useNewsEvent';
import type { INewsEvent } from '../../../types/news-event.types';
import NewsEventHeader from './components/NewsEventHeader';
import NewsEventFilters from './components/NewsEventFilters';
import NewsEventTable from './components/NewsEventTable';
import NewsEventForm from './components/NewsEventForm';
import DeleteNewsEventModal from './components/DeleteNewsEventModal';

const NewsEvent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'NEWS' | 'EVENT'>('ALL');
    const { data: newsEvents, isLoading: isLoadingList } = useNewsEvents();
    const { createNewsEvent, updateNewsEvent, deleteNewsEvent } = useNewsEventMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<INewsEvent | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const filteredItems = newsEvents?.filter((item: INewsEvent) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
        return matchesSearch && matchesType;
    }) || [];


    const handleOpenAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: INewsEvent) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (data: any) => {
        if (editingItem) {
            updateNewsEvent.mutate({ id: editingItem.id, newsEventDto: data }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createNewsEvent.mutate(data, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (itemToDelete) {
            deleteNewsEvent.mutate(itemToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
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

            <NewsEventTable
                items={filteredItems}
                isLoading={isLoadingList}
                onEdit={handleOpenEdit}
                onDelete={(id) => {
                    setItemToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
                pagination={newsEvents ? {
                    page: newsEvents.page,
                    total: newsEvents.total,
                    totalPage: newsEvents.totalPage
                } : undefined}
            />

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
