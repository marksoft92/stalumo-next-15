"use client";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type NavLink = {
  href: string | any;
  label: string | any;
};

const HamburgerMenu = ({ navLinks }: { navLinks: NavLink[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden xxxx">
      <button className="text-[#fff] relative z-[11]" onClick={toggleMenu} aria-label="menu open/close">
        <SvgIcon className="!text-[3rem]">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </SvgIcon>
      </button>
      {isOpen && (
        <div className="absolute top-0 right-0 bg-[#121212] p-4 w-full text-white z-10">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              className="block uppercase font-bold text-[1rem] font-oswald py-2"
              href={link.href}
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default HamburgerMenu;
