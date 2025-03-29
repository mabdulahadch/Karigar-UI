
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import HomePage from "./pages/HomePage";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderProfile from "./pages/ProviderProfile";
import ServiceDetail from "./pages/ServiceDetail";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// Customer Dashboard Pages
import CustomerBookings from "./pages/customer/CustomerBookings";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerNotifications from "./pages/customer/CustomerNotifications";
import CustomerPaymentMethods from "./pages/customer/CustomerPaymentMethods";
import CustomerServiceHistory from "./pages/customer/CustomerServiceHistory";
import CustomerSettings from "./pages/customer/CustomerSettings";
import CustomerHelp from "./pages/customer/CustomerHelp";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole, redirectPath = "/auth" }) => {
  const storedUser = localStorage.getItem('auth_user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    // Redirect to their dashboard if logged in but wrong role
    return <Navigate to={user.role === 'provider' ? '/provider/dashboard' : '/customer/dashboard'} replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Customer Routes */}
              <Route path="/customer/dashboard" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/customer/bookings" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerBookings />
                </ProtectedRoute>
              } />
              <Route path="/customer/profile" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerProfile />
                </ProtectedRoute>
              } />
              <Route path="/customer/notifications" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerNotifications />
                </ProtectedRoute>
              } />
              <Route path="/customer/payment-methods" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerPaymentMethods />
                </ProtectedRoute>
              } />
              <Route path="/customer/service-history" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerServiceHistory />
                </ProtectedRoute>
              } />
              <Route path="/customer/settings" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerSettings />
                </ProtectedRoute>
              } />
              <Route path="/customer/help" element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerHelp />
                </ProtectedRoute>
              } />
              
              {/* Provider Routes */}
              <Route path="/provider/dashboard" element={
                <ProtectedRoute allowedRole="provider">
                  <ProviderProfile />
                </ProtectedRoute>
              } />
              <Route path="/provider/profile" element={
                <ProtectedRoute allowedRole="provider">
                  <ProviderProfile />
                </ProtectedRoute>
              } />
              <Route path="/provider/settings" element={
                <ProtectedRoute allowedRole="provider">
                  <ProviderProfile />
                </ProtectedRoute>
              } />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
