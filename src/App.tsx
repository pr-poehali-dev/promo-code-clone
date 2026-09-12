
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import BookmakerReview from "./pages/BookmakerReview";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import SupportAdmin from "./pages/SupportAdmin";
import CookieNotice from "./components/CookieNotice";
import SupportChatGate from "./components/SupportChatGate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieNotice />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bk/:slug" element={<BookmakerReview />} />
          <Route path="/reviews/:bookmakerName" element={<Reviews />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support-admin" element={<SupportAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SupportChatGate />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;