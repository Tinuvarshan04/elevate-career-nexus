
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import MentorProfile from "./pages/MentorProfile";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Chat from "./pages/Chat";
import MeetingRequests from "./pages/MeetingRequests";
import MenteesPage from "./pages/MenteesPage";
import Sessions from "./pages/Sessions";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/mentor/:mentorId" element={<MentorProfile />} />
          <Route path="/dashboard" element={<Dashboard userType="mentee" />} />
          <Route path="/mentor-dashboard" element={<Dashboard userType="mentor" />} />
          <Route path="/meeting-requests" element={<MeetingRequests />} />
          <Route path="/mentees" element={<MenteesPage />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
