import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children, loc }) => {
  const location = useLocation(); // Get the current route
  const isActive = location.pathname === loc; // Check if the route matches the link

  return (
    <div
      onMouseEnter={() => setActive(item)}
      onClick={() => setActive(item)} // Set the active state on click
      className="relative items-center justify-center"
    >
      <Link to={loc}>
        <motion.p
          transition={{ duration: 0.3 }}
          className={`cursor-pointer font-semibold hover:opacity-[0.7] ${
            isActive
              ? "text-green-400 border-green-400"
              : "text-[#AABF96]"
          }`}
        >
          {item}
        </motion.p>
      </Link>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            // changes padding and bg of "active"
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 bg-gray-800">
              <motion.div
                transition={transition}
                layoutId="active"
                // changes "active" menu styling
                className="bg-slate-500 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  setActive: PropTypes.func.isRequired,
  active: PropTypes.string,
  item: PropTypes.string.isRequired,
  children: PropTypes.node,
  loc: PropTypes.string,
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      // changes styling of navbar itself
      className="relative rounded-full !rounded-br-none border border-transparent dark:bg-black dark:border-white/[0.2] bg-[#1B4D44] shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

Menu.propTypes = {
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export const HoveredLink = ({ children, href, ...rest }) => {
  return (
    <Link
      to={href}
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};

HoveredLink.propTypes = {
  children: PropTypes.node.isRequired,
};
