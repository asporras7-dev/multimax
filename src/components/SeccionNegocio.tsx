'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
const photos = { stacks: '/images/stacks.jpg' };

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start: number | null = null;
      const animate = (time: number) => {
        if (!start) start = time;
        const progress = Math.min((time - start) / 1100, 1);
        setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{value.toLocaleString("es-CR")}{suffix}</span>;
}

export default function SeccionNegocio() {
  return (
    <section className="section story" id="nosotros">
      <div className="section-grid story__grid">
        <div className="story__visual">
          <div className="story__frame">
            <Image alt="Selección de prendas lista para descubrir" src={photos.stacks} fill sizes="(max-width: 680px) 90vw, 40vw" />
          </div>
          <div className="rotating-seal">
            <svg viewBox="0 0 120 120">
              <defs><path d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" id="sealPath" /></defs>
              <text><textPath href="#sealPath">CALIDAD SELECCIONADA • MULTIMAX • </textPath></text>
            </svg>
            <Icon name="check" size={28} />
          </div>
          <p className="story__caption">Curaduría pieza por pieza</p>
        </div>
        <div className="story__content">
          <p className="eyebrow"><span /> Nuestra esencia</p>
          <h2>Cada paca es una<br />caja de <em>tesoros</em></h2>
          <p className="story__lead">En MULTIMAX seleccionamos ropa americana de excelente calidad para emprendedores, tiendas y familias de toda Costa Rica.</p>
          <p>Ya sea que buscas abastecer tu negocio con pacas al por mayor o encontrar esa prenda única por unidad, te ofrecemos variedad real, marcas reconocidas y atención cercana.</p>
          <div className="counters">
            <div><strong><Counter end={12} suffix="K+" /></strong><span>Prendas vendidas</span></div>
            <div><strong><Counter end={98} suffix="%" /></strong><span>Clientes felices</span></div>
            <div><strong><Counter end={7} /></strong><span>Provincias</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}





