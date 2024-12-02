import React, { useState, useEffect } from "react";
import axios from "axios";
import { procedurePagesCss } from "../lib/css";

const LocationView = () => {
  const [view, setView] = useState();

  // Fetch users on component mount
  useEffect(() => {
    fetchView();
  }, []);

  const fetchView = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/display/locationView"
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
        <h1 className="text-2xl font-bold mb-4 text-center">Location View</h1>
  
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg shadow-md overflow-auto p-4">
          {view && view.length > 0 ? (
            <table className="min-w-full table-auto border text-center border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-center border border-gray-300">Label</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Long Name</th>
                  <th className="px-4 py-2 text-center border border-gray-300">X Coord</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Y Coord</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Space</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Vans</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Van IDs</th>
                  <th className="px-4 py-2 text-center border border-gray-300">Remaining Space</th>
                </tr>
              </thead>
              <tbody>
                {view.map((data, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{data.label}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.long_name}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.x_coord}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.y_coord}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.space}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.num_of_vans}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.van_ids}</td>
                    <td className="px-4 py-2 border border-gray-300">{data.remaining_capacity}</td>
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
export default LocationView