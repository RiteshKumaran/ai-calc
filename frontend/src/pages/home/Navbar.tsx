import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Moon, Sun } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/firebase/auth";
interface Props {
  onThemeChange?: (theme: "light" | "dark") => void;
}
const Navbar = ({ onThemeChange }: Props) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    onThemeChange?.(newTheme);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black   border-b-[0.1px] border-black dark:border-gray-500">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-2"
        >
          <Calculator className="h-8 w-8 text-black dark:text-white" />
          <span className="text-2xl cursor-pointer font-bold bg-gradient-to-r from-red-700 to-purple-400 text-transparent bg-clip-text">
            AI Calc
          </span>
        </div>
        <nav className="hidden text-black dark:text-white z-50 md:flex space-x-8">
          {location.pathname === "/" && (
            <>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                to={"/about"}
              >
                About
              </Link>
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </a>

              <a
                href="#pricing"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                FAQ
              </a>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
              toggleTheme();
            }}
          >
            {theme === "light" ? (
              <Moon className="h-5 text-black w-5" />
            ) : (
              <Sun className="h-5 text-white w-5" />
            )}
          </Button>
          {/* <Button
        onClick={handleGetStarted}
        size="sm"
        className="hidden md:inline-flex"
      >
        Sign Up
      </Button> */}
          {userLoggedIn ? (
            <>
              <Button
                onClick={() => {
                  doSignOut();
                }}
                className="hidden md:inline-block "
              >
                Logout
              </Button>
              <Button
                className="hidden md:inline-block "
                onClick={() => {
                  navigate("/calculate");
                }}
              >
                Calculate
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button className="hidden md:inline-block">Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button className="hidden md:inline-block">
                  Register New Account
                </Button>
              </Link>
            </>
          )}

          <button
            className="md:hidden text-black dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-white text-black dark:text-white dark:bg-black border-b-[0.1px] border-black dark:border-gray-500"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {location.pathname === "/" && (
                <>
                  <Link
                    to={"/about"}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    to={"#features"}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Features
                  </Link>

                  <a
                    href="#pricing"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                  <a
                    href="#faq"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    FAQ
                  </a>
                </>
              )}

              {userLoggedIn ? (
                <>
                  <Button
                    onClick={() => {
                      doSignOut();
                    }}
                  >
                    Logout
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/calculate");
                    }}
                  >
                    Calculate
                  </Button>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    <Button>Login</Button>
                  </Link>
                  <Link to={"/register"}>
                    <Button className="">Register New Account</Button>
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
