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
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
];
const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
    <AuthProvider>
      <MantineProvider>
        <RouterProvider router={BrowserRouter}></RouterProvider>
      </MantineProvider>
    </AuthProvider>
  );
};

export default App;
