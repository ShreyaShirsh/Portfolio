import { motion } from "framer-motion";
import Hero from "../components/home/Hero.jsx";
import About from "../components/home/About.jsx";
import Work from "../components/home/Work.jsx";
import Skills from "../components/home/Skills.jsx";
import Experience from "../components/home/Experience.jsx";
import Contact from "../components/home/Contact.jsx";
import { pageTransition } from "../lib/motion.js";

export default function Home() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Contact />
    </motion.div>
  );
}
