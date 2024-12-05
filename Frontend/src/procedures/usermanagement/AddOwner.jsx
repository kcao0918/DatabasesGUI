import { useState } from "react";
import axios from "axios";
import { procedurePagesCss } from "../../lib/css";

const AddOwner = () => {
  // Step 1: Define the array of requirements
  const requirements = [
    { id: "username", label: "Username", type: "text", value: "" },
    { id: "bdate", label: "Birthday", type: "date", value: "" },
    { id: "fname", label: "First Name", type: "text", value: "" },
    { id: "lname", label: "Last Name", type: "text", value: "" },
    { id: "address", label: "Address", type: "text", value: "" },
  ];

  // Step 2: Initialize state dynamically for each input field
  const [inputs, setInputs] = useState(
    requirements.reduce((acc, req) => {
      acc[req.id] = req.value;
      return acc;
    }, {})
  );

  const [popup, setPopup] = useState({
    visible: false,
    message: "",
    neutral: true,
  });

  // Step 3: Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  // Step 4: Handle form submission or clear action
  const handleClear = () => {
    setInputs(
      requirements.reduce((acc, req) => {
        acc[req.id] = "";
        return acc;
      }, {})
    );
  };

  // Handles submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedInputs = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );
    try {
      console.log(processedInputs);
      // Makes request
      const response = await axios.post(
        "http://localhost:8080/user/addOwner",
        processedInputs
      );

      setPopup({
        visible: true,
        message: response.data.message,
        neutral: true,
      });

      // Automatically hide the popup after 3 seconds
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, visible: false }));
      }, 1000);

      console.log(response.data);
    } catch (error) {
      setPopup({
        visible: true,
        message: "Error adding owner. Please try again.",
        neutral: false,
      });

      // Automatically hide the popup after 3 seconds
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, visible: false }));
      }, 1000);

      console.error("Error adding owner:", error);
    }
  };

  return (
    <div className={procedurePagesCss}>
      <div className="h-3/3 w-1/3 p-6 rounded-md border border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
        <h1 className="text-2xl font-bold mb-4">ADD_OWNER()</h1>

        {requirements.map((req) => (
          <div key={req.id} className="mb-6">
            <label
              htmlFor={req.id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {req.label}
            </label>
            <div className="flex items-center border rounded-md">
              <input
                id={req.id}
                type={req.type}
                value={inputs[req.id]} // Bind the input value to the state
                onChange={handleInputChange} // Handle input change
                placeholder={`Enter ${req.label.toLowerCase()}`}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            onClick={handleClear}
            className="font-semibold px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-gray-600 duration-500"
          >
            CLEAR
          </button>
          <button
            onClick={handleSubmit} // Call handleSubmit when clicked
            className="font-semibold px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 duration-500"
          >
            CONFIRM
          </button>
        </div>
      </div>

      {popup.visible && (
        <div className="fixed inset-0 flex items-start justify-center z-50 pt-[10vh]">
          <div
            className={`p-4 rounded-md shadow-md text-center bg-gray-100 text-gray-700`}
          >
            <p className="text-lg">{popup.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOwner;
