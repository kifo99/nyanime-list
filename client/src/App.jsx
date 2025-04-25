import PropTypes from "prop-types";

import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";

export default function App({ children }) {
  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
