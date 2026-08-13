import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ProjectsGallery from "@/components/ProjectsGallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectsGallery />
        <WhyChooseUs />
        <Testimonials />
        <QuoteForm />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}
