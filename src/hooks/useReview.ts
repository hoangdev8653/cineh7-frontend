import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createReview, deleteReview, updateReview, getReviewByMovie } from "../apis/review"

export const useReviewQuery = () => {
    const queryClient = useQueryClient();
    const createReviewMutation = useMutation({
        mutationFn: (reviewDto: any) => createReview(reviewDto),
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    })
    const updateReviewMutation = useMutation({
        mutationFn: ({ id, reviewDto }: { id: string, reviewDto: any }) => updateReview(id, reviewDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    })
    const deleteReviewMutation = useMutation({
        mutationFn: (id: string) => deleteReview(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    })
    const getReviewByMovieQuery = (id: string) => useQuery({
        queryKey: ["review-movie", id],
        queryFn: () => getReviewByMovie(id),
    })
    return { createReviewMutation, updateReviewMutation, deleteReviewMutation, getReviewByMovieQuery }
}