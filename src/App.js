import React, { useEffect, useState } from 'react';
import { fetchTickets } from './api'; // Adjust the import based on your structure
import Card from './components/card'; // Make sure to import the Card component
import Filters from './components/Filters'; // Import Filters component
import StatusIndicator from './components/StatusIndicator'; // Import StatusIndicator component

const App = () => {
    const [tickets, setTickets] = useState([]); // Initialize tickets as an empty array
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [sortOption, setSortOption] = useState('priority'); // Default sorting by priority
    const [groupByOption, setGroupByOption] = useState('status'); // Default grouping by status

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets(); // Fetch the data
                console.log('Fetched data:', data); // Log the fetched data
                setTickets(data.tickets); // Set tickets state to the tickets array
                setFilteredTickets(data.tickets); // Initialize filtered tickets
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        getTickets();
    }, []);

    const getSortedTickets = (tickets) => {
        if (!Array.isArray(tickets)) {
            console.error('Tickets is not an array:', tickets);
            return []; // Return an empty array if not valid
        }
        return tickets.sort((a, b) => b[sortOption] - a[sortOption]);
    };

    const sortedTickets = getSortedTickets(filteredTickets);

    return (
        <div>
            <Filters setSortOption={setSortOption} setFilteredTickets={setFilteredTickets} />
            <StatusIndicator />
            <div className="kanban-boards">
                {sortedTickets.map((ticket) => (
                    <Card key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default App;
