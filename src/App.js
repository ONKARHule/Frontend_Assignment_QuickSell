import React, { useEffect, useState } from 'react';
import { fetchTickets } from './api';
import Card from './components/card'; // Ensure correct casing
import Filters from './components/Filters';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [sortOption, setSortOption] = useState('priority');
    const [groupByOption, setGroupByOption] = useState('status');

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data.tickets);
                setFilteredTickets(data.tickets);
                setUsers(data.users);
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

    const sortedTickets = getSortedTickets(filteredTickets);

    const boardStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
    };

    const getUserDetails = (userId) => users.find(user => user.id === userId);

    const groupTickets = (tickets) => {
        return tickets.reduce((groups, ticket) => {
            const groupKey = ticket[groupByOption];
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(ticket);
            return groups;
        }, {});
    };

    const groupedTickets = groupTickets(sortedTickets);

    const getPriorityTitle = (priority) => {
        switch (priority) {
            case 0: return 'No Priority';
            case 1: return 'Low';
            case 2: return 'Medium';
            case 3: return 'High';
            case 4: return 'Urgent';
            default: return 'Unknown Priority';
        }
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
                        
            <div style={{ display: 'flex', gap: '16px' }}>
                {Object.keys(groupedTickets).map((group) => (
                    <div key={group}>
                        <h2>
                            {groupByOption === 'userId' 
                                ? getUserDetails(group)?.name || 'Unknown User' 
                                : groupByOption === 'priority' 
                                ? getPriorityTitle(Number(group)) 
                                : group}
                            {' '}({groupedTickets[group].length})
                        </h2>
                        <div style={boardStyle}>
                            {groupedTickets[group].map((ticket) => {
                                const user = getUserDetails(ticket.userId);
                                return (
                                    <Card 
                                        key={ticket.id} 
                                        ticket={{ 
                                            ...ticket, 
                                            isFeatureRequest: ticket.type === 'feature' // Add logic to determine if it's a feature request
                                        }} 
                                        user={user} 
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
