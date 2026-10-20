import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Home, BookOpen, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { label: "Home", href: "/home", icon: Home },
    { label: "Studies", href: "/studies", icon: BookOpen },
    { label: "Pricing", href: "/pricing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 pt-16 md:pt-24"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-6">
              Error Code
            </span>
            <h1 className="font-mono text-[100px] md:text-[160px] leading-none font-bold text-gray-900 tracking-tighter">
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-mono text-sm uppercase tracking-tight font-bold text-gray-900 mb-3">
              Page Not Found
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
              The research paper you're looking for doesn't exist in our database, 
              or the URL may have been mistyped.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-6">
              Quick Navigation
            </span>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-5 py-3 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-600 group-hover:text-gray-900 transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Return Home CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Link
              to="/home"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
            >
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
