export const formatDateTime = (dateStr: string) => {
    try {
        const date = new Date(dateStr);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    } catch (e) {
        return { date: dateStr, time: '' };
    }
};
