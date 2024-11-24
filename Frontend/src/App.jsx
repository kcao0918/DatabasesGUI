import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMangement from "./pages/UserMangement";
import VanManagement from "./pages/VanManagement";
import ProductManagement from "./pages/ProductManagement";
import CompanyManagement from "./pages/CompanyManagement";
import Displays from "./pages/Displays";
import Navbar from "./components/NavBar";

function App() {
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
