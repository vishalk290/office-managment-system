import { FaPencilAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import profile from "../images/profile.jpg";
const tableinfo = [];
//this is updaterd user component
const tableColumns = [
  "firstName",
  "lastName:",
  "email",
  "country",
  "username",
  "firstseen",
  "firstpurchase",
  "revenue",
  "Project_used",
];

const User = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isActionMenuOpen1, setIsActionMenuOpen1] = useState(false);
  const [ishoverDelete, setIsHoverDelete] = useState(false);
  const [openpage, setOpenPage] = useState(1);
  const [shownDeletePopup, setShownDeletePopup] = useState(false);
  //dropdown button//
  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [projects, setProjects] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Client modal and form state
  const [model, setModel] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
    userName: "",
    firstSeen: "",
    firstPurchase: "",
    revenue: "",
    Project_used: "",
  });

  // State for clients data
  const [clients, setClients] = useState([]);

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  // Handle project selection
  const handleProjectSelect = (projectName) => {
    setFormData({
      ...formData,
      Project_used: projectName,
    });
    setShowProjectDropdown(false);
  };

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Load clients from localStorage on component mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setClients(savedUsers);
  }, []);

  // Open view modal with selected user data
  const openViewModal = (user) => {
    setSelectedUser(user);
    setViewModal(true);
  };
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setEditModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedClients = clients.map((client) =>
      client.id === selectedUser.id
        ? { ...formData, id: selectedUser.id }
        : client
    );
    setClients(updatedClients);
    setEditModal(false);
    setSelectedUser(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //for new client
    const newClient = {
      ...formData,
      id: Date.now().toString(), // for unique id
    };

    // Update clients array with the new client
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem("users", JSON.stringify(updatedClients));

    setFormData({
      date: new Date().toISOString().split("T")[0], //for reset.
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      username: "",
      firstseen: "",
      firstpurchase: "",
      revenue: "",
      Project_used: "",
    });
    setModel(false);
  };

  // Helper functions for formatting
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  // Pagination settings
  const rowsPerPage = 6; // Showing 6 cards per page
  const displayedClients = clients.slice(
    (openpage - 1) * rowsPerPage,
    openpage * rowsPerPage
  );
  const totalPages = Math.ceil(clients.length / rowsPerPage) || 1;

  return (
    <>
      {/* Modal for adding new client */}
      <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
        <ModalHeader toggle={() => setModel(!model)}> Add Client</ModalHeader>
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

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
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
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter lastName"
                  value={formData.lastName}
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email "
                  value={formData.email}
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
                  country
                </label>
                <select
                  name="country"
                  placeholder="Enter Your country"
                  value={formData.country}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  required
                >
                  <option value="US">US</option>
                  <option value="India">India</option>
                  <option value="UK">UK</option>
                  <option value="France">France</option>
                  <option value="NewZeland">NewZeland</option>
                  <option value="pakistan">pakistan</option>
                  <option value="Itali">Itali</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  username
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter username "
                  value={formData.userName}
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
                  first seen
                </label>
                <input
                  type="date"
                  name="firstSeen"
                  placeholder="Enter firstseen "
                  value={formData.firstSeen}
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
                  first purchase
                </label>
                <input
                  type="date"
                  name="firstpurchase"
                  placeholder="Enter first purchase Date"
                  value={formData.firstpurchase}
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
                  revenue
                </label>
                <input
                  type="number"
                  name="revenue"
                  placeholder="Enter revenue"
                  value={formData.revenue}
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
              <div style={{ position: "relative" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: 500,
                  }}
                >
                  Project Assign
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    name="Project_used"
                    placeholder="Select Project"
                    value={formData.Project_used}
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
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
                  {showProjectDropdown && projects.length > 0 && (
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
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            handleProjectSelect(project.projectName)
                          }
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
                          {project.projectName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                    firstName: "",
                    lastName: "",
                    email: "",
                    country: "United States",
                    username: "",
                    firstseen: "",
                    firstpurchase: "",
                    revenue: "",
                    Project_used: "",
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

      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          background: "#fff",
          padding: 0,
          fontFamily: "sans-serif",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", marginTop: 12, marginLeft: 68 }}>
          {tableinfo.map((tab, idx) => (
            <button
              key={tab}
              style={{
                padding: "8px 28px",
                fontWeight: 600,
                background: selectedTab === idx ? "#2563eb" : "#f8fafc",
                color: selectedTab === idx ? "#fff" : "#222",
                border: "1px solid #2563eb",
                borderBottom:
                  selectedTab === idx ? "none" : "1px solid #2563eb",
                outline: "none",
                borderTopLeftRadius: idx === 0 ? 8 : 0,
                borderTopRightRadius: idx === tableinfo.length - 1 ? 12 : 0,
                cursor: "pointer",
                position: "relative",
                top: selectedTab === idx ? 1 : 0,
                zIndex: selectedTab === idx ? 1 : 0,
              }}
              onClick={() => setSelectedTab(idx)}
            >
              {tab}
            </button>
          ))}

          <div style={{ flexGrow: 1 }} />
          <div style={{ position: "relative", marginRight: 48 }}>
            <button
              onClick={() => setModel(true)}
              style={{
                background: "#2563eb",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                margin: "25px",
                padding: "15px 13px",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              Add New user
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

        {/* Cards Display */}
        <div style={{ display: "flex", margin: "20px 10px", gap: 20 }}>
          <div style={{ flex: 1 }}>
            {clients.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
                No users found. Click "Add New" to create your first user.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                {displayedClients.map((client, i) => (
                  <div
                    key={client.id || i}
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "16px",
                      overflow: "hidden",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: "#ffffff",
                      position: "relative",
                    }}
                  >
                    {/* Header with gradient background */}
                    <div
                      style={{
                        height: "120px",
                        background:
                          "linear-gradient(135deg, #e6b3ff 0%, #ffcccc 50%, #ffffcc 100%)",
                        position: "relative",
                      }}
                    >
                      {/* Close button */}
                      <button
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                          background: "none",
                          border: "none",
                          color: "#666",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>

                      {/* Profile picture */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-30px",
                          left: "24px",
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          border: "3px solid #1a1a1a",
                          overflow: "hidden",
                          backgroundColor: "#333",
                        }}
                      >
                        <img
                          src={profile}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Content area */}
                    <div style={{ padding: "40px 24px 24px" }}>
                      {/* Header section */}
                      <div style={{ marginBottom: "24px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "8px",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "#333",
                              color: "#fff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            Archive
                          </button>
                          <button
                            style={{
                              backgroundColor: "transparent",
                              color: "#888",
                              border: "1px solid #444",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            View Project
                          </button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#2d5016",
                              color: "#4ade80",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: "500",
                            }}
                          >
                            ● Active
                          </span>
                        </div>

                        <p
                          style={{
                            margin: "0 0 16px 0",
                            color: "#888",
                            fontSize: "14px",
                          }}
                        >
                          {client.email || "No email set"}
                        </p>

                        {/* Stats */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "16px",
                            marginBottom: "24px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: "#888",
                                fontSize: "12px",
                                marginBottom: "4px",
                              }}
                            >
                              First seen
                            </div>
                            <div
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {formatDate(client.firstSeen)}
                            </div>
                          </div>
                          <div>
                            <div
                              style={{
                                color: "#888",
                                fontSize: "12px",
                                marginBottom: "4px",
                              }}
                            >
                              First purchase
                            </div>
                            <div
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {formatDate(client.firstpurchase)}
                            </div>
                          </div>
                          <div>
                            <div
                              style={{
                                color: "#888",
                                fontSize: "12px",
                                marginBottom: "4px",
                              }}
                            >
                              Revenue
                            </div>
                            <div
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {formatCurrency(client.revenue)}
                            </div>
                          </div>
                          <div>
                            <div
                              value={formData.Project_used}
                              onChange={handleChange}
                              onClick={() => {
                                setShowNameDropdown();
                                setShowIdDropdown(false);
                              }}
                              style={{
                                color: "#888",
                                fontSize: "12px",
                                marginBottom: "4px",
                              }}
                            >
                              Project_used
                            </div>
                            <div
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {client.Project_used || "No Project Set "}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Display submitted data */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#2a2a2a",
                            padding: "16px",
                            borderRadius: "8px",
                            border: "1px solid #444",
                          }}
                        >
                          <h3
                            style={{
                              margin: "0 0 12px 0",
                              fontSize: "16px",
                              color: "#4ade80",
                            }}
                          >
                            Profile Information
                          </h3>
                          <div style={{ display: "grid", gap: "8px" }}>
                            <div>
                              <strong>Name:</strong> {client.firstName}{" "}
                              {client.lastName}
                            </div>
                            <div>
                              <strong>Email:</strong> {client.email}
                            </div>
                            <div>
                              <strong>Country:</strong> {client.country}
                            </div>
                            <div>
                              <strong>Username:</strong>{" "}
                              {client.userName || "Not set"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "12px",
                          marginTop: "32px",
                          paddingTop: "24px",
                          borderTop: "1px solid #333",
                        }}
                      >
                        
                        <button
                          onClick={() => openEditModal(client)}
                          style={{
                            backgroundColor: "#6366f1",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {clients.length > 0 && (
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
                      background:
                        openpage === totalPages ? "#e5e7eb" : "#2563eb",
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
          {editModal && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "8px",
                  width: "600px",
                  maxHeight: "80vh",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <h3>Edit Profile</h3>
                  <button
                    onClick={() => setEditModal(false)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>

                <div>
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
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
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
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
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
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
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
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                        required
                      >
                        <option value="US">US</option>
                        <option value="India">India</option>
                        <option value="UK">UK</option>
                        <option value="France">France</option>
                        <option value="NewZeland">New Zealand</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Italy">Italy</option>
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: 500,
                        }}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
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
                        Revenue
                      </label>
                      <input
                        type="number"
                        name="revenue"
                        value={formData.revenue}
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
                        project used
                      </label>
                      <input
                        type="text"
                        name="Project_used"
                        value={formData.Project_used}
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
                      onClick={() => setEditModal(false)}
                      style={{
                        background: "#6b7280",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleEditSubmit}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
