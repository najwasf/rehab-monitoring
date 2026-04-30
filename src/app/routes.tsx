import { createBrowserRouter } from "react-router";

import { AuthLayout } from "./components/layouts/AuthLayout";
import { MainLayout } from "./components/layouts/MainLayout";

import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Schedule } from "./pages/Schedule";
import { Monitoring } from "./pages/Monitoring";
import { Feedback } from "./pages/Feedback";
import { Reports } from "./pages/Reports";
import { Notifications } from "./pages/Notifications";

import { DoctorDashboard } from "./pages/DoctorDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  // =====================
  // LANDING PAGE
  // =====================
  {
    path: "/",
    element: <LandingPage />,
  },

  // =====================
  // AUTH
  // =====================
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // =====================
  // PASIEN AREA (PAKE SIDEBAR)
  // =====================
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "schedule", element: <Schedule /> },
      { path: "monitoring", element: <Monitoring /> },
      { path: "feedback", element: <Feedback /> },
      { path: "reports", element: <Reports /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },

  // =====================
  // DOKTER AREA (SEPARATE, TANPA SIDEBAR PASIEN)
  // =====================
  {
    path: "/doctor",
    element: <DoctorDashboard />,
  },

  // =====================
  // NOT FOUND
  // =====================
  {
    path: "*",
    element: <NotFound />,
  },
]);