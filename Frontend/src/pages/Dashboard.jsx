import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="relative h-screen">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-3xl font-bold text-black">
          Business Supply Management
        </h1>
        <div className="grid grid-cols-2 gap-8">
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/usermanagement"
          >
            USERS
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/vanmanagement"
          >
            VANS
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="companymanagement"
          >
            COMPANIES
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="productmanagement"
          >
            PRODUCTS
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer col-span-2"
            to="/displays"
          >
            DISPLAYS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
