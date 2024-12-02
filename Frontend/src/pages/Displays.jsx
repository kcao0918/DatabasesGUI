import { Link } from "react-router-dom";
import { mainPagesCss } from "../lib/css";

const Displays = () => {
  return (
    <div className={mainPagesCss}>
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-3xl font-bold text-black">TABLE DISPLAYS</h1>
        <div className="grid grid-cols-2 gap-8">
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/ownerview"
          >
            OWNER VIEW
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/employeeview"
          >
            EMPLOYEE VIEW
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/driverview"
          >
            DRIVER VIEW
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/locationview"
          >
            LOCATION VIEW
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/productview"
          >
            PRODUCT VIEW
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer"
            to="/serviceview"
          >
            SERVICE VIEW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Displays;
