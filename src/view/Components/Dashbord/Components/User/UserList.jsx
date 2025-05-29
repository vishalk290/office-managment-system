import React from 'react';

const UserList = ({ users, onAddUser, onViewUser, onUpdateUser, onDeleteUser }) => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ color: '#fff', margin: '0' }}>User Management</h1>
        <button 
          onClick={onAddUser}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
          + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div style={{
        //   backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: '#888'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>No users found</p>
          <p>Click "Add User" to create your first user.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {users.map((user, index) => (
            <div key={user.id} style={{
              padding: '20px',
              borderBottom: index < users.length - 1 ? '1px solid #333' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ 
                  color: '#fff', 
                  margin: '0 0 5px 0', 
                  fontSize: '18px' 
                }}>
                  {user.firstName} {user.lastName}
                </h3>
                <p style={{ 
                  color: '#888', 
                  margin: '0 0 5px 0', 
                  fontSize: '14px' 
                }}>
                  {user.email}
                </p>
                <p style={{ 
                  color: '#666', 
                  margin: '0', 
                  fontSize: '12px' 
                }}>
                  @{user.username} • {user.country}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onViewUser(user)}
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  View User
                </button>
                <button 
                  onClick={() => onUpdateUser(user)}
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  Update
                </button>
                <button 
                  onClick={() => onDeleteUser(user.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;