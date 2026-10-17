import Image from 'next/image';
import { Button, Icon } from './Icon';

const photos = { jackets: '/images/jackets.jpg', rack: '/images/rack.jpg', shirts: '/images/shirts.jpg' };

const heroStats = [
  ["shield", "Marcas originales"],
  ["truck", "Envíos nacionales"],
  ["box", "Pacas desde ₡45.000"],
  ["whatsapp", "Compra por WhatsApp"],
] as const;

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light"><span /> Ropa americana en Costa Rica</p>
          <h1 aria-label="MULTIMAX" className="hero__title">
            {"MULTIMAX".split("").map((letter, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.08}s` }}>{letter}</span>
            ))}
          </h1>
          <p className="hero__subtitle">Ropa de calidad en pacas y por unidades. Compra al por mayor o escoge prenda por prenda.</p>
          <div className="hero__buttons">
            <Button href="#categorias">Ver pacas</Button>
            <Button href="#categorias" variant="outline">Ver unidades</Button>
          </div>
        </div>
        <div className="hero__visual" aria-label="Selección de ropa americana de calidad">
          <div className="visual-orbit visual-orbit--one" />
          <div className="visual-orbit visual-orbit--two" />
          <figure className="fashion-card fashion-card--main">
            <Image alt="Chaquetas seleccionadas en perchero" src={photos.jackets} fill sizes="(max-width: 680px) 68vw, 34vw" />
          </figure>
          <figure className="fashion-card fashion-card--top">
            <Image alt="Ropa premium en tonos neutros" src={photos.rack} fill sizes="(max-width: 680px) 43vw, 20vw" />
          </figure>
          <figure className="fashion-card fashion-card--bottom">
            <Image alt="Camisetas de colores dobladas" src={photos.shirts} fill sizes="(max-width: 680px) 43vw, 20vw" />
          </figure>
          <span className="quality-tag">Selección<br /><strong>premium</strong></span>
        </div>
      </div>
      <div className="hero__stats">
        {heroStats.map(([icon, label]) => (
          <div className="hero-stat" key={label}>
            <span><Icon name={icon} /></span>
            <p>{label}</p>
          </div>
        ))}
      </div>
      <a className="scroll-cue" href="#nosotros"><span /> Descubre más</a>
    </section>
  );
}




