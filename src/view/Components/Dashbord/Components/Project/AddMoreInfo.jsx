import React, { useState, useEffect } from "react";

// AddProjectDetails component
const AddMoreInfo = ({
  project, // Changed from forData to project to match your usage
  setProject, // Add this prop to update the parent state
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
}) => {
  const [fomData, setFomData] = useState({
    id: "",
    date: "",
    clientId: "",
    clientName: "",
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    email: "",
    technology: "",
    budget: "",
    challenges: "",
  });

  // Function to get projects from localStorage
  const getProjectsFromStorage = () => {
    try {
      const projects = localStorage.getItem("projects");
      return projects ? JSON.parse(projects) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  };

  // Function to save projects to localStorage
  const saveProjectsToStorage = (projects) => {
    try {
      localStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Function to save individual project to localStorage
  const saveProjectToStorage = (projectData) => {
    const existingProjects = getProjectsFromStorage();

    if (isEditMode) {
      // Update existing project
      const updatedProjects = existingProjects.map((proj) =>
        proj.id === projectData.id ? projectData : proj
      );
      saveProjectsToStorage(updatedProjects);
      return updatedProjects;
    } else {
      // Add new project
      const newProjects = [...existingProjects, projectData];
      saveProjectsToStorage(newProjects);
      return newProjects;
    }
  };

  // useEffect to populate form with project data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (project && isEditMode) {
        // If editing, populate with existing data
        setFomData({
          id: project.id || "",
          date: project.date || "",
          clientId: project.clientId || "",
          clientName: project.clientName || "",
          projectName: project.projectName || "",
          description: project.description || "",
          startDate: project.startDate || "",
          endDate: project.endDate || "",
          email: project.email || "",
          technology: project.technology || "",
          budget: project.budget || "",
          challenges: project.challenges || "",
        });
      } else {
        // If adding new project, reset form
        setFomData({
          id: Date.now().toString(), // Generate unique ID for new projects
          date: "",
          clientId: "",
          clientName: "",
          projectName: "",
          description: "",
          startDate: "",
          endDate: "",
          email: "",
          technology: "",
          budget: "",
          challenges: "",
        });
      }
    }
  }, [isOpen, project, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = [
      "date",
      "clientId",
      "clientName",
      "projectName",
      "description",
      "startDate",
      "email",
    ];
    const missingFields = requiredFields.filter((field) => !fomData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Add timestamp for when the project was created/updated
    const projectDataWithTimestamp = {
      ...fomData,
      createdAt: isEditMode ? project.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage and get updated projects list
    const updatedProjects = saveProjectToStorage(projectDataWithTimestamp);

    // Call the onSubmit callback with the form data and updated projects list
    if (onSubmit) {
      onSubmit(projectDataWithTimestamp, updatedProjects);
    }

    // Update the current project in parent component if editing
    if (isEditMode && setProject) {
      setProject(projectDataWithTimestamp);
    }

    // Close the modal
    onClose();

    // Show success message
    alert(
      isEditMode
        ? "Project updated and saved to storage successfully!"
        : "Project added and saved to storage successfully!"
    );
  };

  const handleClose = () => {
    // Reset form data when closing
    setFomData({
      id: "",
      date: "",
      clientId: "",
      clientName: "",
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      email: "",
      technology: "",
      budget: "",
      challenges: "",
    });
    onClose();
  };

  // Function to export all projects data (useful for backup)
  const exportProjectsData = () => {
    const projects = getProjectsFromStorage();
    const dataStr = JSON.stringify(projects, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Function to clear all projects from localStorage (use with caution)
  const clearAllProjects = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all projects? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("projects");
      alert("All projects have been cleared from storage.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "12px",
          background: "#fff",
          position: "relative",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <h5 style={{ margin: 0, fontWeight: 600 }}>
            {isEditMode ? "Edit Project Details" : "Add Project Details"}
          </h5>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Export button */}
            <button
              onClick={exportProjectsData}
              title="Export all projects"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontSize: "12px",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              Export
            </button>
            <button
              onClick={handleClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "24px",
                cursor: "pointer",
                padding: "0",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px" }}>
          <div>
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "30px",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <h1>
                  {isEditMode
                    ? "Edit Project Information"
                    : "Project Information Form"}
                </h1>
                <p>
                  Please provide the following information about your project
                </p>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  All data will be saved to your browser's local storage
                </p>
              </div>

              {/* Grid Layout for Form Fields */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                {/* Date Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={fomData.date}
                    onChange={handleChange}
                    placeholder="Enter date"
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Client ID Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Client Id *
                  </label>
                  <input
                    type="number"
                    name="clientId"
                    value={fomData.clientId}
                    onChange={handleChange}
                    placeholder="Enter client Id"
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Client Name Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={fomData.clientName}
                    onChange={handleChange}
                    placeholder="Enter client name"
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Contact Email Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={fomData.email}
                    placeholder="Enter Email"
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Project Start Date Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Project Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    value={fomData.startDate}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Project End Date Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Project End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    value={fomData.endDate}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Technology Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Technology
                  </label>
                  <input
                    type="text"
                    name="technology"
                    onChange={handleChange}
                    value={fomData.technology}
                    placeholder="Enter Technology"
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Project Budget Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Project Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    onChange={handleChange}
                    value={fomData.budget}
                    placeholder="Enter Project Budget"
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Full Width Fields */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={fomData.projectName}
                  onChange={handleChange}
                  placeholder="Enter Project Name"
                  required
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={fomData.description}
                  onChange={handleChange}
                  placeholder="Enter Project Description"
                  required
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    height: "80px",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Project Challenges
                </label>
                <textarea
                  name="challenges"
                  onChange={handleChange}
                  value={fomData.challenges}
                  placeholder="Describe any project challenges"
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    height: "80px",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    flex: 1,
                    minWidth: "120px",
                  }}
                >
                  {isEditMode ? "Update Project" : "Submit Project"}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    flex: 1,
                    minWidth: "120px",
                  }}
                >
                  Cancel
                </button>
              </div>

              {/* Storage Info */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: "#495057",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoreInfo;