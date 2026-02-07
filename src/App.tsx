
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import BetboomReview from "./pages/BetboomReview";
import LeonReview from "./pages/LeonReview";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import CookieNotice from "./components/CookieNotice";

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
          <Route path="/betboom" element={<BetboomReview />} />
          <Route path="/leon" element={<LeonReview />} />
          <Route path="/reviews/:bookmakerName" element={<Reviews />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;