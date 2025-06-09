
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AccessibilityProvider } from "@/components/AccessibilityProvider"
import { AuthProvider } from "@/hooks/useAuth"
import { AuthGuard } from "@/components/AuthGuard"
import { SkipNavigation } from "@/components/SkipNavigation"
import Index from "./pages/Index"
import CrisisRoom from "./pages/CrisisRoom"
import NotFound from "./pages/NotFound"
import Analytics from "./pages/Analytics"
import Automation from "./pages/Automation"
import BusinessDevelopment from "./pages/BusinessDevelopment"
import Settings from "./pages/Settings"
import Help from "./pages/Help"
import { AICopilot } from "./components/AICopilot"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import AuthWrapper from "./pages/AuthWrapper"
import AuthPage from "./pages/AuthPage"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AccessibilityProvider>
          <Toaster />
          <Sonner />
          <SkipNavigation />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={
                <AuthGuard>
                  <Index />
                </AuthGuard>
              } />
              <Route path="/crisis" element={
                <AuthGuard>
                  <CrisisRoom />
                </AuthGuard>
              } />
              <Route path="/analytics" element={
                <AuthGuard>
                  <Analytics />
                </AuthGuard>
              } />
              <Route path="/automation" element={
                <AuthGuard>
                  <Automation />
                </AuthGuard>
              } />
              <Route path="/business" element={
                <AuthGuard>
                  <BusinessDevelopment />
                </AuthGuard>
              } />
              <Route path="/settings" element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } />
              <Route path="/help" element={
                <AuthGuard>
                  <Help />
                </AuthGuard>
              } />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <AICopilot />
        </AccessibilityProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
