import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Sermons = lazy(() => import("../pages/Sermons"));
const Events = lazy(() => import("../pages/Events"));
const EventDetail = lazy(() => import("../pages/EventDetails"));
const Ministries = lazy(() => import("../pages/Ministries"));
const Giving = lazy(() => import("../pages/Giving"));
const Contact = lazy(() => import("../pages/Contact"));
const Live = lazy(() => import("../pages/Live"));
const PrayerRequests = lazy(() => import("../pages/PrayerRequests"));
const Blog = lazy(() => import("../pages/Blog"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound   = lazy(() => import("../pages/NotFound"));; // Import 404 page

const AppRoutes = () => {
  // const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <AuthProvider>
      <Router>
        {/* add this here
        {!loadingComplete ? (
          <Loading onComplete={() => setLoadingComplete(true)} />
        ) : */}
        {/* (  */}
        <Suspense fallback={<Loading />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/giving" element={<Giving />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/live" element={<Live />} />
            <Route path="/prayer-requests" element={<PrayerRequests />} />
            <Route path="/blog" element={<Blog />} />


            {/* Protected Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

  {/* 404 Page (Must be the last route) */}
  <Route path="*" element={<NotFound />} />
            
          </Routes>
        </Suspense>
        {/* )  */}
        {/* add a } here */}
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
