import React, { useState, useEffect } from "react";
import axios from "axios";
import { procedurePagesCss } from "../lib/css";

const OwnerView = () => {
  const [view, setView] = useState();

  // Fetch users on component mount
  useEffect(() => {
    fetchView();
  }, []);

  const fetchView = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/display/ownerView"
      );
      setView(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className={procedurePagesCss}>
      <div className="h-4/5 w-3/4 p-6 rounded-lg border border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-center">Owner View</h1>
  
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg shadow-md overflow-auto p-4">
          {view && view.length > 0 ? (
            <table className="min-w-full table-auto border text-center border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-center border border-gray-300">Username</th>
                  <th className="px-4 py-2 text-center border border-gray-300">First Name</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Last Name</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Address</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Businesses</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Locations</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Highest Rating</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Lowest Rating</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Debt</th>
                </tr>
              </thead>
              <tbody>
                {view.map((owner, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{owner.username}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.first_name}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.last_name}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.address}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.num_of_bus}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.num_locations}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.highest_rating}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.lowest_rating}</td>
                    <td className="px-4 py-2 border border-gray-300">{owner.debt}</td>
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

export default OwnerView;
