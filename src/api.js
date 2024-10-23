export const fetchTickets = async () => {
    try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Returns the entire data object which includes tickets and users
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        return { tickets: [] }; // Return an object with tickets as an empty array
    }
};
