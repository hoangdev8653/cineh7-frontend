import React, { useState } from 'react';
import { useTheaters, useTheaterMutations } from '../../../hooks/useTheater';
import type { ITheater, TheaterDto } from '../../../types/theater.types';
import { useTheaterSystems } from '../../../hooks/useTheaterSystem';

import TheaterHeader from './components/TheaterHeader';
import TheaterSearch from './components/TheaterSearch';
import TheaterList from './components/TheaterList';
import TheaterFormModal from './components/TheaterFormModal';
import TheaterDeleteModal from './components/TheaterDeleteModal';

const Theater: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: theatersData, isLoading } = useTheaters({ page, limit });
    const { data: systemsData } = useTheaterSystems();
    const { createTheater, updateTheater, deleteTheater } = useTheaterMutations();

    console.log(theatersData);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTheater, setEditingTheater] = useState<ITheater | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [theaterToDelete, setTheaterToDelete] = useState<string | null>(null);

    const theaters = Array.isArray(theatersData?.data?.theater) ? theatersData?.data?.theater : (theatersData as any)?.data || [];
    const systems = Array.isArray(systemsData) ? systemsData : (systemsData as any)?.data || [];
    const totalPages = (theatersData as any)?.data?.totalPages || 1;

    const filteredTheaters = theaters.filter((t: ITheater) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleOpenAdd = () => {
        setEditingTheater(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (theater: ITheater) => {
        setEditingTheater(theater);
        setIsModalOpen(true);
    };

    const handleSubmit = (dto: TheaterDto) => {
        if (editingTheater) {
            updateTheater.mutate({ id: editingTheater.id, theaterDto: dto }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createTheater.mutate(dto, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (theaterToDelete) {
            deleteTheater.mutate(theaterToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <TheaterHeader onAdd={handleOpenAdd} />

            <TheaterSearch value={searchQuery} onChange={setSearchQuery} />

            <TheaterList
                theaterData={theatersData}
                isLoading={isLoading}
                onEdit={handleOpenEdit}
                onDelete={(id) => {
                    setTheaterToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <TheaterFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingTheater={editingTheater}
                onSubmit={handleSubmit}
                systems={systems}
                isPending={createTheater.isPending || updateTheater.isPending}
            />

            <TheaterDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Theater;
