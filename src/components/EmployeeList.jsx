import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredEmployee, setFilteredEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees()
      .then((response) => {
        console.log('Fetched Employees Data:', response.data); // Log the employee data
        setEmployees(response.data);
      })
      .catch((error) => console.error('Error fetching employees:', error)); // Log any error
  }, []);

  const deleteEmployee = (id) => {
    console.log(`Deleting Employee with ID: ${id}`); // Log employee ID being deleted
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const toggleSelectEmployee = (id) => {
    console.log(`Toggling selection for Employee ID: ${id}`); // Log toggle action
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  const deleteSelectedEmployees = () => {
    console.log('Deleting Selected Employees:', selectedEmployees); // Log selected IDs
    setEmployees(employees.filter((emp) => !selectedEmployees.includes(emp.id)));
    setSelectedEmployees([]); // Clear selection
  };

  const searchEmployeeById = () => {
    console.log(`Searching for Employee with ID: ${searchId}`); // Log search input
    const result = employees.find((employee) => employee.id === searchId);
    console.log('Search Result:', result); // Log search result
    setFilteredEmployee(result);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Employee Dashboard
      </h1>

      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-64 p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={searchEmployeeById}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployee ? (
          <div
            key={filteredEmployee.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredEmployee.name}
            </h3>
            <p className="text-gray-600 mb-2">ID: {filteredEmployee.id}</p>
            <p className="text-gray-600 mb-2">Email: {filteredEmployee.email}</p>
            <p className="text-gray-600 mb-2">
              Address: {filteredEmployee.address.street}, {filteredEmployee.address.city},{' '}
              {filteredEmployee.address.state} {filteredEmployee.address.zipcode}
            </p>
            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/employee/${filteredEmployee.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => deleteEmployee(filteredEmployee.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => toggleSelectEmployee(employee.id)}
                    className="mr-2"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {employee.name}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-2">ID: {employee.id}</p>
              <p className="text-gray-600 mb-2">Username: {employee.username}</p>
              <p className="text-gray-600 mb-2">Email: {employee.email}</p>
              <p className="text-gray-600 mb-2">
                Address: {employee.address.street}, {employee.address.city},{' '}
                {employee.address.state} {employee.address.zipcode}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/employee/${employee.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedEmployees.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={deleteSelectedEmployees}
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
