import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TableView = ({ data, fetchUpdatedData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    dob: '',
    salary: '',
    joiningDate: '',
    relievingDate: '',
    contact: '',
    status: 'active',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const formatDateString = (dateString) => {
    const validDate = new Date(dateString);
    if (isNaN(validDate.getTime())) {
      return dateString;
    }
  
    return validDate.toISOString().substr(0, 10);
  };
  const handleEdit = async (index) => {
    const selectedEmployee = data.find((employee) => employee.id === index);

    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
      setFormData({
        id: selectedEmployee.id,
        name: selectedEmployee.name,
        dob: formatDateString(selectedEmployee.dob),
        salary: selectedEmployee.salary,
        joiningDate: formatDateString(selectedEmployee.joiningDate),
        relievingDate: formatDateString(selectedEmployee.relievingDate),
        contact: selectedEmployee.contact,
        status: selectedEmployee.status,
      });
      setShowModal(true);
    }
  };


  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/${index}`);
      fetchUpdatedData();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee({});
    setFormData({
      name: '',
      dob: '',
      salary: '',
      joiningDate: '',
      relievingDate: '',
      contact: '',
      status: 'active',
    });
  };

  const handleSave = async () => {
    console.log(formData)
    try {
      // Make a PUT request to update the employee
      await axios.put(`http://localhost:3000/api/employees/${selectedEmployee.id}`, formData);
      // Fetch updated data after saving changes
      fetchUpdatedData();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <h2 className="text-success">Employee List</h2>
    <Table striped bordered hover>
    <thead>
        <tr>
          <th style={{ backgroundColor: '#E4F1ED' }}>Name</th>
          <th style={{ backgroundColor: '#E4F1ED' }}>DOB</th>
          <th style={{ backgroundColor: '#E4F1ED' }}>Salary</th>
          <th style={{ backgroundColor: '#E4F1ED' }}>Joining Date</th>
          <th style={{ backgroundColor: '#E4F1ED'}}>Relieving Date</th>
          <th style={{ backgroundColor: '#E4F1ED'}}>Contact</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{formatDateString(row.dob)}</td>
              <td>{row.salary}</td>
              <td>{formatDateString(row.joiningDate)}</td>
              <td>{formatDateString(row.relievingDate)}</td>
              <td>{row.contact}</td>
            <td>
            <Button variant="outline-primary" onClick={() => handleEdit(row.id)}>
                  <i className="bi bi-pencil-fill me-1"></i> 
                </Button>
                {' '}
                <Button variant="outline-danger" onClick={() => handleDelete(row.id)}>
                  <i className="bi bi-trash-fill me-1"></i> 
                </Button>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Form fields for editing */}
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} required />
                      </Form.Group>

                      <Form.Group controlId="formDob">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="date" placeholder="Enter DOB" name="dob" value={formData.dob} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group controlId="formSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="text" placeholder="Enter Salary" name="salary" value={formData.salary} onChange={handleChange} />
                      </Form.Group>

                      <Form.Group controlId="formJoiningDate">
                        <Form.Label>Joining Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Joining Date" name="joiningDate" value={formData.joiningDate} onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group controlId="formRelievingDate">
                        <Form.Label>Relieving Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Relieving Date" name="relievingDate" value={formData.relievingDate} onChange={handleChange} />
                      </Form.Group>

                      <Form.Group controlId="formContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="text" placeholder="Enter Contact" name="contact" value={formData.contact} onChange={handleChange} />
                      </Form.Group>

                      <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" defaultValue="active" value={formData.status} onChange={handleChange}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
    </div>
  );
};

export default TableView;
