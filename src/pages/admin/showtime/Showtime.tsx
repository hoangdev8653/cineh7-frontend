import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useShowTimes, useShowTimeMutations } from '../../../hooks/useShowTime';
import { useMovies } from '../../../hooks/useMovie';
import { useRooms } from '../../../hooks/useRoom';
import { useTheaters } from '../../../hooks/useTheater';
import type { IShowtime } from '../../../types/showtime.types';
import { type ShowtimeFormData } from '../../../schema/showtime';

import ShowtimeHeader from './ShowtimeHeader';
import ShowtimeSearch from './ShowtimeSearch';
import ShowtimeList from './ShowtimeList';
import ShowtimeFormModal from './ShowtimeFormModal';
import ShowtimeDeleteModal from './ShowtimeDeleteModal';
import ShowtimePagination from './ShowtimePagination';

const Showtime: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data: showtimes, isLoading: isLoadingShowtimes } = useShowTimes({ page, limit });
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
                onSuccess: () => {
                    toast.success('Cập nhật lịch chiếu thành công!');
                    setIsModalOpen(false);
                },
                onError: () => {
                    toast.error('Cập nhật lịch chiếu thất bại!');
                }
            });
        } else {
            createShowTime.mutate(data, {
                onSuccess: () => {
                    toast.success('Tạo lịch chiếu thành công!');
                    setIsModalOpen(false);
                },
                onError: () => {
                    toast.error('Tạo lịch chiếu thất bại! Vui lòng kiểm tra lại.');
                }
            });
        }
    };

    const handleDelete = () => {
        if (showtimeToDelete) {
            deleteShowTime.mutate(showtimeToDelete, {
                onSuccess: () => {
                    toast.success('Xóa lịch chiếu thành công!');
                    setIsDeleteModalOpen(false);
                },
                onError: () => {
                    toast.error('Xóa lịch chiếu thất bại!');
                }
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
                movies={movies as any}
                rooms={rooms || []}
                theaters={theaters as any}
                isPending={createShowTime.isPending || updateShowTime.isPending}
            />

            <ShowtimeDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />

            {!isLoadingShowtimes && (showtimes?.total || 0) > 0 && (
                <ShowtimePagination
                    totalShowtimes={showtimes.total}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
};

export default Showtime;
