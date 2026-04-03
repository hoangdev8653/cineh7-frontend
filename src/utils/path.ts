export const PATH = {
  // PATH AUTH
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",

  // PATH USER
  USER_LAYOUT: "/",
  POLICY: "/policy",
  THEATER: "/theater",
  EVENT: "/event",
  EVENT_DETAIL: "/event/:id",
  MOVIE_DETAIL: "/movie/:id",
  PROFILE: "/profile",
  SHOWTIME: "/showtime",
  ROOM: "/room/:id",
  SHOWTIME_DETAIL: "/lich-chieu/:id",
  PAYMENT: "/payment",
  PAYMENT_SUCCESS: "/payment-success",

  // PATH ADMIN
  ADMIN_LAYOUT: "/dashboard",
  MOVIE: "/dashboard/movie",
  USER: "/dashboard/user",
  EVENT_ADMIN: "/dashboard/event",
  SHOWTIME_ADMIN: "/dashboard/showtime",
  ROOM_ADMIN: "/dashboard/room",
  THEATER_ADMIN: "/dashboard/theater",

  // PATH NOT FOUND
  NOT_FOUND: "/not-found",
};
