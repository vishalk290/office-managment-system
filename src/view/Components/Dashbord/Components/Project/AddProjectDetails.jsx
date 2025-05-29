import React, { useState, useEffect } from "react";

// AddProjectDetails component
const AddProjectDetails = ({
  forData,
  project,
  setForData,
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
}) => {
  // Main form state - fixed the typo from 'fomData' to 'formData'
  const [formData, setFormData] = useState({
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

  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [clients, setClients] = useState([]);

  

  // useEffect to populate form with project data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (forData && isEditMode) {
        // If editing, populate with existing data
        setFormData({
          id: forData.id || "",
          date: forData.date || "",
          clientId: forData.clientId || "",
          clientName: forData.clientName || "",
          projectName: forData.projectName || "",
          description: forData.description || "",
          startDate: forData.startDate || "",
          endDate: forData.endDate || "",
          email: forData.email || "",
          technology: forData.technology || "",
          budget: forData.budget || "",
          challenges: forData.challenges || "",
        });
      } else {
        // If adding new project, reset form with today's date
        setFormData({
          id: Date.now().toString(), // Generate unique ID for new projects
          date: new Date().toISOString().split("T")[0],
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
  }, [isOpen, forData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientNameSelect = (clientName) => {
    const selectedClient = clients.find((client) => client.name === clientName);

    if (selectedClient) {
      setFormData((prev) => ({
        ...prev,
        clientId: selectedClient.id || selectedClient.no || "",
        clientName: clientName,
      }));
    }

    setShowNameDropdown(false);
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

    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.trim()
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate dates
    if (formData.endDate && formData.startDate > formData.endDate) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    try {
      // Get existing projects from localStorage
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      
      if (isEditMode) {
        // Update existing project
        const updatedProjects = existingProjects.map(project => 
          project.id === formData.id ? formData : project
        );
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
      } else {
        // Add new project
        const newProjects = [...existingProjects, formData];
        localStorage.setItem('projects', JSON.stringify(newProjects));
      }

      // Call onSubmit prop to update parent component's table
      onSubmit(formData);
      
      // Close modal and reset form
      handleClose();

      // Show success message
      alert(`Project ${isEditMode ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('There was an error saving the project. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
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
  };

  const handleClose = () => {
    resetForm();
    setShowNameDropdown(false);
    setShowIdDropdown(false);
    onClose();
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
              // onClick={exportProjectsData}
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
              {/* Export ({storageStats.totalProjects}) */}
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
                  All data will be saved permanently to your browser's local
                  storage
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
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  {/* {project.date || "Project date"} */}
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
                    type="text"
                    name="clientId"
                    value={formData.clientId}
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
                {/* <div style={{ position: "relative" }}>
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
                    placeholder="Select Client Name"
                    value={formData.clientName}
                    onChange={handleChange}
                    onClick={() => {
                      setShowNameDropdown(!showNameDropdown);
                      setShowIdDropdown(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                    readOnly
                    required
                  />

                  {showNameDropdown && clients.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto",
                        background: "white",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        zIndex: 10,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      {clients.map((client, index) => (
                        <div
                          key={client.id || client.no || index}
                          onClick={() => handleClientNameSelect(client.name)}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                            transition: "background-color 0.2s",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f5f5f5")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                          }
                        >
                          {client.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}

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
                    type="text"
                    name="clientName"
                    value={formData.clientName}
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
                    value={formData.email}
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
                    value={formData.startDate}
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
                    value={formData.endDate}
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
                    value={formData.technology}
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
                    value={formData.budget}
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
                  value={formData.projectName}
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
                  value={formData.description}
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
                  value={formData.challenges}
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
                {/* this is button edsting */}
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

                {/* Clear All Projects Button (for testing/admin purposes) */}
                <button
                  type="button"
                  // onClick={clearAllProjects}
                  style={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    minWidth: "120px",
                  }}
                >
                  Clear All projects
                </button>
              </div>

              {/* Storage Info */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
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

export default AddProjectDetails;

//  this is my AddProjectDetails when i click on submit then i want to store my all information in localstorage also i want to display updated  data to my table
// give mi only update storage data logic i want only logic
