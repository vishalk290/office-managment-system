import { FaPencilAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const tableinfo = [];

const tableColumns = [
  "DATE",
  "Id.NO.",
  "C_NAME",
  "Email",
  "Address",
  "CONTACT N0.",
  "Company Name",
  "Company Type",
  "STATUS",
];

const OldClients = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isActionMenuOpen1, setIsActionMenuOpen1] = useState(false);
  const [ishoverDelete, setIsHoverDelete] = useState(false);
  const [openpage, setOpenPage] = useState(1);
  const [shownDeletePopup, setShownDeletePopup] = useState(false);

  // Client modal and form state
  const [model, setModel] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    no: "",
    name: "",
    email: "",
    address: "",
    contact: "",
    company: "",
    type: "",
    status: "pending",
  });

  // State for clients data
  const [clients, setClients] = useState([]);

  // Load clients from localStorage on component mount
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem("OldClients")) || [];
    setClients(savedClients);
  }, []);

  // Handle input change in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    localStorage.setItem("OldClients", JSON.stringify(updatedClients));

    setFormData({
      date: new Date().toISOString().split("T")[0], //for reset.
      no: "",
      name: "",
      email: "",
      address: "",
      contact: "",
      company: "",
      type: "",
      status: "pending",
    });
    setModel(false);
  };
  const handleRemove = (id) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    setClients(updatedClients);
    localStorage.setItem("OldClients", JSON.stringify(updatedClients));
  };

  // Pagination settings
  const rowsPerPage = 5;
  const displayedClients = clients.slice(
    (openpage - 1) * rowsPerPage,
    openpage * rowsPerPage
  );
  const totalPages = Math.ceil(clients.length / rowsPerPage) || 1;

  const tdStyle = {
    padding: "12px 6px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 14,
    textAlign: "center",
  };

  return (
    <>
      {/* Modal for adding new client */}
      <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
        <ModalHeader toggle={() => setModel(!model)}>Add Client</ModalHeader>
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
                  Client Id
                </label>
                <input
                  type="number"
                  name="no"
                  placeholder="Enter Client Name"
                  value={formData.no}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
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
                  Client Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Client Name"
                  value={formData.name}
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
                  placeholder="Enter Client Name"
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
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Client Address "
                  value={formData.address}
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
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Enter Client Number"
                  value={formData.contact}
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
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter Company Name"
                  value={formData.company}
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
                  Company Type
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="Enter Company Type"
                  value={formData.type}
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
                  Status
                </label>
                <select
                  name="status"
                  placeholder="Enter Your Status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                  <option value="in progress">In Progress</option>
                </select>
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
                    no: "",
                    name: "",
                    email: "",
                    address: "",
                    contact: "",
                    company: "",
                    type: "",
                    status: "pending",
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

      <siv
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          background: "#fff",
          padding: 0,
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}

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
                  
                          {/* Filters */}
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
                              placeholder={`Search ${clients.length} records...`}
                              style={{
                                width: 260,
                                padding: "6px 14px",
                                borderRadius: 8,
                                border: "1px solid #bbb",
                                background: "#f3f4f6",
                                fontSize: 14,
                                marginLeft: "auto",
                              }}
                            />
                          </div>
        {/* Table */}
        <div style={{ display: "flex", margin: "20px 10px", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: 6,
                background: "#f9fafb",
                borderRadius: 12,
              }}
            >
              <thead>
                <tr>
                  {tableColumns.map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "11px 5px",
                        background: "#e0e7ff",
                        color: "#312e81",
                        border: "1px solid #dbdbdb",
                        fontWeight: 600,
                        fontSize: 15,
                        textAlign: "center",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={tableColumns.length}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      {/* No old clients found. Add your first old client. */}
                    </td>
                  </tr>
                ) : (
                  displayedClients.map((client, i) => (
                    <tr key={client.id || i}>
                      <td style={tdStyle}>{client.date}</td>
                      <td style={tdStyle}>{client.no}</td>
                      <td style={tdStyle}>{client.name}</td>
                      <td style={tdStyle}>{client.email}</td>
                      <td style={tdStyle}>{client.address}</td>
                      <td style={tdStyle}>{client.contact}</td>
                      <td style={tdStyle}>{client.company}</td>
                      <td style={tdStyle}>{client.type}</td>
                      <td style={tdStyle}>{client.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
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
        </div>
      </siv>
      {/* </div> */}
    </>
  );
};

export default OldClients;
