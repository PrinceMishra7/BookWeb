import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => document.body.scrollTo(0,0), 101);
  }, [pathname]);

  return null;
}