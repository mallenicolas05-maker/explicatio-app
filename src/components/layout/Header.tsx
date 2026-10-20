import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import explicatioLogo from "@/assets/explicatio-logo.png";

const labNavEnabled = import.meta.env.DEV || Boolean(import.meta.env.VITE_LAB_ORIGIN);

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Browse", href: "/browse" },
  { name: "Dashboard", href: "/dashboard" },
  ...(labNavEnabled ? [{ name: "Lab", href: "/test" }] : []),
  { name: "Studies", href: "/studies" },
  { name: "Categories", href: "/categories" },
  { name: "Methodology", href: "/about" },
  { name: "Pricing", href: "/pricing" },
];

interface HeaderProps {
  onUserIconClick?: () => void;
  variant?: "default" | "study";
}

export function Header({ onUserIconClick, variant = "default" }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleUserIconClick = () => {
    if (onUserIconClick && location.pathname === '/dashboard') {
      onUserIconClick();
    } else {
      navigate('/dashboard');
    }
  };

  const isBrowse = location.pathname === "/browse";
  const isStudyHeader = variant === "study";
  const usesBrowseLayout = isBrowse || isStudyHeader;
  const isHome = location.pathname === "/home";

  useEffect(() => {
    if (usesBrowseLayout) return;
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.82 : 36;
      setIsScrolled(window.scrollY >= threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, usesBrowseLayout]);

  const activeNavigation = usesBrowseLayout
    ? navigation.filter((item) => ["Browse", "Studies", "Categories", "Methodology", "Pricing"].includes(item.name))
    : navigation;

  // Nav item group: individual box-shadows when hero is visible (home top), single box-shadow on container otherwise
  const showIndividualShadows = !usesBrowseLayout && !isScrolled;

  const navGroupStyle: React.CSSProperties = {
    boxShadow: showIndividualShadows
      ? "6px 6px 0 0 transparent"
      : "0 6px 0 0 #28292a, 6px 6px 0 0 #28292a",
    transition: "box-shadow 0.32s ease, border-color 0.32s ease",
  };

  const itemWrapperShadow: React.CSSProperties = showIndividualShadows
    ? { boxShadow: "6px 6px 0 0 #28292a" }
    : {};

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pointer-events-none transition-[padding,colors] duration-300",
        usesBrowseLayout ? "" : showIndividualShadows ? "pt-4" : "pt-0",
      )}
    >
      <nav className={cn("pointer-events-auto", usesBrowseLayout ? "container-editorial max-w-none px-8 lg:px-14" : "px-4 lg:px-10")}>
        <div className={cn("flex items-stretch", usesBrowseLayout ? "h-16 lg:h-20 items-center justify-between" : "relative gap-3")}>
          {/* Logo */}
          {usesBrowseLayout ? (
            <Link to="/home" className="hover:opacity-80 transition-opacity flex items-center">
              <img src={explicatioLogo} alt="EXPLICATIO" className={cn("h-5", isBrowse && "brightness-0 invert")} />
            </Link>
          ) : (
            <Link
              to="/home"
              className="inline-flex min-h-[3.1rem] shrink-0 items-center justify-center border border-[#28292a] bg-[#f7f4ef] px-4 shadow-[4px_4px_0_#28292a] transition-colors hover:bg-[#f0ede8] lg:min-h-[3.4rem] lg:px-5 lg:shadow-[6px_6px_0_#28292a]"
            >
              <img src={explicatioLogo} alt="EXPLICATIO" className="h-4" />
            </Link>
          )}

          {/* Desktop Navigation */}
          {usesBrowseLayout ? (
            <div className="hidden flex-1 items-center justify-center gap-14 lg:flex">
              {activeNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-[11px] uppercase tracking-[0.22em] transition-colors",
                    isBrowse ? "text-white" : "text-[#28292a]",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "absolute inset-y-0 left-1/2 -translate-x-1/2 hidden items-stretch lg:flex",
                showIndividualShadows
                  ? "gap-2"
                  : "gap-0 border-2 border-[#28292a] divide-x divide-[#28292a]"
              )}
              style={navGroupStyle}
            >
              {activeNavigation.map((item) => (
                <div
                  key={item.name}
                  className="group relative inline-flex items-stretch"
                  style={itemWrapperShadow}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "brutalist-btn relative inline-flex items-center justify-center px-5 bg-[#f7f4ef] text-[#28292a] font-mono text-[0.78rem] uppercase tracking-[-0.03em] whitespace-nowrap hover:bg-[#f0ede8] min-h-[3.4rem]",
                      showIndividualShadows ? "border border-[#28292a] group-hover:translate-x-[5px] group-hover:translate-y-[5px]" : "border-0"
                    )}
                  >
                    {item.name === "Lab" && (
                      <span className="absolute top-0 left-0 px-1.5 py-0.5 text-[0.6rem] font-mono uppercase tracking-wide bg-[#ef5f7d] text-white border-b border-r border-[#28292a] leading-none">
                        Beta
                      </span>
                    )}
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Desktop Action Icons */}
          {usesBrowseLayout ? (
            <div className="hidden md:flex items-center">
              <button
                type="button"
                className={cn(
                  "h-10 w-10 inline-flex items-center justify-center rounded-lg border border-transparent transition-colors",
                  isBrowse
                    ? "text-white hover:border-white/10 hover:bg-white/5"
                    : "text-[#28292a] hover:border-[#28292a]/10 hover:bg-[#28292a]/5",
                )}
                onClick={handleUserIconClick}
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center ml-auto">
              <div
                className="group relative inline-flex"
                style={{ boxShadow: "6px 6px 0 0 #28292a" }}
              >
                <button
                  type="button"
                  className="brutalist-btn h-[3.4rem] w-[3.4rem] inline-flex items-center justify-center border border-[#28292a] bg-[#f7f4ef] text-[#28292a] hover:bg-[#f0ede8] group-hover:translate-x-[5px] group-hover:translate-y-[5px]"
                  onClick={handleUserIconClick}
                >
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={cn(
              "lg:hidden p-2 transition-colors pointer-events-auto ml-auto",
              usesBrowseLayout ? (isBrowse ? "text-white" : "text-[#28292a]") : "border border-[#28292a] bg-[#f7f4ef] text-[#28292a] shadow-[4px_4px_0_#28292a]",
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={cn(
            "animate-fade-in-down py-4 lg:hidden pointer-events-auto",
            usesBrowseLayout
              ? isBrowse
                ? "border-t border-white/10 bg-black/45 backdrop-blur-xl"
                : "border-t border-[#28292a]/10 bg-white/95 backdrop-blur-xl"
              : "border border-[#28292a] border-t-0 bg-[rgba(247,244,239,0.97)] mt-0",
          )}>
            <div className="flex flex-col gap-0">
              {activeNavigation.map((item) => (
              <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "py-3 px-5 text-[11px] font-mono uppercase tracking-[-0.03em] transition-colors border-b border-[#28292a]/20",
                    isBrowse
                      ? "text-white"
                      : "text-[#28292a] hover:bg-[#f0ede8]",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
