import React from "react";

const Header = () => {
  return (
    <div className="flex items-center">
      <div className="border-8 border-white h-20 flex items-center mx-4 sm:mx-0 w-1/2 sm:w-auto">
        <img
          src="https://www.lords.ac.in/wp-content/uploads/2023/04/Website-Logo.png"
          alt="Lords Institute Logo"
          className="h-20 w-full ml-3 sm:w-56 object-contain" //Adjust this margin acc
        />
      </div>
      {/*Adjust this margin acc*/}
      <header className="bg-secondary h-24 flex-grow ml-6">
        <div className="flex items-center justify-end mt-6 px-4 sm:px-16 py-2">
          <nav>
            <ul className="flex space-x-4 sm:space-x-6 text-white font-bold">
              <li className="relative group hidden sm:block text-xl mr-24">
                FACULTY MANAGEMENT SYSTEM
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
