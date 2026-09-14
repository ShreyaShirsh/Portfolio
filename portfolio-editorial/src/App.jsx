import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import CustomCursor from "./components/cursor/CustomCursor.jsx";
import Grain from "./components/texture/Grain.jsx";
import DynamicBackground from "./components/texture/DynamicBackground.jsx";
import Loader from "./components/ui/Loader.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Reset scroll the instant the route changes — before the outgoing page
  // finishes its exit animation — so there's never a moment where the
  // viewport is still scrolled deep into a page that's about to unmount.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <DynamicBackground />
      <Grain />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </main>
    </div>
  );
}
