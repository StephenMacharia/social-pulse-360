
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AccessibilityProvider } from "@/components/AccessibilityProvider"
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
import AuthPage from "./pages/AuthWrapper"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AccessibilityProvider>
        <Toaster />
        <Sonner />
        <SkipNavigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/crisis" element={<CrisisRoom />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/business" element={<BusinessDevelopment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth" element={<AuthPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AICopilot />
      </AccessibilityProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
