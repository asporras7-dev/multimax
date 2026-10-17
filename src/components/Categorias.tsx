'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from './Icon';
const photos = { shirts: '/images/shirts.jpg', rack: '/images/rack.jpg', boutique: '/images/boutique.jpg', jackets: '/images/jackets.jpg', fashion: '/images/fashion.jpg', stacks: '/images/stacks.jpg' };

const categories = [
  { name: "Camisetas", type: "pacas", image: photos.shirts, position: "center" },
  { name: "Camisas", type: "pacas", image: photos.rack, position: "center" },
  { name: "Jeans", type: "pacas", image: photos.boutique, position: "center" },
  { name: "Chaquetas", type: "pacas", image: photos.jackets, position: "center" },
  { name: "Deportiva", type: "pacas", image: photos.fashion, position: "center" },
  { name: "Vestidos", type: "pacas", image: photos.boutique, position: "70%" },
  { name: "Niños", type: "unidades", image: photos.shirts, position: "left" },
  { name: "Bebé", type: "unidades", image: photos.rack, position: "right" },
  { name: "Zapatos", type: "unidades", image: photos.fashion, position: "left" },
  { name: "Accesorios", type: "unidades", image: photos.stacks, position: "center" },
  { name: "Dama", type: "unidades", image: photos.jackets, position: "right" },
  { name: "Caballero", type: "unidades", image: photos.boutique, position: "left" },
];

function CategoryCard({ item, index }: { item: typeof categories[number]; index: number }) {
  return (
    <a className={`category-card ${index === 0 ? "category-card--large" : ""}`} href="#contacto">
      <Image alt={`Colección de ${item.name.toLowerCase()}`} src={item.image} fill sizes="(max-width: 680px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: item.position }} />
      <span className="category-card__shade" />
      <span className="category-card__meta">Explorar colección</span>
      <strong>{item.name}</strong>
      <span className="category-card__arrow"><Icon name="arrow" /></span>
    </a>
  );
}

export default function Categorias() {
  const [tab, setTab] = useState<"pacas" | "unidades">("pacas");
  const visible = categories.filter((item) => item.type === tab);
  return (
    <section className="section categories" id="categorias">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span /> Encuentra tu estilo</p>
          <h2>Compra a <em>tu manera</em></h2>
        </div>
        <p>Calidad que se nota, variedad que inspira. Elige el formato ideal para ti o para tu negocio.</p>
      </div>
      <div className="tabs" role="tablist" aria-label="Tipo de compra">
        <button aria-selected={tab === "pacas"} className={tab === "pacas" ? "active" : ""} onClick={() => setTab("pacas")} role="tab">Pacas al por mayor</button>
        <button aria-selected={tab === "unidades"} className={tab === "unidades" ? "active" : ""} onClick={() => setTab("unidades")} role="tab">Prendas por unidad</button>
      </div>
      <div className="category-grid">
        {visible.map((item, index) => <CategoryCard index={index} item={item} key={item.name} />)}
      </div>
    </section>
  );
}





