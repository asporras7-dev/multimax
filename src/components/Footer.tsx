import Image from 'next/image';
import { Icon } from './Icon';
const LOGO = '/images/multimax-logo.png';

export default function Footer() {
  return (
    <footer id="contacto">
      <div className="footer__top">
        <div>
          <p className="eyebrow eyebrow--light"><span /> Hablemos</p>
          <h2>Tu próxima gran compra<br />empieza <em>aquí.</em></h2>
        </div>
        <a className="whatsapp-cta" href="https://wa.me/50600000000">
          <span><Icon name="whatsapp" size={25} /></span>
          <span><small>Escríbenos por</small>WhatsApp</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="footer__main">
        <div className="footer__brand">
          <Image alt="MULTIMAX Mayorista" src={LOGO} width={112} height={112} />
          <p>Ropa americana de calidad para toda Costa Rica. Al por mayor y por unidad.</p>
          <div className="socials"><a href="#contacto">ig</a><a href="#contacto">f</a><a href="#contacto">tk</a></div>
        </div>
        <div>
          <h3>Explora</h3>
          <a href="#categorias">Pacas</a><a href="#categorias">Unidades</a><a href="#marcas">Marcas</a>
        </div>
        <div>
          <h3>Empresa</h3>
          <a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a><a href="#contacto">Preguntas frecuentes</a>
        </div>
        <div>
          <h3>Visítanos</h3>
          <p>San José, Costa Rica<br />Lun–Sáb · 9:00–18:00<br />+506 0000-0000</p>
        </div>
      </div>
      <div className="footer__bottom"><span>© 2025 MULTIMAX. Todos los derechos reservados.</span><span>Estilo · Calidad · Variedad</span></div>
    </footer>
  );
}




