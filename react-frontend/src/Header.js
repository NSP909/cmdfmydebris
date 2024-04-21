import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 flex flex-col justify-center w-full h-[10vh] dark:bg-gray-900 border-b border-gray-50 border-solid shadow-sm shadow-gray-50 ">
      <nav className="border-gray-200 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to="/" className="flex items-center">
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">ResQVision</span>
          </Link>
          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 text-xl font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
