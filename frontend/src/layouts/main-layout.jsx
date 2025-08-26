import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav.jsx";

/**
 * Layout for portfolio/contact routes (not the start screen).
 * Adds the grain & vignette overlays and the top nav.
 * NOTE: Outlet is now INSIDE <main> so content sits right under the nav.
 */
export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen grain-overlay vignette bg-black">
      <Nav key={location.pathname} />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
