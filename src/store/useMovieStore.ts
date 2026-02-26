import { create } from 'zustand';

interface MovieState {
    searchQuery: string;
    filterStatus: 'ALL' | 'NOW_SHOWING' | 'COMING_SOON' | 'END_SHOWING';
    setSearchQuery: (query: string) => void;
    setFilterStatus: (status: 'ALL' | 'NOW_SHOWING' | 'COMING_SOON' | 'END_SHOWING') => void;
    resetFilters: () => void;
}

export const useMovieStore = create<MovieState>((set) => ({
    searchQuery: '',
    filterStatus: 'ALL',
    setSearchQuery: (query) => set({ searchQuery: query }),
    setFilterStatus: (status) => set({ filterStatus: status }),
    resetFilters: () => set({ searchQuery: '', filterStatus: 'ALL' }),
}));
