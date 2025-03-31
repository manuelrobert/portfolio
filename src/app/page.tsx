import Header from '../components/Header';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import './animations.css';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Experience />
      <Skills />
      <Education />
      <Projects />
      <Footer />
      <ScrollToTop />
      <Analytics />
    </main>
  );
}
