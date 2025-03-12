
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import FitnessFacilities from "./pages/FitnessFacilities";
import YouthPrograms from "./pages/YouthPrograms";
import SpaWellness from "./pages/SpaWellness";
import Membership from "./pages/Membership";
import Classes from "./pages/Classes";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import Timetable from "./pages/Timetable";
import OpeningTimes from "./pages/OpeningTimes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/fitness-facilities" element={<FitnessFacilities />} />
              <Route path="/services/youth-programs" element={<YouthPrograms />} />
              <Route path="/services/spa-wellness" element={<SpaWellness />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/opening-times" element={<OpeningTimes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
