import React from 'react';

// ViewProject component - updated to display all form information
const ViewProject = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;
  if (!project) return null;

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          maxWidth: "700px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
          }}
        >
          <h5 style={{ margin: 0, fontWeight: 600, fontSize: "1.2rem" }}>
            Project Details
          </h5>
          <button
            onClick={onClose}
            style={{
              background: "#ef4444",
              border: "none",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px 8px",
              borderRadius: "4px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: "20px",
              fontSize: "2.2rem",
              fontWeight: 700,
              fontFamily: "serif",
              textAlign: "center",
              color: "#1f2937",
            }}
          >
            {project.projectName || 'Project Name'}
          </h1>

          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              Description:
            </h3>
            <p
              style={{
                color: "#6b7280",
                fontSize: "1rem",
                lineHeight: 1.6,
                backgroundColor: "#f9fafb",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              {project.description || 'No description provided'}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Date:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {formatDate(project.date)}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Client ID:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {project.clientId || 'Not specified'}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Client Name:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {project.clientName || 'Not specified'}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Contact Email:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  wordBreak: "break-word",
                }}
              >
                {project.email || 'Not specified'}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Start Date:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {formatDate(project.startDate)}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                End Date:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {formatDate(project.endDate)}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Technology:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {project.technology || 'Not specified'}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Budget:
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {project.budget || 'Not specified'}
              </div>
            </div>
          </div>

          {project.challenges && (
            <div
              style={{
                background: "#fef3c7",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #fbbf24",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#92400e",
                  fontFamily: "serif",
                }}
              >
                Project and Challenges:
              </h3>
              <div
                style={{
                  color: "#78350f",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                {project.challenges}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;

