import React, { useEffect, useState } from 'react';
import { fetchTickets } from './api';
import Card from './components/card';
import Filters from './components/Filters';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [sortOption, setSortOption] = useState('priority');
    const [groupByOption, setGroupByOption] = useState('status');

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data.tickets);
                setFilteredTickets(data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        getTickets();
    }, []);

    const getSortedTickets = (tickets) => {
        if (!Array.isArray(tickets)) return [];
        return [...tickets].sort((a, b) => b[sortOption] - a[sortOption]);
    };

    const groupTickets = (tickets) => {
        if (!Array.isArray(tickets)) return {};

        return tickets.reduce((groups, ticket) => {
            const groupKey = ticket[groupByOption] || 'Uncategorized';
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(ticket);
            return groups;
        }, {});
    };

    const sortedTickets = getSortedTickets(filteredTickets);
    const groupedTickets = groupTickets(sortedTickets);

    const boardStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
        padding: '16px',
    };

    return (
        <div>
            <h1>Kanban Board</h1>
            <Filters setSortOption={setSortOption} setFilteredTickets={setFilteredTickets} />

            <div className="group-selector">
                <label>Group By:</label>
                <select
                    value={groupByOption}
                    onChange={(e) => setGroupByOption(e.target.value)}
                >
                    <option value="status">Status</option>
                    <option value="userId">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            {Object.keys(groupedTickets).map((group) => (
                <div key={group}>
                    <h2>{group}</h2>
                    <div style={boardStyle}>
                        {groupedTickets[group].map((ticket) => (
                            <Card key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
