import { Link } from "react-router-dom";

const VanManagement = () => {
  return (
    <div className="relative h-[90vh] top-[10vh] bg-[#F3F1E5]">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-3xl font-bold text-black">Van Management</h1>
        <div className="grid grid-cols-2 gap-8">
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/addvan"
          >
            ADD VAN
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/loadvan"
          >
            LOAD VAN
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/takeovervan"
          >
            TAKEOVER VAN
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/refuelvan"
          >
            REFUEL VAN
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/removevan"
          >
            REMOVE VAN
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/drivervan"
          >
            DRIVER VAN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VanManagement;
