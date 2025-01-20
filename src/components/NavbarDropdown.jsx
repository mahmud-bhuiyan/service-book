import React from "react";
import { Link } from "react-router-dom";

const NavbarDropdown = ({ isOpen, onClose, links }) => (
  <div
    style={{ display: isOpen ? "block" : "none" }}
    onClick={onClose}
    className="absolute right-0 mt-11 w-40 mb-2 origin-top-right bg-white rounded shadow-xl"
  >
    {links.map((link, index) => (
      <React.Fragment key={index}>
        {link.to ? (
          <Link
            to={link.to}
            className="block w-full py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 rounded text-center"
          >
            <div className="flex gap-2 justify-center items-center">
              {link.icon}
              {link.label}
            </div>
          </Link>
        ) : (
          <div
            onClick={link.onClick}
            className="block w-full py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 rounded text-center cursor-pointer"
          >
            <div className="flex gap-2 justify-center items-center">
              {link.icon}
              {link.label}
            </div>
          </div>
        )}
        {index < links.length - 1 && (
          <hr className="border-gray-200 dark:border-gray-700" />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default NavbarDropdown;
