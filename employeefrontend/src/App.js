import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableView from './employee/TableView';
import AddEmployee from './employee/AddEmployee';

const App = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employees');0
      
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUpdatedData = () => {
    fetchData(); // Re-fetch data after edit or delete
  };

  const appStyle = {
    backgroundColor: '#E4F1ED',
    minHeight: '100vh',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <AddEmployee fetchUpdatedData={fetchUpdatedData} />
      <TableView data={employeeData}  fetchUpdatedData={fetchUpdatedData} />
    </div>
  );
};

export default App;
