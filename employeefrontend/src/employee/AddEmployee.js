import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddEmployee = ({ data, fetchUpdatedData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    salary: '',
    joiningDate: '',
    relievingDate: '',
    contact: '',
    status: 'active', // default status
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
  });

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      name: '',
      dob: '',
      salary: '',
      joiningDate: '',
      relievingDate: '',
      contact: '',
      status: 'active',
    });
    setFormErrors({
      name: '',
    });
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setFormErrors({
        ...formErrors,
        name: 'Name field is required.',
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/employees', formData);
      fetchUpdatedData();
      handleModalClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  

  return (
    <div>
      <div style={{ width: '80%', margin: 'auto' }}>
        
      <h1 className="text-success">Employee Management 
        <Button className="btn btn-success ms-3" onClick={handleModalShow}><i className="bi bi-plus-circle-fill me-2"></i>
          Add Employee
        </Button></h1>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            {/* DOB */}
            <Form.Group controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Salary */}
            <Form.Group controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Joining Date */}
            <Form.Group controlId="formJoiningDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Relieving Date */}
            <Form.Group controlId="formRelievingDate">
              <Form.Label>Relieving Date</Form.Label>
              <Form.Control
                type="date"
                name="relievingDate"
                value={formData.relievingDate}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Contact */}
            <Form.Group controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Status */}
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Control>
            </Form.Group>
<br/>
            <Button variant="primary" type="submit">
              Save Employee
            </Button>
          </Form>
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default AddEmployee;
