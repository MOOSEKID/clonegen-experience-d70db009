
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import { PageLoading, AdminRedirect } from "./RouteComponents";

// Lazy loaded components for main routes
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Services = lazy(() => import("../pages/Services"));
const Blogs = lazy(() => import("../pages/Blogs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const FitnessFacilities = lazy(() => import("../pages/FitnessFacilities"));
const YouthPrograms = lazy(() => import("../pages/YouthPrograms"));
const SpaWellness = lazy(() => import("../pages/SpaWellness"));
const Membership = lazy(() => import("../pages/Membership"));
const Classes = lazy(() => import("../pages/Classes"));
const Timetable = lazy(() => import("../pages/Timetable"));
const OpeningTimes = lazy(() => import("../pages/OpeningTimes"));
const ShopPage = lazy(() => import("../pages/Shop"));
const CategoryPage = lazy(() => import("../pages/shop/CategoryPage"));
const ProductPage = lazy(() => import("../pages/shop/ProductPage"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));

const MainRoutes = () => {
  return (
    <>
      <Route index element={<AdminRedirect />} />
      <Route path="/about-us" element={
        <Suspense fallback={<PageLoading />}>
          <AboutUs />
        </Suspense>
      } />
      <Route path="/services" element={
        <Suspense fallback={<PageLoading />}>
          <Services />
        </Suspense>
      } />
      <Route path="/services/fitness-facilities" element={
        <Suspense fallback={<PageLoading />}>
          <FitnessFacilities />
        </Suspense>
      } />
      <Route path="/services/youth-programs" element={
        <Suspense fallback={<PageLoading />}>
          <YouthPrograms />
        </Suspense>
      } />
      <Route path="/services/spa-wellness" element={
        <Suspense fallback={<PageLoading />}>
          <SpaWellness />
        </Suspense>
      } />
      <Route path="/membership" element={
        <Suspense fallback={<PageLoading />}>
          <Membership />
        </Suspense>
      } />
      <Route path="/classes" element={
        <Suspense fallback={<PageLoading />}>
          <Classes />
        </Suspense>
      } />
      <Route path="/blogs" element={
        <Suspense fallback={<PageLoading />}>
          <Blogs />
        </Suspense>
      } />
      <Route path="/shop" element={
        <Suspense fallback={<PageLoading />}>
          <ShopPage />
        </Suspense>
      } />
      <Route path="/shop/category/:categoryId" element={
        <Suspense fallback={<PageLoading />}>
          <CategoryPage />
        </Suspense>
      } />
      <Route path="/shop/product/:productId" element={
        <Suspense fallback={<PageLoading />}>
          <ProductPage />
        </Suspense>
      } />
      <Route path="/login" element={
        <Suspense fallback={<PageLoading />}>
          <Login />
        </Suspense>
      } />
      <Route path="/signup" element={
        <Suspense fallback={<PageLoading />}>
          <Signup />
        </Suspense>
      } />
      <Route path="/contact-us" element={
        <Suspense fallback={<PageLoading />}>
          <ContactUs />
        </Suspense>
      } />
      <Route path="/timetable" element={
        <Suspense fallback={<PageLoading />}>
          <Timetable />
        </Suspense>
      } />
      <Route path="/opening-times" element={
        <Suspense fallback={<PageLoading />}>
          <OpeningTimes />
        </Suspense>
      } />
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default MainRoutes;
