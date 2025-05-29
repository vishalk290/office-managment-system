import React, { useState } from "react";
import ViewProject from "./ViewProject"; // Assuming you have a ViewProject component
// ProjectCard component (updated to show project data)
const ProjectCard = ({ project, onEditProject }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewMoreClick = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div style={{ 
      background: "#fff", 
      padding: "20px", 
      borderRadius: "8px", 
      marginBottom: "20px", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
        {/* Project Image */}
        {project.image && (
          <img
            src={project.image}
            alt={project.projectName}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
          />
        )}
        
        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0, marginBottom: "10px", color: "#333" }}>
            {project.projectName || "Untitled Project"}
          </h3>
          <p style={{ color: "#666", marginBottom: "15px", lineHeight: 1.5 }}>
            {project.description ? (
              project.description.length > 100 
                ? project.description.substring(0, 100) + "..."
                : project.description
            ) : "No description available"}
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "15px" }}>
            <div>
              <strong style={{ color: "#555" }}>Contact:</strong> 
              <span style={{ color: "#777", marginLeft: "5px" }}>
                {project.contactPerson || 'N/A'}
              </span>
            </div>
            <div>
              <strong style={{ color: "#555" }}>Start Date:</strong> 
              <span style={{ color: "#777", marginLeft: "5px" }}>
                {formatDate(project.startDate)}
              </span>
            </div>
            <div>
              <strong style={{ color: "#555" }}>End Date:</strong> 
              <span style={{ color: "#777", marginLeft: "5px" }}>
                {formatDate(project.endDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button
          onClick={handleViewMoreClick}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
        >
          View Details
        </button>

        <button
          onClick={() => onEditProject(project)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Edit Project
        </button>
      </div>

      {/* ViewProject Modal */}
      <ViewProject
        project={project}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
};

export default ProjectCard