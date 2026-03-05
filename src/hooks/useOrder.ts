import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createOrder, deleteOrder, updateOrder } from "../apis/order"
import type { OrderDto } from "../types/order.types"

export const useOrderMutations = () => {
    const queryClient = useQueryClient();
    const createOrderMutation = useMutation({
        mutationFn: (orderDto: OrderDto) => createOrder(orderDto),
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    })
    const updateOrderMutation = useMutation({
        mutationFn: ({ id, orderDto }: { id: string, orderDto: OrderDto }) => updateOrder(id, orderDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    })
    const deleteOrderMutation = useMutation({
        mutationFn: (id: string) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    })
    return { createOrderMutation, updateOrderMutation, deleteOrderMutation }
}

// export const useOrderQueries = () => {
//     const getAllOrdersQuery = useQuery({
//         queryKey: ["orders"],
//         queryFn: () => getAllOrders(),
//     })
//     const getOrderByIdQuery = useQuery({
//         queryKey: ["order"],
//         queryFn: ({ id }: { id: string }) => getOrderById(id),
//     })
//     return { getAllOrdersQuery, getOrderByIdQuery }
// }