// components/Card.js
import React from 'react';

const Card = ({ ticket, user }) => {
    const getInitials = (name) => {
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        return initials.toUpperCase();
    };

    // Updated card styles for uniformity
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        width: '220px', // Fixed width for uniformity
        height: '120px', // Adjusted height for uniformity
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative', // For positioning the user profile picture
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif', // Consistent font style
    };

    const pfpStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1em',
    };

    const camIdStyle = {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#666',
        marginBottom: '8px', // Space below CAM ID
    };

    const featureTagStyle = {
        display: ticket.isFeatureRequest ? 'block' : 'none',
        backgroundColor: '#ffcc00', // Yellow background for feature tag
        color: '#333',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        marginBottom: '8px',
        alignSelf: 'flex-start', // Align to the start of the card
    };

    return (
        <div style={cardStyle}>
            <div style={camIdStyle}> {ticket.id}</div>
            <div style={featureTagStyle}>{ticket.isFeatureRequest ? 'Feature Request' : 'No Tag'}</div>
            <h3 style={{ fontSize: '14px', margin: '0' }}>{ticket.title}</h3>
            {user && (
                <div style={pfpStyle}>
                    {getInitials(user.name)}
                </div>
            )}
        </div>
    );
};

export default Card;
