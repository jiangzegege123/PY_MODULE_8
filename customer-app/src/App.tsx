import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

// Auth Pages
import Welcome from '@pages/auth/Welcome'
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'

// Main Pages
import Home from '@pages/Home'
import Appointments from '@pages/Appointments'
import AppointmentDetail from '@pages/AppointmentDetail'
import Clinic from '@pages/Clinic'
import Profile from '@pages/Profile'
import Messages from '@pages/Messages'
import MessageDetail from '@pages/MessageDetail'

// Booking Flow
import SelectService from '@pages/booking/SelectService'
import SelectDoctor from '@pages/booking/SelectDoctor'
import SelectTime from '@pages/booking/SelectTime'
import ConfirmBooking from '@pages/booking/ConfirmBooking'
import BookingSuccess from '@pages/booking/BookingSuccess'

// Other Pages
import DoctorProfile from '@pages/DoctorProfile'
import Invoices from '@pages/Invoices'
import EditProfile from '@pages/settings/EditProfile'
import NotificationSettings from '@pages/settings/NotificationSettings'

// Layout
import MainLayout from '@components/layout/MainLayout'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/welcome" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={<PublicRoute><Welcome /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected Routes with Tab Layout */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Protected Routes without Tab Layout */}
        <Route path="/appointment/:id" element={<PrivateRoute><AppointmentDetail /></PrivateRoute>} />
        <Route path="/messages/:id" element={<PrivateRoute><MessageDetail /></PrivateRoute>} />
        <Route path="/doctor/:id" element={<PrivateRoute><DoctorProfile /></PrivateRoute>} />
        <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />

        {/* Booking Flow */}
        <Route path="/booking/service" element={<PrivateRoute><SelectService /></PrivateRoute>} />
        <Route path="/booking/doctor" element={<PrivateRoute><SelectDoctor /></PrivateRoute>} />
        <Route path="/booking/time" element={<PrivateRoute><SelectTime /></PrivateRoute>} />
        <Route path="/booking/confirm" element={<PrivateRoute><ConfirmBooking /></PrivateRoute>} />
        <Route path="/booking/success" element={<PrivateRoute><BookingSuccess /></PrivateRoute>} />

        {/* Settings */}
        <Route path="/settings/profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/settings/notifications" element={<PrivateRoute><NotificationSettings /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
