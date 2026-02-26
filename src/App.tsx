import { Route, Routes } from "react-router-dom";
import { PATH } from "../src/utils/path"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"



import UserLayout from "./layouts/user/UserLayout"
import Home from "./pages/user/home/Home"
import MovieDetail from "./pages/user/movie-detail/MovieDetail"
import Profile from "./pages/user/profile/Profile"
import Policy from "./pages/user/Policy"
import Theater from "./pages/user/theater/Theater"
import NewsEventDetail from "./pages/user/newsEventDetail/NewsEventDetail"
import NewsEvent from "./pages/user/newsEvent/NewsEvent"
import Showtime from "./pages/user/showtime/Showtime"
import BookTicket from "./pages/user/book-ticket/BookTicket"

import AdminLayout from "../src/layouts/AdminLayout"
import Movie from "./pages/admin/movie/Movie"
import User from "./pages/admin/user/User"
import Dashboard from "./pages/admin/dashboard/Dashboard"
import NewsEventAdmin from "./pages/admin/newsEvent/NewsEvent"
import ShowTime from "./pages/admin/showtime/Showtime"
import TheaterAdmin from "./pages/admin/theater/Theater"

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
        <Route path={PATH.BOOK_TICKET} element={<BookTicket />} />


        {/* User Layout - Public & Private */}
        <Route
          path={PATH.USER_LAYOUT}
          element={<UserLayout />}
        >
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
          <Route path={PATH.NEWS_EVENT_DETAIL} element={<NewsEventDetail />} />
          <Route path={PATH.NEWS_EVENT} element={<NewsEvent />} />
          <Route path={PATH.SHOWTIME} element={<Showtime />} />
        </Route>

        {/* Admin Layout */}
        <Route
          path={PATH.ADMIN_LAYOUT}
          element={
            // <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={PATH.MOVIE} element={<Movie />} />
          <Route path={PATH.USER} element={<User />} />
          <Route path={PATH.NEWS_EVENT_ADMIN} element={<NewsEventAdmin />} />
          <Route path={PATH.SHOWTIME_ADMIN} element={<ShowTime />} />
          <Route path={PATH.THEATER_ADMIN} element={<TheaterAdmin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
