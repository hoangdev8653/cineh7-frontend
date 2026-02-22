import { Route, Routes } from "react-router-dom";
import { PATH } from "../src/utils/path"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"

import UserLayout from "../src/layouts/UserLayout"
import Home from "./pages/user/home/Home"

import AdminLayout from "../src/layouts/AdminLayout"
import Movie from "./pages/admin/movie/Movie"
import User from "./pages/admin/user/User"
import Dashboard from "./pages/admin/dashboard/Dashboard"

import NotFound from "./pages/NotFound"
import ProtectedRoute from "../src/utils/ProtectedRoute"

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />

        {/* User Layout */}
        <Route
          path={PATH.USER_LAYOUT}
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>

        {/* Admin Layout */}
        <Route
          path={PATH.ADMIN_LAYOUT}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={PATH.MOVIE} element={<Movie />} />
          <Route path={PATH.USER} element={<User />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
