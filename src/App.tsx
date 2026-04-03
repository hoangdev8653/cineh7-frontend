import { Route, Routes } from "react-router-dom";
import { PATH } from "../src/utils/path";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import UserLayout from "./layouts/user/UserLayout";
import Home from "./pages/user/home/Home";
import MovieDetail from "./pages/user/movie-detail/MovieDetail";
import Profile from "./pages/user/profile/Profile";
import Policy from "./pages/user/Policy";
import Theater from "./pages/user/theater/Theater";
import EventDetail from "./pages/user/eventDetail/EventDetail";
import Event from "./pages/user/event/Event";
import Showtime from "./pages/user/showtime/Showtime";
import Room from "./pages/user/room/Room";
import Payment from "./pages/user/payment/Payment";
import PaymentResult from "./pages/user/payment/PaymentResult";

import AdminLayout from "./layouts/admin/Layout";
import Movie from "./pages/admin/movie/Movie";
import User from "./pages/admin/user/User";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import EventAdmin from "./pages/admin/event/Event";
import ShowTime from "./pages/admin/showtime/Showtime";
import TheaterAdmin from "./pages/admin/theater/Theater";

import NotFound from "./pages/NotFound";
import ProtectedRoute from "../src/utils/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={PATH.SHOWTIME_DETAIL} element={<Room />} />

        <Route path={PATH.USER_LAYOUT} element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path={PATH.MOVIE_DETAIL} element={<MovieDetail />} />
          <Route
            path={PATH.PROFILE}
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path={PATH.POLICY} element={<Policy />} />
          <Route path={PATH.THEATER} element={<Theater />} />
          <Route path={PATH.EVENT_DETAIL} element={<EventDetail />} />
          <Route path={PATH.EVENT} element={<Event />} />
          <Route path={PATH.SHOWTIME} element={<Showtime />} />
          <Route path={PATH.PAYMENT} element={<Payment />} />
          <Route path={PATH.PAYMENT_SUCCESS} element={<PaymentResult />} />
        </Route>

        <Route
          path={PATH.ADMIN_LAYOUT}
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={PATH.MOVIE} element={<Movie />} />
          <Route path={PATH.USER} element={<User />} />
          <Route path={PATH.EVENT_ADMIN} element={<EventAdmin />} />
          <Route path={PATH.SHOWTIME_ADMIN} element={<ShowTime />} />
          <Route path={PATH.THEATER_ADMIN} element={<TheaterAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
