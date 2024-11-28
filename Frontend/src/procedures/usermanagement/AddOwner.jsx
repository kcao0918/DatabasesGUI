const AddOwner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-2/3 w-1/3 p-6 rounded-md border border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
        <h1 className="text-2xl font-bold mb-4">ADD_OWNER()</h1>

        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            username
          </label>
          <div className="flex items-center border rounded-md">
            <input
              id="username"
              type="text"
              value="awilson5"
              readOnly
              className="w-full px-3 py-2 bg-gray-100 text-gray-700 border-none focus:outline-none focus:ring-0"
            />
            <button className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-md">
              ▼
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="font-semibold px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-gray-600 duration-500">
            CLEAR
          </button>
          <button className="font-semibold px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 duration-500">
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOwner;
