import Image from "next/image";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_SOLUTION_LINKS,
  FOOTER_SOCIAL_LINKS,
  APP,
} from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-full mt-0">
      {/* Footer Main */}
      <div
        className="rounded-t-[64px] pt-[94px] pb-[32px] px-[120px]"
        style={{ background: "var(--gradient-footer)" }}
      >
        {/* Top Section */}
        <div className="flex justify-between items-start gap-[80px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/footer-logo.svg"
              alt={`${APP.NAME} - ${APP.TAGLINE}`}
              width={279}
              height={103}
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          {/* Right Columns */}
          <div className="flex items-start justify-between w-full max-w-[900px]">
            {/* Company Column */}
            <div className="flex flex-col gap-[26px] min-w-[180px]">
              <span className="font-body font-semibold text-[16px] leading-[110%] tracking-[-0.03em] text-primary uppercase whitespace-nowrap">
                Company
              </span>

              <div className="flex flex-col gap-5">
                {FOOTER_COMPANY_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="
                      whitespace-nowrap
                      font-body
                      font-semibold
                      text-[16px]
                      leading-[110%]
                      tracking-[-0.03em]
                      text-footer-link
                      hover:text-foreground
                      transition-colors
                    "
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div className="flex flex-col gap-[26px] min-w-[220px]">
              <span className="font-body font-semibold text-[16px] leading-[110%] tracking-[-0.03em] text-primary uppercase whitespace-nowrap">
                Solutions
              </span>

              <div className="flex flex-col gap-5">
                {FOOTER_SOLUTION_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="
                      whitespace-nowrap
                      font-body
                      font-semibold
                      text-[16px]
                      leading-[110%]
                      tracking-[-0.03em]
                      text-footer-link
                      hover:text-foreground
                      transition-colors
                    "
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Column */}
            <div className="flex flex-col gap-[26px] min-w-[220px]">
              <span className="font-body font-semibold text-[16px] leading-[110%] tracking-[-0.03em] text-primary uppercase whitespace-nowrap">
                Social
              </span>

              <div className="flex flex-col gap-5">
                {FOOTER_SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="
                      flex items-center gap-2.5
                      whitespace-nowrap
                      font-body
                      font-semibold
                      text-[16px]
                      leading-[110%]
                      tracking-[-0.03em]
                      text-footer-link
                      hover:text-foreground
                      transition-colors
                    "
                  >
                    <Image
                      src={link.icon}
                      alt=""
                      width={22}
                      height={22}
                      style={{ width: "auto", height: "auto" }}
                      aria-hidden="true"
                    />

                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center mt-[96px]">
          <span className="font-body font-medium text-[18px] leading-[118%] tracking-[-0.0556em] text-footer-text whitespace-nowrap">
            © 2025 All Rights Reserved
          </span>

          <span className="font-body font-medium text-[18px] leading-[118%] tracking-[-0.0556em] text-footer-text whitespace-nowrap">
            Terms and Conditions &nbsp;&nbsp;| &nbsp;&nbsp;Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;