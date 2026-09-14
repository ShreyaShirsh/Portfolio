import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/motion.js";

export default function NotFound() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">404</p>
      <h1 className="text-clamp-h1 font-extrabold tracking-tightest">PAGE NOT FOUND</h1>
      <Link to="/" className="link-underline mt-8 font-mono text-sm uppercase tracking-widest">
        Back to home
      </Link>
    </motion.div>
  );
}
