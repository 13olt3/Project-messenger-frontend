import App from "../App";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Error from "../pages/error/error";

import ProtectedRoute from "./protectedRoutes";
import Messages from "../pages/messages/messages";
import Allusers from "../pages/user/allusers";
import User from "../pages/user/user";
import Conversation from "../pages/conversation/conversation";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/messages", element: <Messages /> },
          { path: "/allusers", element: <Allusers /> },
          { path: "/user/:username", element: <User /> },
          { path: "conversation/:username", element: <Conversation /> },
          // { path: "send-message", element: <SendMessage /> },
        ],
      },
    ],
  },
];

export default routes;
