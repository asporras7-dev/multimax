import type { ReactNode } from 'react';

type IconName =
  | "arrow"
  | "bag"
  | "box"
  | "check"
  | "chevron"
  | "menu"
  | "search"
  | "shield"
  | "truck"
  | "user"
  | "whatsapp"
  | "x";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    box: <><path d="m4 7 8 4 8-4M12 11v9" /><path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.5 3 2 4.5 5 5" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

export function Button({
  children,
  href,
  variant = "gold",
}: {
  children: ReactNode;
  href: string;
  variant?: "gold" | "outline" | "blue";
}) {
  return (
    <a className={`button button--${variant}`} href={href}>
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}

const navItems = [
  ["Inicio", "#inicio"],
  ["Pacas", "#categorias"],
  ["Unidades", "#categorias"],
  ["Marcas", "#marcas"],
  ["Nosotros", "#nosotros"],
  ["Contacto", "#contacto"],
];




