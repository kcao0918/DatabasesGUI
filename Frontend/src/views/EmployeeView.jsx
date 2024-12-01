import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeView = () => {
  const [view, setView] = useState();

  // Fetch users on component mount
  useEffect(() => {
    fetchView();
  }, []);

  const fetchView = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/display/employeeView"
      );
      setView(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="pt-40 flex justify-center min-h-screen bg-white">
      <div className="h-4/5 w-3/4 p-6 rounded-lg border border-black bg-white text-black shadow-lg overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-center">Employee View</h1>
  
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg shadow-md overflow-auto p-4">
          {view && view.length > 0 ? (
            <table className="min-w-full table-auto border text-center border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-center border border-gray-300">Username</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Tax ID</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Salary</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Hired</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Employee Experience</th>
                  <th className="px-4 py-2 text-center border border-gray-300">License ID</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Driving Experience</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Manager</th>
                </tr>
              </thead>
              <tbody>
                {view.map((data, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{data.username}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.taxID}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.salary}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.hired.split('T')[0]}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.employee_experience}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.licenseID}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.driving_experience}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.manager_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">Table visualization will display here!</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default EmployeeView