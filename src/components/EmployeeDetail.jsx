import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployeeById } from '../services/api';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  useEffect(() => {
    fetchEmployeeById(id).then((response) => {
      setEmployee(response.data);
      setEditedEmployee(response.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setEditedEmployee((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setEditedEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    setEmployee(editedEmployee);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!employee) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Employee Details</h1>

      {isEditing ? (
        <div className="space-y-4">
          {/* Input fields */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-gray-600">Name:</span>
              <input
                type="text"
                name="name"
                value={editedEmployee.name}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-600">Email:</span>
              <input
                type="email"
                name="email"
                value={editedEmployee.email}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-600">Phone:</span>
              <input
                type="text"
                name="phone"
                value={editedEmployee.phone}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-600">Position:</span>
              <input
                type="text"
                name="position"
                value={editedEmployee.position}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
          </div>

          {/* Address section */}
          <h3 className="text-xl font-semibold text-gray-700 mt-4">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-gray-600">Street:</span>
              <input
                type="text"
                name="address.street"
                value={editedEmployee.address?.street || ''}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-600">City:</span>
              <input
                type="text"
                name="address.city"
                value={editedEmployee.address?.city || ''}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-600">State:</span>
              <input
                type="text"
                name="address.state"
                value={editedEmployee.address?.state || ''}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-600">Zipcode:</span>
              <input
                type="text"
                name="address.zipcode"
                value={editedEmployee.address?.zipcode || ''}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
              />
            </label>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p>
            <strong className="text-gray-700">Name:</strong> {employee.name}
          </p>
          <p>
            <strong className="text-gray-700">Email:</strong> {employee.email}
          </p>
          <p>
            <strong className="text-gray-700">Phone:</strong> {employee.phone}
          </p>
          <p>
            <strong className="text-gray-700">Position:</strong> {employee.position}
          </p>
          <p>
            <strong className="text-gray-700">Address:</strong> {employee.address.street}, {employee.address.city}, {employee.address.state} {employee.address.zipcode}
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
