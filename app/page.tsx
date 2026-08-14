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

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      include: { materials: true }
    });
  } catch (error) {
    console.error("Database connection failed, falling back to static default services:", error);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services dbServices={dbServices} />
        <ProjectsGallery />
        <WhyChooseUs />
        <Testimonials />
        <QuoteForm serviceNames={dbServices.map(s => s.name)} />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}
