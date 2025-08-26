import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import GameScreen from "./pages/GameScreen.jsx";
import MyPortfolio from "./pages/MyPortfolio.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import MainLayout from "./layouts/main-layout.jsx";

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <RouteWrapper>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route element={<MainLayout />}>
          <Route path="/portfolio" element={<MyPortfolio />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<GameScreen />} />
      </Routes>
    </RouteWrapper>
  );
}
