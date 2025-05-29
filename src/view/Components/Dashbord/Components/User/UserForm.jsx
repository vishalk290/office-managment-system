import React from 'react';

const UserForm = ({ 
  formData, 
  isEditing, 
  onInputChange, 
  onSubmit, 
  onCancel 
}) => {
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
          onClick={onCancel}
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
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          {isEditing ? 'Update User' : 'Add New User'}
        </h2>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Name row */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#fff'
            }}>Name *</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => onInputChange('firstName', e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => onInputChange('lastName', e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#fff'
            }}>Email address *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  padding: '12px 40px 12px 12px',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888'
              }}>📧</span>
            </div>
          </div>

          {/* Country */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#fff'
            }}>Country</label>
            <div style={{ position: 'relative' }}>
              <select
                value={formData.country}
                onChange={(e) => onInputChange('country', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '14px',
                  appearance: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="United States">🇺🇸 United States</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
              </select>
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888',
                pointerEvents: 'none'
              }}>▼</span>
            </div>
          </div>

          {/* Username */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#fff'
            }}>Username *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={(e) => onInputChange('username', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  padding: '12px 40px 12px 140px',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888',
                fontSize: '14px'
              }}>(nikeName)</span>
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#4CAF50'
              }}>✓</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '30px',
          paddingTop: '20px'
        }}>
          <button 
            onClick={onCancel}
            style={{
              backgroundColor: 'transparent',
              color: '#888',
              border: '1px solid #444',
              padding: '12px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
            {isEditing ? 'Update User' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;