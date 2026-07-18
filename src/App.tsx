import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Blog from "./pages/Blog.tsx";
import BlogGhostOrders from "./pages/BlogGhostOrders.tsx";
import BlogStripeShopify from "./pages/BlogStripeShopify.tsx";
import BlogPayoutDiscrepancy from "./pages/BlogPayoutDiscrepancy.tsx";
import BlogFincileVsA2X from "./pages/BlogFincileVsA2X.tsx";
import BlogFincileVsSynder from "./pages/BlogFincileVsSynder.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/ghost-orders-shopify" element={<BlogGhostOrders />} />
          <Route path="/blog/shopify-stripe-reconciliation" element={<BlogStripeShopify />} />
          <Route path="/blog/shopify-payout-discrepancy" element={<BlogPayoutDiscrepancy />} />
          <Route path="/blog/fincile-vs-a2x" element={<BlogFincileVsA2X />} />
          <Route path="/blog/fincile-vs-synder" element={<BlogFincileVsSynder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
