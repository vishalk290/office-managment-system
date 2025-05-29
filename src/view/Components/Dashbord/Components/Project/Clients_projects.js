import React, { useState, useEffect } from "react";
import "./Clients.css";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";

const Client = () => {
  const [model, setModel] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    position: "",
    company: "",
    about: "",
    description: "",
  });

  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(savedClients);
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemove = (id) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: Date.now(),
      name: formData.name,
      image:
        formData.image ||
        "https://manyafoundation.org/wp-content/uploads/2023/03/Layer-9.jpg",
      about: formData.about,
      position: formData.position,
      company: formData.company,
      description: formData.description,
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));

    setFormData({
      name: "",
      image: "",
      position: "",
      company: "",
      about: "",
      description: "",
    });

    setModel(false);
  };

  return (
    <>
      <div className="client-container">
        <h2 className="client-heading">Our Clients</h2>
        <div className="client-data">
          {clients.map((client) => (
            <div key={client.id} className="client-card">
              <img
                src={client.image}
                alt={client.name}
                className="client-image"
              />
              <h2 className="client-name">{client.name}</h2>
              <h3 className="client-name">{client.position}</h3>
              <h4 className="client-name">{client.about}</h4>
              <h5 className="client-name">{client.company}</h5>
              <p className="client-description">{client.description}</p>
              <button className="btn btn-danger mt-2" onClick={() => handleRemove(client.id)}>
                remove
                </button>


            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding new client */}
      <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
        <ModalHeader toggle={() => setModel(!model)}>Add Client</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor="image">Image URL</label>
                  <input
                    name="image"
                    type="text"
                    className="form-control"
                    placeholder="Enter Image URL"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor="about">About</label>
                  <input
                    name="about"
                    type="text"
                    className="form-control"
                    placeholder="Enter about"
                    value={formData.about}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor="position">Position</label>
                  <input
                    name="position"
                    type="text"
                    className="form-control"
                    placeholder="Enter position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor="company">Company</label>
                  <input
                    name="company"
                    type="text"
                    className="form-control"
                    placeholder="Enter company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>

              <Col lg={12} className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() =>
                    setFormData({
                      name: "",
                      image: "",
                      position: "",
                      company: "",
                      about: "",
                      description: "",
                    })
                  }
                >
                  Reset
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      {/* Button to open modal */}
      <button
        className="btn mt-3"
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 25px",
        }}
        onClick={() => setModel(true)}
      >
        Add Client
      </button>

      <button
        className="btn mt-3"
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 25px",
        }}
        onClick={() => setModel(true)}
      >
        Add Client
      </button>
    </>
  );
};

export default Client;
