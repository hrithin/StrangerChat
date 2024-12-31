import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </div>
  );
}
