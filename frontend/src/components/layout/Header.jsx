import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Header */}
      <header className="bg-primary-dark sticky top-0 w-full">
        {/* Logo (Left) */}
        <div className="xl:w-6xl lg:w-5xl mx-auto flex items-center justify-between px-6 py-4 h-16">
          <div className="text-xl font-bold text-base-900">TODO</div>

          {/* Middle Nav (Desktop) */}
          <nav className="hidden md:flex space-x-6 text-base-900">
            <Link to="/" className="hover:text-base-50 transition duration-500">
              Tasks
            </Link>
            <Link
              to="/user"
              className="hover:text-base-50 transition duration-500"
            >
              Profile
            </Link>
          </nav>

          {/* Login (Right) */}
          <button className="hidden md:block bg-base-50 text-base-900 py-2 px-4 rounded-lg shadow-md hover:bg-secondary hover:shadow-lg transition duration-300">
            Login
          </button>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-base-900 text-2xl"
            onClick={toggleSidebar}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Sidebar */}

        <div
          className={`md:hidden flex flex-col items-start px-6  bg-base-800 text-base-900 transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          } `}
        >
          <nav className="flex flex-col gap-3 w-full">
            <Link
              to="/"
              className="hover:text-base-50 transition duration-500"
              onClick={toggleSidebar}
            >
              Tasks
            </Link>
            <Link
              to="/user"
              className="hover:text-base-50 transition duration-500"
              onClick={toggleSidebar}
            >
              Profile
            </Link>
          </nav>

          <button
            onClick={toggleSidebar}
            className="mt-4 bg-base-50 text-base-900 py-2 px-4 rounded-lg shadow-md hover:bg-secondary hover:shadow-lg transition duration-300 w-2/6"
          >
            Login
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
