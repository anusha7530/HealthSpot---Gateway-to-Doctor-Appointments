import React, { useEffect, useRef, useContext } from "react";
import logo from "../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import { authContext } from "../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <div>
      <header className="header flex items-center" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="HealthSpot" className="w-60" />
            </div>
            <div className="navigation" ref={menuRef}>
              <ul className="menu flex items-center gap-[2.7rem]">
                <Link to="/">
                  <figure className="w-[55px] h-[55px] rounded-full  md:hidden">
                    <img
                      src={user}
                      alt="avatar"
                      className="rounded-full w-full"
                      onClick={toggleMenu}
                    />
                  </figure>
                </Link>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
                <button onClick={toggleMenu} className="text-2xl lg:hidden">
                  <IoMdCloseCircle />
                </button>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              {token && user ? (
                <div>
                  <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                    <figure className="rounded-full h-10 w-10">
                      <img
                        src={user?.photo}
                        alt="avatar"
                        className="rounded-full w-full"
                      />
                    </figure>
                    {/* <h2>{user?.name}</h2> */}
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              )}
              

              <span className="lg:hidden" onClick={toggleMenu}>
                <BiMenu className="w-6 h-6 cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
Header;
