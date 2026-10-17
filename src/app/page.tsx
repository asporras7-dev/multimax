import CarruselMarcas from "@/components/CarruselMarcas";
import Categorias from "@/components/Categorias";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SeccionNegocio from "@/components/SeccionNegocio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SeccionNegocio />
        <Categorias />
        <CarruselMarcas />
      </main>
      <Footer />
    </>
  );
}
