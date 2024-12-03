-- CS4400: Introduction to Database Systems (Fall 2024)
-- Project Phase II: Database Schema SOLUTION [v0] Monday, Oct 21, 2024
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
use business_supply;

-- ---------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. Do NOT display any error messages, etc. */

-- [1] add_owner()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new owner.  A new owner must have a unique
username. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_owner;
delimiter //
create procedure add_owner (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date, OUT message VARCHAR(255))
sp_main: begin
    if ip_username is null or ip_first_name is null or 
		ip_last_name is null or ip_address is null or ip_birthdate is null then
        set message = "Error: One or more input parameters are NULL.";
        leave sp_main; end if;
        
    -- ensure new owner has a unique username
    if ip_username not in (select username from users) then 
		insert into users values(ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate); 
		insert into business_owners value(ip_username);
        set message = "Business Owner created.";
        leave sp_main;
	end if;
    set message = "Username already exists.";
end //
delimiter ;

-- [2] add_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new employee without any designated driver or
worker roles.  A new employee must have a unique username and a unique tax identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_employee;
delimiter //
create procedure add_employee (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date,
    in ip_taxID varchar(40), in ip_hired date, in ip_employee_experience integer,
    in ip_salary integer, OUT message VARCHAR(255))
sp_main: begin
    -- ensure new owner has a unique username
    -- ensure new employee has a unique tax identifier
    
     if ip_username is null or ip_first_name is null or ip_last_name is null or ip_address is null or ip_birthdate is null or 
    ip_taxID is null or ip_hired is null or ip_employee_experience is null or ip_salary is null then
		set message = "Error: One or more input parameters are NULL.";
		leave sp_main;
	end if;
    
	if ip_salary < 0 or ip_birthdate > ip_hired or ip_employee_experience < 0 then
		set message = "Salary and/or experience negative / born after hire date.";
		leave sp_main;
	end if;
    
	if ip_username not in (select username from users) and ip_taxID not in (select taxID from employees) then
		insert into users (username, first_name, last_name, address, birthdate) -- add into users
		values(ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
        insert into employees (username, taxID, hired, experience, salary)
        values (ip_username, ip_taxID, ip_hired, ip_employee_experience, ip_salary);
        set message = "Employee created.";
		leave sp_main;
	end if;
	set message = "Employee with username / taxID already exists.";
    
end //
delimiter ;

-- [3] add_driver_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the driver role to an existing employee.  The
employee/new driver must have a unique license identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_driver_role;
delimiter //
create procedure add_driver_role (in ip_username varchar(40), in ip_licenseID varchar(40),
	in ip_license_type varchar(40), in ip_driver_experience integer, OUT message VARCHAR(255))
sp_main: begin
    -- ensure employee exists and is not a worker
    -- ensure new driver has a unique license identifier
    
	if ip_username is null or ip_licenseID is null or ip_license_type is null or ip_driver_experience is null then
		set message = "Error: One or more input parameters are NULL.";
		leave sp_main;
	end if;
	if ip_driver_experience < 0 then set message = "Driver experience is negative."; leave sp_main; end if;
    
    if ip_username in (select username from employees) 
    and ip_username not in (select username from workers) 
    and ip_licenseID not in (select licenseID from drivers)
    and ip_username not in (select username from drivers)
    then
		insert into drivers (username, licenseID, license_type, successful_trips)
        values (ip_username, ip_licenseID, ip_license_type, ip_driver_experience);
        set message = "Driver role added to employee.";
	else
		set message = "User not an employee / a worker / already a driver.";
		leave sp_main;
    end if;
end //
delimiter ;

-- [4] add_worker_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the worker role to an existing employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_worker_role;
delimiter //
create procedure add_worker_role (in ip_username varchar(40), OUT message VARCHAR(255))
sp_main: begin
    -- ensure employee exists and is not a driver
    	if ip_username is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_username in (select username from employees) and ip_username not in (select username from drivers) 
    and ip_username not in (select username from workers)
    then
		insert into workers (username) values (ip_username);
        set message = "Worker role added to employee.";
	else
		set message = "User not an employee / a driver / already a worker.";
		leave sp_main;
	end if;
end //
delimiter ;

-- [5] add_product()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new product.  A new product must have a
unique barcode. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_product;
delimiter //
create procedure add_product (in ip_barcode varchar(40), in ip_name varchar(100),
	in ip_weight integer, OUT message VARCHAR(255))
sp_main: begin
	-- ensure new product doesn't already exist
        if ip_barcode is null or ip_name is null  or ip_weight is null then leave sp_main; end if;
        if ip_weight < 0 then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_barcode not in (select barcode from products) then
		insert into products (barcode, iname, weight) values (ip_barcode, ip_name, ip_weight);
        set message = "Product added.";
	else
		set message = "Barcode already exists.";
		leave sp_main;
	end if;
end //
delimiter ;

-- [6] add_van()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new van.  A new van must be assigned 
to a valid delivery service and must have a unique tag.  Also, it must be driven
by a valid driver initially (i.e., driver works for the same service). And the van's starting
location will always be the delivery service's home base by default. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_van;
delimiter //
create procedure add_van (in ip_id varchar(40), in ip_tag integer, in ip_fuel integer,
	in ip_capacity integer, in ip_sales integer, in ip_driven_by varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure new van doesn't already exist
    -- ensure that the delivery service exists
    -- ensure that a valid driver will control the van
        declare ip_located_at varchar(40) default null; 
--     set location of van to location of service
    
    if ip_id is null or ip_tag is null or ip_fuel is null or ip_capacity is null or ip_sales is null or ip_driven_by is null then
		set message = "Error: One or more input parameters are NULL.";
		leave sp_main;
	end if;
    if ip_capacity < 0 or ip_sales < 0 or ip_fuel < 0 then set message = "Some input is negative"; leave sp_main; end if;
    
    if ip_id not in (select id from delivery_services) then -- not valid delivery service
		set message = "Delivery service does not exist.";
		leave sp_main;
        end if;
    
	if exists(select * from vans v where v.id = ip_id and v.tag = ip_tag) then set message = "Van with tag in service exists"; leave sp_main; end if;

    if ip_driven_by not in (select username from drivers) then 
		set message = "Driver not found.";
		leave sp_main;
        end if;
        
	set ip_located_at = (select home_base from delivery_services where id = ip_id);
	
	insert into vans (id, tag, fuel, capacity, sales, driven_by, located_at) 
	values (ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_driven_by, ip_located_at);
    set message = "Van added to service.";
end //
delimiter ;

-- [7] add_business()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new business.  A new business must have a
unique (long) name and must exist at a valid location, and have a valid rating.
And a resturant is initially "independent" (i.e., no owner), but will be assigned
an owner later for funding purposes. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_business;
delimiter //
create procedure add_business (in ip_long_name varchar(40), in ip_rating integer,
	in ip_spent integer, in ip_location varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure new business doesn't already exist
    -- ensure that the location is valid
    -- ensure that the rating is valid (i.e., between 1 and 5 inclusively)
    	declare isBusiness INT default 0;
    declare isLocation INT default 0;
    
    if ip_long_name is null or ip_rating is null or ip_spent is null or ip_location is null then leave sp_main; end if;
    if (ip_spent is null) then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_location in (select location from businesses where ip_location = location) then
		set message = "A business already in location."; 
		leave sp_main; 
	end if;
	
    if ip_location in (select home_base from delivery_services where ip_location = home_base) then 
		set message = "A service already in location."; 
		leave sp_main; 
	end if;
    
    
    select count(*) into isBusiness
    from businesses
    where ip_long_name = long_name;
    
    select count(*) into isLocation
    from locations
    where ip_location = label;
    
    if isBusiness = 0 and isLocation != 0 and (ip_rating >= 1 and ip_rating <= 5) then
		insert into businesses (long_name, rating, spent, location)
        values (ip_long_name, ip_rating, ip_spent, ip_location);
        set message = "Business added.";
		leave sp_main;
	end if;
    set message = "Business already exists / Location not found / Rating invalid";
end //
delimiter ;

-- [8] add_service()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new delivery service.  A new service must have
a unique identifier, along with a valid home base and manager. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_service;
delimiter //
create procedure add_service (in ip_id varchar(40), in ip_long_name varchar(100),
	in ip_home_base varchar(40), in ip_manager varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure new delivery service doesn't already exist
    -- ensure that the home base location is valid
    -- ensure that the manager is valid
	if ip_id is null or ip_long_name is null or ip_home_base is null or ip_manager is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_id in (select id from delivery_services) then
		set message = "Service id already exists";
		leave sp_main;
	end if;
    
    if ip_home_base not in (select label from locations) then
		set message = "Location not found";
		leave sp_main;
	end if;
    
    if ip_manager not in (select username from workers) then
		set message = "Manager not a worker";
		leave sp_main;
	end if;

	if ip_manager in (select username from work_for) then
		set message = "Manager already a worker";
		leave sp_main;
	end if;
    
    if ip_home_base in (select location from businesses where ip_home_base = location) then
		set message = "A business already in location."; 
		leave sp_main; 
	end if;
	
    if ip_home_base in (select home_base from delivery_services where ip_home_base = home_base) then 
		set message = "A service already in location."; 
		leave sp_main; 
	end if;

    insert into delivery_services (id, long_name, home_base, manager)
    values (ip_id, ip_long_name, ip_home_base, ip_manager);
    
    insert into work_for (username , id)
    values (ip_manager, ip_id);
    
    set message = "Service with manager created.";
end //
delimiter ;

-- [9] add_location()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new location that becomes a new valid van
destination.  A new location must have a unique combination of coordinates. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_location;
delimiter //
create procedure add_location (in ip_label varchar(40), in ip_x_coord integer,
	in ip_y_coord integer, in ip_space integer, OUT message VARCHAR(255))
sp_main: begin
	-- ensure new location doesn't already exist
    -- ensure that the coordinate combination is distinct
	if ip_label is null or ip_x_coord is null or ip_y_coord is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
    if ip_space is not null and ip_space < 0 then set message = "Space is negative"; leave sp_main; end if;
    
	if ip_label in (select label from locations) then
		set message = "Location name already exists";
		leave sp_main;
	end if;
    
	if (select count(*) from locations where x_coord = ip_x_coord and y_coord = ip_y_coord) > 0 then
		set message = "Location with cords already exists";
		leave sp_main;
	end if;
    
    insert into locations (label, x_coord, y_coord, space) values (ip_label, ip_x_coord, ip_y_coord, ip_space);
    set message = "Location added.";
    
end //
delimiter ;

-- [10] start_funding()
-- -----------------------------------------------------------------------------
/* This stored procedure opens a channel for a business owner to provide funds
to a business. The owner and business must be valid. */
-- -----------------------------------------------------------------------------
drop procedure if exists start_funding;
delimiter //
create procedure start_funding (in ip_owner varchar(40), in ip_amount integer, in ip_long_name varchar(40), in ip_fund_date date, OUT message VARCHAR(255))
sp_main: begin

	-- ensure the owner and business are valid
    if ip_owner is null or ip_long_name is null or ip_fund_date is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
    if ip_amount is not null and ip_amount < 0 then set message = "Funding is negative"; leave sp_main; end if;
    
	if ip_owner not in (select username from business_owners) then
		set message = "User not a owner.";
		leave sp_main;
	elseif ip_long_name not in (select long_name from businesses) then
		set message = "Business not found.";
		leave sp_main;
    end if;
    
    insert into fund (username, invested, invested_date, business) values (ip_owner, ip_amount, ip_fund_date, ip_long_name);
    set message = "Funding added.";
    
end //
delimiter ;

-- [11] hire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure hires a worker to work for a delivery service.
If a worker is actively serving as manager for a different service, then they are
not eligible to be hired.  Otherwise, the hiring is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists hire_employee;
delimiter //
create procedure hire_employee (in ip_username varchar(40), in ip_id varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the employee hasn't already been hired by that service
	-- ensure that the employee and delivery service are valid
    -- ensure that the employee isn't a manager for another service
    if ip_username is null or ip_id is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_username not in (select username from employees) then
		set message = "User not an employee";
		leave sp_main; end if;
        
	if ip_username not in (select username from workers) then set 
		message = "User does not have worker role"; 
		leave sp_main; 
	end if;
    
	if ip_id not in (select id from delivery_services) then
		set message = "Service not found";
		leave sp_main; 
	end if;
	if ip_username in (select username from work_for where id = ip_id) then -- ensure that the employee hasn't already been hired by that service
		set message = "Employee already hired";
        leave sp_main;
	end if;
	if ip_username in (select manager from delivery_services where id != ip_id) then -- ensure that the employee isn't a manager for another service
		set message = "Employee manager for a service";
        leave sp_main; 
	end if;
	
    
    insert into work_for (username, id) values (ip_username, ip_id);
    set message = "Employee hired";
end //
delimiter ;

-- [12] fire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure fires a worker who is currently working for a delivery
service.  The only restriction is that the employee must not be serving as a manager 
for the service. Otherwise, the firing is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists fire_employee;
delimiter //
create procedure fire_employee (in ip_username varchar(40), in ip_id varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the employee is currently working for the service
    -- ensure that the employee isn't an active manager
    if ip_username is null or ip_id is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_username not in (select username from work_for where ip_id = id) then
		set message = "Employee not a worker for service";
		leave sp_main; end if;
	
    if ip_username in (select manager from delivery_services where ip_id = id) then
		set message = "Cannot fire manager of service";
		leave sp_main;
	end if;
    
    if (select count(username) from work_for where id = ip_id) < 2 then 
		set message = "This is the last employee."; 
		leave sp_main; 
	end if;
    
    delete from work_for w where w.username = ip_username and w.id = ip_id;
    set message = "Employee fired.";
end //
delimiter ;

-- [13] manage_service()
-- -----------------------------------------------------------------------------
/* This stored procedure appoints a worker who is currently hired by a delivery
service as the new manager for that service.  The only restrictions is that
the worker must not be working for any other delivery service. Otherwise, the appointment 
to manager is permitted.  The current manager is simply replaced. */
-- -----------------------------------------------------------------------------
drop procedure if exists manage_service;
delimiter //
create procedure manage_service (in ip_username varchar(40), in ip_id varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the employee is currently working for the service
    -- ensure that the employee isn't working for any other services
    if ip_username is null or ip_id is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_username not in (select username from workers) then
		set message = "User not a worker"; leave sp_main;
	end if;
	if ip_username in (select username from work_for where ip_id != id) then
		set message = "Worker works for other services.";
		leave sp_main;
	end if;
    
	update delivery_services
    set manager = ip_username
    where id = ip_id;
    set message = "Worker new manager for service";
end //
delimiter ;

-- [14] takeover_van() 
-- -----------------------------------------------------------------------------
/* This stored procedure allows a valid driver to take control of a van owned by 
the same delivery service. The current controller of the van is simply relieved 
of those duties. */
-- -----------------------------------------------------------------------------
drop procedure if exists takeover_van;
delimiter //
create procedure takeover_van (in ip_username varchar(40), in ip_id varchar(40),
	in ip_tag integer, OUT message VARCHAR(255))
sp_main: begin 
	-- ensure that the driver is not driving for another service
	-- ensure that the selected van is owned by the same service
    -- ensure that the employee is a valid driver
    if ip_id is null or ip_tag is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
	
    if not exists (select 1 from vans where ip_id=id and tag=ip_tag) then set message = "Van does not exist"; leave sp_main; end if;
-- ensure that the driver is not driving for another service
	if ip_username is null then
		    update vans v
			set driven_by = null
			where v.tag = ip_tag and v.id = ip_id;
			set message = "Van has no driver"; leave sp_main;
	end if;
    
	-- ensure that the employee is a valid driver
    if ip_username not in (select username from drivers) then set message = "User not a driver"; leave sp_main; end if;
    if exists (select 1 from vans where driven_by=ip_username and ip_id!=id) > 0 then set message = "Driver driving another van"; leave sp_main; end if;
    -- ensure that the selected van is owned by the same service
	
    update vans v
    set driven_by = ip_username
    where v.tag = ip_tag and v.id = ip_id;
	set message = "Van has a driver";
    
end //
delimiter ;

-- [15] load_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add some quantity of fixed-size packages of
a specific product to a van's payload so that we can sell them for some
specific price to other businesses.  The van can only be loaded if it's located
at its delivery service's home base, and the van must have enough capacity to
carry the increased number of items.

The change/delta quantity value must be positive, and must be added to the quantity
of the product already loaded onto the van as applicable.  And if the product
already exists on the van, then the existing price must not be changed. */
-- -----------------------------------------------------------------------------
drop procedure if exists load_van;
delimiter //
create procedure load_van (in ip_id varchar(40), in ip_tag integer, in ip_barcode varchar(40),
	in ip_more_packages integer, in ip_price integer, OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the van being loaded is owned by the service
	-- ensure that the product is valid
    -- ensure that the van is located at the service home base
	-- ensure that the quantity of new packages is greater than zero
	-- ensure that the van has sufficient capacity to carry the new packages
    -- add more of the product to the van
    
    if ip_id is null or ip_tag is null or ip_barcode is null or ip_more_packages is null or ip_price is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
    if not exists (select 1 from vans where ip_id = id and ip_tag = tag) then set message = "Van does not exist"; leave sp_main;
	elseif ip_barcode not in (select barcode from products) then -- ensure that the product is valid
		set message = "Barcode not found"; leave sp_main;
	elseif (select located_at from vans where tag = ip_tag and id = ip_id) != (select home_base from delivery_services where id = ip_id) then -- ensure that the van is located at the service home base
		set message = "Van not at service home base"; leave sp_main;
    elseif ip_more_packages <= 0 then -- ensure that the quantity of new packages is greater than zero
		set message = "Packages negative"; leave sp_main;
	elseif ((select count(*) from contain where id = ip_id and tag = ip_tag) + 1) > (select capacity from vans where id = ip_id and tag = ip_tag) 
		then -- ensure that the van has sufficient capacity to carry the new packages
		set message = "Not enough space in van"; leave sp_main;
    end if;
    
	if ip_barcode in (select barcode from contain where tag = ip_tag and id = ip_tag) then
		update contain 
		set quantity = quantity + ip_more_packages
		where tag = ip_tag and id = ip_id and barcode = ip_barcode;
	else
		insert into contain (id, tag, barcode, quantity, price) values (ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price);
    end if;
	set message = "Product loaded onto van.";
    
end //
delimiter ;

-- [16] refuel_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add more fuel to a van. The van can only
be refueled if it's located at the delivery service's home base. */
-- -----------------------------------------------------------------------------
drop procedure if exists refuel_van;
delimiter //
create procedure refuel_van (in ip_id varchar(40), in ip_tag integer, in ip_more_fuel integer, OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the van being switched is valid and owned by the service
    
    if ip_id is null or ip_tag is null or ip_more_fuel is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
    -- ensure that the van is located at the service home base
    if ip_tag not in (select tag from vans where id = ip_id) then
		set message = "Van not found"; leave sp_main;
	-- ensure that the van is located at the service home base
	elseif (select located_at from vans where id = ip_id and tag = ip_tag) not in (select home_base from delivery_services where id = ip_id) then
		set message = "Van not at service home base"; leave sp_main;
	end if;

    update vans
    set fuel = fuel + ip_more_fuel
    where tag = ip_tag and id = ip_id;
    set message = "Van refueled";
end //
delimiter ;

-- [17] drive_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to move a single van to a new
location (i.e., destination). This will also update the respective driver's 
experience and van's fuel. The main constraints on the van(s) being able to 
move to a new  location are fuel and space.  A van can only move to a destination
if it has enough fuel to reach the destination and still move from the destination
back to home base.  And a van can only move to a destination if there's enough
space remaining at the destination. */
-- -----------------------------------------------------------------------------
drop function if exists fuel_required;
delimiter //
create function fuel_required (ip_departure varchar(40), ip_arrival varchar(40))
	returns integer reads sql data
begin
	if (ip_departure = ip_arrival) then return 0;
    else return (select 1 + truncate(sqrt(power(arrival.x_coord - departure.x_coord, 2) + power(arrival.y_coord - departure.y_coord, 2)), 0) as fuel
		from (select x_coord, y_coord from locations where label = ip_departure) as departure,
        (select x_coord, y_coord from locations where label = ip_arrival) as arrival);
	end if;
end //
delimiter ;

drop procedure if exists drive_van;
delimiter //
create procedure drive_van (in ip_id varchar(40), in ip_tag integer, in ip_destination varchar(40), OUT message VARCHAR(255))
sp_main: begin
    -- ensure that the destination is a valid location
    -- ensure that the van isn't already at the location
    -- ensure that the van has enough fuel to reach the destination and (then) home base
    -- ensure that the van has enough space at the destination for the trip
    	declare currentlyAt varchar(40);
    if ip_id is null or ip_tag is null or ip_destination is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
	-- if tag isnt a valid van
	if not exists (select 1 from vans where id = ip_id and tag = ip_tag) then
		set message = "Van not found"; leave sp_main;
	-- if id isn't for a valid delivery service
    elseif ip_id not in (select id from delivery_services) then
		set message = "Service not found"; leave sp_main;
	-- ensure that the destination is a valid location
	elseif ip_destination not in (select label from locations) then
		set message = "Destination not found"; leave sp_main;
    -- ensure that the van isn't already at the location
    elseif (select located_at from vans where id = ip_id and ip_tag = tag) = ip_destination then
		set message = "Van already at destination"; leave sp_main;
    -- ensure that the van has enough fuel to reach the destination and (then) home base
    elseif (select fuel from vans where id = ip_id and tag = ip_tag) <= 
    (fuel_required((select located_at from vans where id = ip_id and tag = ip_tag), ip_destination) + 
    fuel_required(ip_destination, (select home_base from delivery_services where id = ip_id))) then
		set message = "Not enough fuel"; leave sp_main;
    -- ensure that the van has enough space at the destination for the trip
    elseif ((select space from locations where label = ip_destination) - (select count(*) from vans where located_at = ip_destination)) < 1 then
		set message = "Not enoguh space at destination"; leave sp_main;
	-- 	ensure van has driver
	else if (select driven_by from vans where id = ip_id and tag = ip_tag) is null then 
		set message = "Van had no driver"; leave sp_main; end if; 
	end if;
    
    set currentlyAt = (select located_at from vans where id = ip_id and tag = ip_tag);
    -- update vans' destination
	update vans
    set located_at = ip_destination, 
    fuel = fuel - (fuel_required(currentlyAt, ip_destination))
    where tag = ip_tag and id = ip_id;
    
	-- update drivers' exp
    update drivers
    set successful_trips = successful_trips + 1
    where username in (select driven_by from vans where tag = ip_tag and id = ip_id);

	set message = "Van driven to destination";
    
end //
delimiter ;


-- [18] purchase_product()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a business to purchase products from a van
at its current location.  The van must have the desired quantity of the product
being purchased.  And the business must have enough money to purchase the
products.  If the transaction is otherwise valid, then the van and business
information must be changed appropriately.  Finally, we need to ensure that all
quantities in the payload table (post transaction) are greater than zero. */
-- -----------------------------------------------------------------------------
drop procedure if exists purchase_product;
delimiter //
create procedure purchase_product (in ip_long_name varchar(40), in ip_id varchar(40),
	in ip_tag integer, in ip_barcode varchar(40), in ip_quantity integer, OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the business is valid
    -- ensure that the van is valid and exists at the business's location
	-- ensure that the van has enough of the requested product
	-- update the van's payload
    -- update the monies spent and gained for the van and business
    -- ensure all quantities in the contain table are greater than zero
    declare totalCostOfQuantity integer;
    
    if ip_long_name is null or ip_id is null or ip_tag is null or ip_barcode is null or ip_quantity is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
	if ip_quantity <= 0 then set message = "Purchase quantity negative"; leave sp_main; end if;
    
    -- make sure there is at least one instance of barcode, tag, and id in contain
    if (select count(*) from contain where barcode = ip_barcode and tag = ip_tag and id = ip_id) < 1 then
		set message = "Van does not have product"; leave sp_main;
	end if;
	-- ensure that the business is valid
    if ip_long_name not in (select long_name from businesses) then
		set message = "Business not found"; leave sp_main;
	end if;
    -- ensure that the van is valid and exists at the business's location
    if not exists (select 1 from vans where id = ip_id and tag = ip_tag)
    or ((select located_at from vans where id = ip_id and tag = ip_tag) != (select location from businesses where long_name = ip_long_name)) then
		set message = "Can not at business location"; leave sp_main;
	end if;
	-- ensure that the van has enough of the requested product
    if (select quantity from contain where barcode = ip_barcode and id = ip_id and tag = ip_tag) < ip_quantity then
		set message = "Not enough of requested product in van"; leave sp_main;
	end if;
    
    -- assuming its quantity * cost
    set totalCostOfQuantity = ip_quantity * (select price from contain where barcode = ip_barcode and tag = ip_tag and id = ip_id);
    
	-- update the van's payload
    update contain
    set quantity = quantity - ip_quantity
    where barcode = ip_barcode and tag = ip_tag and id = ip_id;
    
    -- update the monies spent and gained for the van and business 
    update businesses 
    set spent = spent + totalCostOfQuantity
    where long_name = ip_long_name;
    
    update vans
    set sales = sales + totalCostOfQuantity
    where id = ip_id and tag = ip_tag;
    
    delete from contain
    where quantity <= 0;

	set message = "Product purchased bu business from van";
    
end //
delimiter ;

-- [19] remove_product()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a product from the system.  The removal can
occur if, and only if, the product is not being carried by any vans. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_product;
delimiter //
create procedure remove_product (in ip_barcode varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the product exists
    -- ensure that the product is not being carried by any vans
        -- ensure that the product exists
	if ip_barcode is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_barcode not in (select barcode from products) then
		set message = "Barcode not found"; leave sp_main;
	elseif ip_barcode in (select barcode from contain) then -- ensure that the product is not being carried by any vans
		set message = "Product being carried in some vans"; leave sp_main;
    end if;
    
    delete from products where barcode = ip_barcode;
	set message = "Product removed";
    
end //
delimiter ;

-- [20] remove_van()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a van from the system.  The removal can
occur if, and only if, the van is not carrying any products.*/
-- -----------------------------------------------------------------------------
drop procedure if exists remove_van;
delimiter //
create procedure remove_van (in ip_id varchar(40), in ip_tag integer, OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the van exists
    -- ensure that the van is not carrying any products
    	-- ensure that the van exists
	if ip_id is null or ip_tag is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
    if not exists (select 1 from vans where id = ip_id and ip_tag = ip_tag) then
		set message = "Van not found"; leave sp_main;
	-- elseif ((select sum(quantity) from contain where id = ip_id and tag = ip_tag) > 0) ERRORMAYBE still carrying products, -- ensure that the van is not carrying any products
    elseif ((select count(*) from contain where id = ip_id and tag = ip_tag) > 0) then -- in contains;
		set message = "Van carrying products"; leave sp_main;
	end if;
    
    delete from vans where tag = ip_tag and id = ip_id;
    set message = "Van removed";
end //
delimiter ;

-- [21] remove_driver_role()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a driver from the system.  The removal can
occur if, and only if, the driver is not controlling any vans.  
The driver's information must be completely removed from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_driver_role;
delimiter //
create procedure remove_driver_role (in ip_username varchar(40), OUT message VARCHAR(255))
sp_main: begin
	-- ensure that the driver exists
    -- ensure that the driver is not controlling any vans
    -- remove all remaining information
    if ip_username is null then set message = "Error: One or more input parameters are NULL."; leave sp_main; end if;
    
	if ip_username not in (select username from drivers) then
		set message = "Driver not found"; leave sp_main;
	-- ensure that the driver is not controlling any vans
	elseif (select count(*) from vans where driven_by = ip_username) > 0 then
		set message = "Driver currently driving a van"; leave sp_main;
	end if;
    
    
	delete from drivers where username = ip_username;
	delete from employees where username = ip_username;
    delete from users where username = ip_username;
	set message = "Driver removed";
end //
delimiter ;

-- [22] display_owner_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an owner.
For each owner, it includes the owner's information, along with the number of
businesses for which they provide funds and the number of different places where
those businesses are located.  It also includes the highest and lowest ratings
for each of those businesses, as well as the total amount of debt based on the
monies spent purchasing products by all of those businesses. And if an owner
doesn't fund any businesses then display zeros for the highs, lows and debt. */
-- -----------------------------------------------------------------------------
create or replace view display_owner_view as
select owners.username, u.first_name, u.last_name, u.address,
	count(distinct f.business) as num_of_bus, 
	count(distinct b.location) as num_locations,
    ifnull(max(b.rating), 0) as highest_rating,
    ifnull(min(b.rating), 0) as lowest_rating,
    ifnull(sum(b.spent), 0) as debt
from business_owners owners
left join fund f
on owners.username = f.username
left join businesses b
on f.business = b.long_name
JOIN users u ON owners.username = u.username
group by owners.username;


-- [23] display_employee_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an employee.
For each employee, it includes the username, tax identifier, salary, hiring date and
experience level, along with license identifer and driving experience (if applicable,
'n/a' if not), and a 'yes' or 'no' depending on the manager status of the employee. */
-- -----------------------------------------------------------------------------
create or replace view display_employee_view as
select distinct e.username, e.taxID, e.salary, e.hired, e.experience as employee_experience, 
ifnull(d.licenseID, 'n/a') as licenseID, 
ifnull(d.successful_trips, 'n/a') as driving_experience,
if(ds.manager is not null, 'yes', 'no') as manager_status
from employees e
join users u on e.username = u.username
left join drivers d on e.username = d.username
left join work_for w on w.username = e.username
left join delivery_services ds on ds.manager = e.username;

-- [24] display_driver_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a driver.
For each driver, it includes the username, licenseID and drivering experience, along
with the number of vans that they are controlling. */
-- -----------------------------------------------------------------------------
create or replace view display_driver_view as
select d.username, d.licenseID, d.successful_trips, count(v.driven_by) as num_of_vans
from drivers d
left join vans v on d.username = v.driven_by
group by username;

-- [25] display_location_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a location.
For each location, it includes the label, x- and y- coordinates, along with the
name of the business or service at that location, the number of vans as well as 
the identifiers of the vans at the location (sorted by the tag), and both the 
total and remaining capacity at the location. */
-- -----------------------------------------------------------------------------
create or replace view display_location_view as
select l.label,
COALESCE(b.long_name, ds.long_name) AS long_name,
l.x_coord,
l.y_coord,
l.space,
count(v.id) as num_of_vans,
group_concat(concat(v.id, v.tag) order by v.tag separator ',') as van_ids,
l.space - count(v.id) as remaining_capacity
from locations l
left join delivery_services ds on ds.home_base = l.label
left join businesses b on b.location = l.label
join vans v on v.located_at = l.label
group by l.label, COALESCE(b.long_name, ds.long_name);

-- [26] display_product_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of the products.
For each product that is being carried by at least one van, it includes a list of
the various locations where it can be purchased, along with the total number of packages
that can be purchased and the lowest and highest prices at which the product is being
sold at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_product_view as
select p.iname as product_name,
v.located_at as location,
c.quantity as amount_available,
min(c.price) as low_price,
max(c.price) as high_price
from products p
natural join contain c
natural join vans v
group by p.iname, v.located_at, c.quantity
order by p.iname;

-- [27] display_service_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a delivery
service.  It includes the identifier, name, home base location and manager for the
service, along with the total sales from the vans.  It must also include the number
of unique products along with the total cost and weight of those products being
carried by the vans. */
-- -----------------------------------------------------------------------------
create or replace view display_service_view as
select 
	van_info.id,
    van_info.long_name,
    van_info.home_base,
    van_info.manager,
    if(van_info.revenue is not null, van_info.revenue, 0) as revenue,
    if(product_info.products_carried is not null, product_info.products_carried, 0) as products_carried,
    product_info.cost_carried,
    product_info.weight_carried
from (
	select ds.id, 
	ds.long_name,
	ds.home_base,
	ds.manager, 
	sum(v.sales) as revenue
	from delivery_services ds
	left join vans v on ds.id = v.id
	group by ds.id
    ) as van_info
left join (
	select c.id, count(distinct c.barcode) as products_carried, 
    sum(c.quantity * c.price) as cost_carried, 
    sum(c.quantity * p.weight) as weight_carried
	from contain c
	left join products p on c.barcode = p.barcode
	group by c.id
) as product_info
on van_info.id = product_info.id;
