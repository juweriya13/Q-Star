// main.tsx or main.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import EventScreen from "./screens/EventScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import SingleEventScreen from "./screens/SingleEventScreen";
import UpdateEventScreen from "./screens/UpdateEventScreen";
import Error from "./screens/Error";
import ProfileSettingScreen from "./screens/ProfileSettingScreen";
import RegistrationsScreen from "./screens/RegistrationsScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/*",
    element: <Error />,
  },
  {
    path: "/auth",
    element: <AuthScreen />,
  },
  {
    path: "/events",
    element: <EventScreen />,
  },
  {
    path: "/events/*",
    element: <Error />,
  },
  {
    path: "/create",
    element: <CreateEventScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
  {
    path: "/settings",
    element: <ProfileSettingScreen />,
  },
  {
    path: "/event/:eventId",
    element: <SingleEventScreen />,
  },
  {
    path: "/event/registrations/:eventId",
    element: <RegistrationsScreen />,
  },
  {
    path: "/event/update/:eventId",
    element: <UpdateEventScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider>
          <main className="dark text-foreground bg-background min-h-screen">
            <RouterProvider router={router} />
            <Toaster />
          </main>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
