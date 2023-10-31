import React from "react";
import { FaHome } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // destroying token from storage
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={`bg-[#00acee] h-[45px]`}>
      <div className='flex justify-center mx-8 pt-3'>
        <Link
          to='/'
          className={`${
            location.pathname !== "/" && "hover:text-[#bae6fd]"
          } block mt-4 lg:inline-block lg:mt-0 text-white mr-12`}
        >
          <FaHome
            className={`${
              location.pathname === "/" && "text-[#c3e8fc]"
            } w-5 h-5`}
          />
        </Link>
        <Link
          onClick={handleLogout}
          className='block mt-4 lg:inline-block lg:mt-0 text-white mr-12'
        >
          <IoLogOutOutline className='w-5 h-5 text-[#c3e8fc]' />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
