import axiosInstance from "../utils/axios-Instance"


export const getReviewByMovie = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/review/movie/${id}`,
    })
}

export const createReview = async (reviewDto: any) => {
    return await axiosInstance({
        method: 'POST',
        url: '/review',
        data: reviewDto,
    })
}

export const updateReview = async (id: string, reviewDto: any) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/review/${id}`,
        data: reviewDto,
    })
}

export const deleteReview = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/review/${id}`,
    })
}