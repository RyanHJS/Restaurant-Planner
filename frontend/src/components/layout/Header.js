import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-200 p-4">
      <nav className="flex items-center justify-center">
        <ul className="flex space-x-4 font-bold">
          <li>
            <Link
              to="/home"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/eventform"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Event Form
            </Link>
          </li>
          <li>
            <Link
              to="/eventslist"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Events List
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sign up
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/test/searchplace"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Test Search Place
            </Link>
          </li>
          <li>
            <Link
              to="/test/menusearchplace"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Test Search Place Menu
            </Link>
          </li>
          <li>
            <Link
              to="/test/voting"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Test Voting
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
