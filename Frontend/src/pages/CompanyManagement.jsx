import { Link } from "react-router-dom";

const CompanyManagement = () => {
  return (
    <div className="relative h-screen bg-[#F3F1E5]">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-3xl font-bold text-black">Company Management</h1>
        <div className="grid grid-cols-2 gap-8">
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/addbusiness"
          >
            ADD BUSINESS
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/addservice"
          >
            ADD SERVICE
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/fundbusiness"
          >
            FUND BUSINESS
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/manageservice"
          >
            MANAGE SERVICE
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer col-span-2"
            to="/addlocation"
          >
            ADD LOCATION
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
