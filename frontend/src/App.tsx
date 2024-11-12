import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import "@/index.css";
import Calculator from "@/pages/calculator";
import Home from "./pages/home";
import { AuthProvider, useAuth } from "./contexts/authContext";
import Login from "./pages/authentication/Signin";
import Register from "./pages/authentication/Signup";
import Privacy from "./pages/legal/Privacy";
import NotFound from "./pages/404/NotFound";
import AboutPage from "./pages/about/About";

const ProtectedRoute = ({ element }: any) => {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? element : <Navigate to="/login" replace />;
};

const paths = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/calculate",
    element: <ProtectedRoute element={<Calculator />} />,
    // element: <Calculator />,
  },

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    // element: <Calculator />,
  },
];
const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
    <AuthProvider>
      <MantineProvider>
        <RouterProvider router={BrowserRouter} />
      </MantineProvider>
    </AuthProvider>
  );
};

export default App;
