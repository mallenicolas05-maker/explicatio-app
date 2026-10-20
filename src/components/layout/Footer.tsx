import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const footerLinks = {
  research: [
    { name: "Latest Studies", href: "/studies" },
    { name: "Sleep", href: "/studies?category=Sleep" },
    { name: "Nutrition", href: "/studies?category=Nutrition" },
    { name: "Mental Health", href: "/studies?category=Mental Health" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Methodology", href: "/about#methodology" },
    { name: "Pricing", href: "/pricing" },
    { name: "Categories", href: "/categories" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  social: [
    { name: "Instagram", href: "https://www.instagram.com/explicatio.co/", icon: Instagram },
    { name: "TikTok", href: "https://tiktok.com/@explicatio", icon: TikTokIcon },
  ],
  contact: {
    email: "info@explicatio.co",
  },
};

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background" style={{ fontFamily: 'var(--font-sans)' }}>
      <div className="container-editorial py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-3xl text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
              Explicatio
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-foreground-muted">
              Scientific research, translated for the curious mind. Evidence-based summaries of the latest studies.
            </p>
          </div>

          {/* Research Links */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-foreground-subtle">
              Research
            </h3>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-foreground-subtle">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-foreground-subtle">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-foreground-subtle">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-foreground-subtle">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-foreground-subtle">
              © 2024 Explicatio. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-foreground-subtle">
              Research summaries for educational purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
