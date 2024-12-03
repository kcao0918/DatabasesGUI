import React, { useState, useEffect } from "react";
import LoadingCat from "./loading/LoadingCat";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMangement from "./pages/UserMangement";
import VanManagement from "./pages/VanManagement";
import ProductManagement from "./pages/ProductManagement";
import CompanyManagement from "./pages/CompanyManagement";
import Displays from "./pages/Displays";
import Navbar from "./components/NavBar";
import {
  AddDriver,
  AddEmployee,
  AddOwner,
  AddWorker,
  FireEmployee,
  HireEmployee,
  RemoveDriver,
} from "./procedures/usermanagement";

import {
  AddService,
  AddBusiness,
  AddLocation,
  FundBusiness,
  ManageService,
} from "./procedures/companymanagement";

import {
  AddProduct,
  PurchaseProduct,
  RemoveProduct,
} from "./procedures/productmanagement";

import {
  AddVan,
  DriveVan,
  LoadVan,
  RefuelVan,
  RemoveVan,
  TakeoverVan,
} from "./procedures/vanmanagement";

import {
  DriverView,
  EmployeeView,
  LocationView,
  OwnerView,
  ProductView,
  ServiceView,
} from "./views";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Display the loading animation for 3 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F3F1E5]">
        <LoadingCat />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usermanagement" element={<UserMangement />} />
          <Route path="/vanmanagement" element={<VanManagement />} />
          <Route path="/productmanagement" element={<ProductManagement />} />
          <Route path="/companymanagement" element={<CompanyManagement />} />
          <Route path="/displays" element={<Displays />} />

          {/* User Management */}
          <Route path="/adddriver" element={<AddDriver />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/addowner" element={<AddOwner />} />
          <Route path="/addworker" element={<AddWorker />} />
          <Route path="/fireemployee" element={<FireEmployee />} />
          <Route path="/hireemployee" element={<HireEmployee />} />
          <Route path="/removedriver" element={<RemoveDriver />} />

          {/* Company Management */}
          <Route path="/addservice" element={<AddService />} />
          <Route path="/addbusiness" element={<AddBusiness />} />
          <Route path="/addlocation" element={<AddLocation />} />
          <Route path="/fundbusiness" element={<FundBusiness />} />
          <Route path="/manageservice" element={<ManageService />} />

          {/* Product Mangement */}
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/purchaseproduct" element={<PurchaseProduct />} />
          <Route path="/removeproduct" element={<RemoveProduct />} />

          {/* Van Mangement */}
          <Route path="/addvan" element={<AddVan />} />
          <Route path="/drivevan" element={<DriveVan />} />
          <Route path="/loadvan" element={<LoadVan />} />
          <Route path="/refuelvan" element={<RefuelVan />} />
          <Route path="/removevan" element={<RemoveVan />} />
          <Route path="/takeovervan" element={<TakeoverVan />} />

          {/* Views */}
          <Route path="/driverview" element={<DriverView />} />
          <Route path="/employeeview" element={<EmployeeView />} />
          <Route path="/locationview" element={<LocationView />} />
          <Route path="/ownerview" element={<OwnerView />} />
          <Route path="/productview" element={<ProductView />} />
          <Route path="/serviceview" element={<ServiceView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
