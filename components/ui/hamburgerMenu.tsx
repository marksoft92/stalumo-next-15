"use client";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslations } from "next-intl";

type SubmenuItem = {
  href: string;
  label: string;
  icon: JSX.Element;
  description: string;
};

type NavLink = {
  href: string | any;
  label: string | any;
  hasSubmenu?: boolean;
  submenu?: SubmenuItem[];
};

const HamburgerMenu = ({ navLinks }: { navLinks: NavLink[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const t = useTranslations("Header");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenSubmenu(null); // Reset submenu when closing main menu
  };

  const handleLinkClick = (link: NavLink, e: React.MouseEvent) => {
    if (link.hasSubmenu && link.label === t("offer")) {
      e.preventDefault();
      setOpenSubmenu(openSubmenu === link.label ? null : link.label);
    } else {
      setIsOpen(false);
      setOpenSubmenu(null);
    }
  };

  const handleSubmenuItemClick = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <div className="lg:hidden xxxx">
      <button
        className="text-[#fff] relative z-[11]"
        onClick={toggleMenu}
        aria-label="menu open/close"
      >
        <SvgIcon className="!text-[3rem]">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </SvgIcon>
      </button>

      {isOpen && (
        <div className="absolute top-0 right-0 bg-[#121212] p-4 w-full text-white z-10 max-h-screen overflow-y-auto">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              {link.hasSubmenu ? (
                <>
                  {/* Main link with dropdown toggle */}
                  <button
                    onClick={(e) => handleLinkClick(link, e)}
                    className="w-full flex items-center justify-between uppercase font-bold text-[1rem] font-oswald py-2 text-white hover:text-[#EB4036] transition-colors"
                  >
                    <span>{link.label}</span>
                    <SvgIcon
                      className={`!text-[1.5rem] transition-transform duration-300 ${openSubmenu === link.label ? 'rotate-180' : ''
                        }`}
                    >
                      <KeyboardArrowDownIcon />
                    </SvgIcon>
                  </button>

                  {/* Submenu */}
                  {openSubmenu === link.label && (
                    <div className="ml-4 mt-2 space-y-1 bg-[#1A1A1A]/50 rounded-lg p-2 border border-[#333]/50">
                      {link.submenu?.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subLink.href as any}
                          onClick={handleSubmenuItemClick}
                          className="group flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#EB4036]/10 hover:to-[#d63428]/10 rounded-lg transition-all duration-300"
                        >
                          <div className="text-[#EB4036] group-hover:scale-110 transition-transform duration-300">
                            {subLink.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm uppercase font-oswald">
                              {subLink.label}
                            </div>
                            <div className="text-xs text-gray-500 group-hover:text-gray-400 normal-case">
                              {subLink.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Regular navigation link */
                <Link
                  className="block uppercase font-bold text-[1rem] font-oswald py-2 hover:text-[#EB4036] transition-colors"
                  href={link.href}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;