import { FaPencilAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import AddProjectDetails from "./AddProjectDetails";
import AddMoreInfo from "./AddMoreInfo";
import ViewProject from "./ViewProject";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const tableColumns = [
  "DATE",
  "Client_Id",
  "Client_Name",
  "Project_Name",
  "Description",
  "Actions",
];

const Project = ({ onClientListUpdate, onClose, project }) => {
  const [clients, setClients] = useState([]);
  const [openpage, setOpenPage] = useState(1);
  const [isActionMenuOpen1, setIsActionMenuOpen1] = useState(false);
  const [ishoverDelete, setIsHoverDelete] = useState(false);
  const [shownDeletePopup, setShownDeletePopup] = useState(false);
  //view button logic
  const [forData, setForData] = useState(null); // current data to edit
  const [editIndex, setEditIndex] = useState(null); // track editing index
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewProject, setShowViewProject] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [hasRendered, setHasRendered] = useState(false);

  // handle edit click
  const handleEdit = (project, index) => {
    setForData(project);
    setEditIndex(index);
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create new project object
    const newProject = {
      id: Date.now(), // Generate unique ID
      date: formData.date,
      clientId: formData.clientId,
      clientName: formData.clientName,
      projectName: formData.projectName,
      description: formData.description
    };

    // Update projects state with new project
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);

    // Save to localStorage
    localStorage.setItem('Projects', JSON.stringify(updatedProjects));

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      clientId: "",
      clientName: "",
      projectName: "",
      description: "",
    });

    // Close modal
    setModel(false);
  };

  useEffect(() => {
    if (projects.length > 0 && !hasRendered) {
      setHasRendered(true);
    }
  }, [projects, hasRendered]);
  // Handle form submission from AddMoreInfo component
  const handleProjectSubmit = (projectData) => {
    console.log("Project submitted:", projectData);

    // Add the new project to the projects list
    const newProject = {
      id: Date.now(), // Simple ID generation
      ...projectData,
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);
    setCurrentProject(newProject);

    // Close add form and show view project
    setShowAddForm(false);
    setShowViewProject(true);
  };

  // Project modal and form state
  const [model, setModel] = useState(false);
  const [formData,  setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    clientId: "",
    clientName: "",
    projectName: "",
    description: "",
    action: "",
  });

  // Client  dropdowns
  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);

  useEffect(() => {
    // Load saved clients
    const savedClients = JSON.parse(localStorage.getItem("OldClients")) || [];
    setClients(savedClients);

    // Load saved projects
    const savedProjects = JSON.parse(localStorage.getItem("Projects")) || [];
    setProjects(savedProjects);

    if (onClientListUpdate) {
      onClientListUpdate(savedClients);
    }
  }, [onClientListUpdate]);

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Client selection from Name dropdown
  const handleClientNameSelect = (clientName) => {
    const selectedClient = clients.find((client) => client.name === clientName);

    if (selectedClient) {
      setFormData({
        ...formData,
        clientId: selectedClient.id || selectedClient.no,
        clientName: clientName,
      });
    }

    setShowNameDropdown(false);
  };


  // Pagination
  const rowsPerPage = 5;
  const displayedProjects = projects.slice(
    (openpage - 1) * rowsPerPage,
    openpage * rowsPerPage
  );
  const totalPages = Math.ceil(projects.length / rowsPerPage) || 1;

  const tdStyle = {
    padding: "12px 6px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 14,
    textAlign: "center",
  };
  return (
    <>
      {/* Modal for adding new project */}
      <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
        <ModalHeader
          toggle={() => setModel(!model)}
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          Add New Project
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  required
                />
              </div>

              {/* Client ID Field with Dropdown */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  Client Id
                </label>
                <input
                  type="text"
                  name="clientId"
                  placeholder="Select Client ID"
                  value={formData.clientId}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  required
                />
              </div>
              {/* Client Name Field with Dropdown */}

              <div style={{ position: "relative" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  Client Name
                </label>
                <div style={{ position: "relative" }}>
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
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
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
                      {clients.map((client) => (
                        <div
                          key={client.id || client.no}
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
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  placeholder="Enter Project Name"
                  value={formData.projectName}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Project Description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    date: new Date().toISOString().split("T")[0],
                    clientId: "",
                    clientName: "",
                    projectName: "",
                    description: "",
                  });
                }}
                style={{
                  background: "#6b7280",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      {/* Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          background: "#fff",
          padding: 0,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "40px auto",
            background: "#fff",
            marginTop: 19,
            borderRadius: 16,
            boxShadow: "0 2px 8px #eee",
            padding: 0,
            border: "2px solid #2563eb",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              background: "#2563eb",
              marginTop: 19,
              color: "#fff",
              padding: "18px 36px 11px 36px",
              fontWeight: 700,
              fontSize: 22,
              borderTopLeftRadius: 13,
              borderTopRightRadius: 40,
              width: "fit-content",
              marginLeft: -2,
            }}
          >
            Project Details
          </div>

          {/* Filters and Action Menu */}
          <div
            style={{
              padding: "20px",
              display: "flex",
              gap: 24,
              alignItems: "center",
              marginTop: 24,
              marginLeft: 36,
            }}
          >
            <input
              placeholder={`Search ${projects.length} projects...`}
              style={{
                width: 260,
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid #bbb",
                background: "#f3f4f6",
                fontSize: 14,
              }}
            />
            <div style={{ flexGrow: 1 }} />
            <div style={{ position: "relative", marginRight: 48 }}>
              <button
                onClick={() => setIsActionMenuOpen1((prev) => !prev)}
                style={{
                  background: "#2563eb",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  padding: "5px 13px",
                  fontSize: 24,
                  cursor: "pointer",
                }}
              >
                ≡
              </button>

              {isActionMenuOpen1 && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 38,
                    background: "#fff",
                    border: "1px solid #bbb",
                    borderRadius: 8,
                    boxShadow: "0 4px 16px #ddd",
                    minWidth: 160,
                    zIndex: 10,
                  }}
                  onMouseLeave={() => setIsActionMenuOpen1(false)}
                >
                  <div
                    style={{
                      padding: "12px 20px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      color: "#2563eb",
                      fontWeight: 500,
                    }}
                    onClick={() => setModel(true)}
                  >
                    + Add New
                  </div>
                  <div
                    style={{
                      padding: "12px 20px",
                      cursor: "pointer",
                      color: "#2563eb",
                      fontWeight: 500,
                    }}
                  >
                    <FaPencilAlt /> + Edit
                  </div>
                  <div
                    onClick={() => setShownDeletePopup(true)}
                    onMouseEnter={() => setIsHoverDelete(true)}
                    onMouseLeave={() => setIsHoverDelete(false)}
                    style={{
                      padding: "12px 20px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      backgroundColor: ishoverDelete ? "red" : "transparent",
                      color: "blue",
                      fontWeight: 500,
                      transition: "background-color 0.5s",
                    }}
                  >
                    - Delete
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {tableColumns.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px",
                      borderBottom: "2px solid #ccc",
                      backgroundColor: "#f1f5f9",
                      textAlign: "left",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}>{project.date}</td>
                  <td style={tdStyle}>{project.clientId}</td>
                  <td style={tdStyle}>{project.clientName}</td>
                  <td style={tdStyle}>{project.projectName}</td>
                  <td style={tdStyle}>{project.description}</td>
                  <td style={tdStyle}>
                    {/* Edit button */}
                    <button
                      onClick={() => {
                        handleEdit(index);
                        setForData(project);
                        setShowModal(true);
                      }}
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowAddForm(true)}
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                        Project detail
                    </button>

                    {/* View button */}
                    <button
                      onClick={() => {
                        setCurrentProject(project);
                        setShowViewProject(true);
                      }}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/*   */}
          </table>
          {/* Add New Project button */}

          {/* One-time render of "Your Projects" section */}
          {/* {hasRendered && (
            <div style={{ marginTop: "30px" }}>
              <h2>Your Projects</h2>
              <div style={{ display: "grid", gap: "15px" }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      padding: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <h3 style={{ margin: "0 0 10px 0" }}>
                      {project.projectName}
                    </h3>
                    <p style={{ margin: "0 0 10px 0", color: "#666" }}>
                      Client: {project.clientName}
                    </p>
                    <p style={{ margin: "0 0 15px 0", color: "#666" }}>
                      {project.description?.substring(0, 100)}
                      {project.description?.length > 100 ? "..." : ""}
                    </p>
                    <button
                      onClick={() => {
                        setCurrentProject(project);
                        setShowViewProject(true);
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* All modals rendered once only */}
          <AddMoreInfo
            forData={null}
            setForData={setCurrentProject}
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleProjectSubmit}
          />

          <ViewProject
            project={currentProject}
            isOpen={showViewProject}
            onClose={() => setShowViewProject(false)}
          />

          <AddProjectDetails
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditIndex(null);
            }}
            forData={forData}
            setForData={setForData}
            onSubmit={handleSubmit}
          />

          {/* Pagination */}
          {projects.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "15px 0",
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setOpenPage((prev) => Math.max(prev - 1, 1))}
                  disabled={openpage === 1}
                  style={{
                    padding: "5px 10px",
                    background: openpage === 1 ? "#e5e7eb" : "#2563eb",
                    color: openpage === 1 ? "#9ca3af" : "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: openpage === 1 ? "default" : "pointer",
                  }}
                >
                  Previous
                </button>
                <span style={{ padding: "5px 10px" }}>
                  Page {openpage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setOpenPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={openpage === totalPages}
                  style={{
                    padding: "5px 10px",
                    background: openpage === totalPages ? "#e5e7eb" : "#2563eb",
                    color: openpage === totalPages ? "#9ca3af" : "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: openpage === totalPages ? "default" : "pointer",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
