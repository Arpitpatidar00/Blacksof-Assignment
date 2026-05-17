"use client";

import Image from "next/image";
import { NAV_LINKS, APP } from "@/constants";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[172px] py-7 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/dejoule-logo.svg"
          alt={`${APP.NAME} Logo`}
          width={175}
          height={64}
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-[58px]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-1.5 text-[18px] font-normal leading-[110%] text-[#4B4B4B] transition-colors hover:text-[#1B1B1B] font-inter"
          >
            {link.label}
            {"hasDropdown" in link && link.hasDropdown && (
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
