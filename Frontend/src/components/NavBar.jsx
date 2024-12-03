import { useState } from "react";
import PropTypes from "prop-types";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

function Navbar({ className }) {
  const [active, setActive] = useState("Dashboard");

  return (
    <div
      className={cn(
        "fixed top-[1vh] inset-x-0 w-[70vw] mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={null}
          item="Dashboard"
          loc="/dashboard"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="User Management"
          loc="/usermanagement"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/addowner">Add Owner</HoveredLink>
            <HoveredLink href="/addemployee">Add Employee</HoveredLink>
            <HoveredLink href="/addworker">Add Worker</HoveredLink>
            <HoveredLink href="/adddriver">Add Driver</HoveredLink>
            <HoveredLink href="/hireemployee">Hire Employee</HoveredLink>
            <HoveredLink href="/fireemployee">Fire Employee</HoveredLink>
            <HoveredLink href="/removedriver">Remove Driver</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Van Management"
          loc="/vanmanagement"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/addvan">Add Van</HoveredLink>
            <HoveredLink href="/takeovervan">Take Over Van</HoveredLink>
            <HoveredLink href="/drivevan">Drive Van</HoveredLink>
            <HoveredLink href="/loadvan">Load Van</HoveredLink>
            <HoveredLink href="/refuelvan">Refuel Van</HoveredLink>
            <HoveredLink href="/removevan">Remove Van</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Company Management"
          loc="/companymanagement"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/addservice">Add Service</HoveredLink>
            <HoveredLink href="/addbusiness">Add Business</HoveredLink>
            <HoveredLink href="/addlocation">Add Location</HoveredLink>
            <HoveredLink href="/fundbusiness">Fund Business</HoveredLink>
            <HoveredLink href="/manageservice">Manage Service</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Product Management"
          loc="/productmanagement"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/addproduct">Add Product</HoveredLink>
            <HoveredLink href="/purchaseproduct">Purchase Product</HoveredLink>
            <HoveredLink href="/removeproduct">Remove Product</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Displays"
          loc="/displays"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/ownerview">Owner View</HoveredLink>
            <HoveredLink href="/employeeview">Employee View</HoveredLink>
            <HoveredLink href="/serviceview">Service View</HoveredLink>
            <HoveredLink href="/driverview">Driver View</HoveredLink>
            <HoveredLink href="/locationview">Location View</HoveredLink>
            <HoveredLink href="/productview">Product View</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;
