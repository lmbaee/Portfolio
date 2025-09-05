import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import SceneBackground from "../components/SceneBackground.jsx";

/**
 * Layout for portfolio/contact routes (not the start screen).
 */
export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen grain-overlay vignette">
      <SceneBackground />
      <Nav key={location.pathname} />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
