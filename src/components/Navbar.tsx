'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from './Icon';

const LOGO = '/images/LogoMultimaxFondoTransparente.png';
const navItems: [string, string][] = [["Inicio", "#inicio"], ["Pacas", "#categorias"], ["Unidades", "#categorias"], ["Marcas", "#marcas"], ["Nosotros", "#nosotros"], ["Contacto", "#contacto"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <a aria-label="MULTIMAX, inicio" className="navbar__brand" href="#inicio">
        <Image alt="MULTIMAX Mayorista" src={LOGO} width={112} height={112} />
      </a>
      <nav aria-label="Navegación principal" className={`navlinks ${open ? "is-open" : ""}`}>
        {navItems.map(([label, href]) => (
          <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <div className="navbar__actions">
        <button aria-label="Buscar" className="icon-button"><Icon name="search" /></button>
        <button aria-label="Mi cuenta" className="icon-button desktop-action"><Icon name="user" /></button>
        <button aria-label="Carrito, 2 productos" className="icon-button cart">
          <Icon name="bag" />
          <span>2</span>
        </button>
        <button
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="icon-button menu-button"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>
    </header>
  );
}






