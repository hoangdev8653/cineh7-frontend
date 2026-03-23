import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllOverview, getRevenue, getTopMovie, getOrders } from '../apis/statistics';

export const useGetAllOverview = () => {
    return useQuery({
        queryKey: ['overview'],
        queryFn: async () => {
            const response = await getAllOverview();
            // console.log(response);

            return response.data;
        }
    });
}

export const useGetRevenue = (period: string) => {
    return useQuery({
        queryKey: ['revenue', period],
        queryFn: async () => {
            const response = await getRevenue(period);
            return response.data;
        }
    });
}

export const useGetTopMovie = () => {
    return useQuery({
        queryKey: ['top-movie'],
        queryFn: async () => {
            const response = await getTopMovie();
            return response.data;
        }
    });
}

export const useGetOrders = (period: string) => {
    return useQuery({
        queryKey: ['orders', period],
        queryFn: async () => {
            const response = await getOrders(period);
            return response.data;
        }
    });
}
