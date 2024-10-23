import React from 'react';

const Card = ({ ticket }) => {
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        minWidth: '250px',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px',
    };

    const detailStyle = {
        fontSize: '14px',
        color: '#555',
        marginBottom: '6px',
    };

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>{ticket.title}</div>
            <div style={detailStyle}>Tag: {ticket.tag.join(', ')}</div>
            <div style={detailStyle}>Status: {ticket.status}</div>
            <div style={detailStyle}>Priority: {ticket.priority}</div>
        </div>
    );
};

export default Card;
