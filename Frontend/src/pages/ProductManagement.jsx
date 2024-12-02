import { Link } from "react-router-dom";
import { mainPagesCss } from "../lib/css";

const ProductManagement = () => {
  return (
    <div className={mainPagesCss}>
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-3xl font-bold text-black">
          Business Supply Management
        </h1>
        <div className="grid grid-cols-2 gap-8">
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer col-span-2"
            to="/addproduct"
          >
            ADD PRODUCT
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer col-span-2"
            to="/purchaseproduct"
          >
            PURCHASE PRODUCT
          </Link>
          <Link
            className="text-3xl font-semibold px-4 py-2 text-center rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer col-span-2"
            to="/removeproduct"
          >
            REMOVE PRODUCT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
