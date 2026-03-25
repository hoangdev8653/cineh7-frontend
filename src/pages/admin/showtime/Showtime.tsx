import React, { useState } from 'react';
import { useShowTimes, useShowTimeMutations } from '../../../hooks/useShowTime';
import { useMovies } from '../../../hooks/useMovie';
import { useRooms } from '../../../hooks/useRoom';
import { useTheaters } from '../../../hooks/useTheater';
import type { IShowtime } from '../../../types/showtime.types';
import type { IMovie } from '../../../types/movie.types';
import type { IRoom } from '../../../types/room.types';
import type { ITheater } from '../../../types/theater.types';
import { type ShowtimeFormData } from '../../../schema/showtime';

import ShowtimeHeader from './components/ShowtimeHeader';
import ShowtimeSearch from './components/ShowtimeSearch';
import ShowtimeList from './components/ShowtimeList';
import ShowtimeFormModal from './components/ShowtimeFormModal';
import ShowtimeDeleteModal from './components/ShowtimeDeleteModal';

const Showtime: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: showtimes, isLoading: isLoadingShowtimes } = useShowTimes();
    const { data: movies } = useMovies();
    const { data: rooms } = useRooms();
    const { data: theaters } = useTheaters();
    const { createShowTime, updateShowTime, deleteShowTime } = useShowTimeMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShowtime, setEditingShowtime] = useState<IShowtime | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showtimeToDelete, setShowtimeToDelete] = useState<string | null>(null);

    const filteredShowtimes = showtimes?.showtimes?.filter((s: IShowtime) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            s.movie?.title.toLowerCase().includes(searchLower) ||
            s.startTime.includes(searchLower)
        );
    }) || [];

    const handleOpenAdd = () => {
        setEditingShowtime(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (showtime: IShowtime) => {
        setEditingShowtime(showtime);
        setIsModalOpen(true);
    };

    const onSubmit = (data: ShowtimeFormData) => {
        if (editingShowtime) {
            updateShowTime.mutate({ id: editingShowtime.id, showTimeDto: data }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createShowTime.mutate(data, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (showtimeToDelete) {
            deleteShowTime.mutate(showtimeToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <ShowtimeHeader onAdd={handleOpenAdd} />

            <ShowtimeSearch value={searchQuery} onChange={setSearchQuery} />

            <ShowtimeList
                showtimes={filteredShowtimes}
                isLoading={isLoadingShowtimes}
                onEdit={handleOpenEdit}
                onDelete={(id) => {
                    setShowtimeToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
            />

            <ShowtimeFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingShowtime={editingShowtime}
                onSubmit={onSubmit}
                movies={(movies as IMovie[]) || []}
                rooms={(rooms as IRoom[]) || []}
                theaters={(theaters as ITheater[]) || []}
                isPending={createShowTime.isPending || updateShowTime.isPending}
            />

            <ShowtimeDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Showtime;
