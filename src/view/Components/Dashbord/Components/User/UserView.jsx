import React from 'react';

const UserView = ({ user, onClose, onUpdateUser }) => {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '20px auto',
      backgroundColor: '#1a1a1a',
      borderRadius: '12px',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#ffffff',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Header with gradient background */}
      <div style={{
        height: '120px',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '20px'
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '18px',
            cursor: 'pointer'
          }}>×</button>

        {/* Profile Image */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#f0f0f0',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'40\' r=\'20\' fill=\'%23666\'/%3E%3Ccircle cx=\'50\' cy=\'80\' r=\'30\' fill=\'%23666\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '4px solid #1a1a1a',
          position: 'relative'
        }}>
          {/* Verified badge */}
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            width: '20px',
            height: '20px',
            backgroundColor: '#1DA1F2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>✓</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          justifyContent: 'flex-end'
        }}>
          <button style={{
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            📁 Archive
          </button>
          <button style={{
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            View orders
          </button>
        </div>

        {/* User name and subscription status */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <h2 style={{ margin: '0', fontSize: '24px', fontWeight: '600' }}>
              {user.firstName} {user.lastName}
            </h2>
            <span style={{
              backgroundColor: '#333',
              color: '#888',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>Subscribed</span>
          </div>
          <p style={{ margin: '0', color: '#888', fontSize: '14px' }}>{user.email}</p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>First seen</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.firstSeen}</div>
          </div>
          <div>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>First purchase</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.firstPurchase}</div>
          </div>
          <div>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>Revenue</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.revenue}</div>
          </div>
          <div>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>MRR</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.mrr}</div>
          </div>
        </div>

        {/* User Details */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>Username</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>untitleddui.com/{user.username}</div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>Country</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.country}</div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            color: '#4CAF50'
          }}>
            ✓ EMAIL VERIFIED 2 JAN, 2025
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          paddingTop: '20px'
        }}>
          <button 
            onClick={() => onUpdateUser(user)}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
            Update User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserView;