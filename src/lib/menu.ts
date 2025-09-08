import type { MenuItem } from "../types/menu"

export const menu: MenuItem[] = [
  {
    id: "bidimensional",
    label: "BIDIMENSIONAL",
    href: "/bidimensional",
    visible: true, // Este elemento será visible
    subitems: [
      { label: "98-01", slug: "98-01", visible: true },
      { label: "Escaleras", slug: "escaleras", visible: true },
      { label: "Pi", slug: "pi", visible: false },
      { label: "Mixta sobre escaleras", slug: "mixta-sobre-escaleras", visible: true },
      { label: "Composición", slug: "composicion", visible: true },
      { label: "Buenos consejos, pequeños progresos, nuevas luces", slug: "consejos", visible: true },
      { label: "Usos múltiples", slug: "usos-multiples", visible: false },
      { label: "Semicírculos", slug: "semicirculos", visible: true },
      { label: "Óleo y acrílico/madera", slug: "oleo", visible: true },
      { label: "Papelería y almaZen", slug: "papeleria-y-almazen", visible: true },
      { label: "Home painting", slug: "home-painting", visible: true },
    ],
  },
  {
    id: "interacciones",
    label: "INTERACCIONES",
    href: "/interacciones",
    visible: true,
    subitems: [
      { label: "De la vista el amor", slug: "de-la-vista-el-amor", visible: false },
      { label: "Colegages", slug: "colegages", visible: true },
      { label: "Arquitecturas", slug: "arquitectura", visible: true },
      { label: "A quien corresponda", slug: "a-quien-corresponda", visible: true },
      { label: "SIC", slug: "sic", visible: true },
      { label: "Abstracción figurativa de lo conceptual", slug: "abstraccion-figurativa", visible: true },
      { label: "Death of painting is a play of lights", slug: "death-of-painting", visible: true },
      { label: "Aspect ratio", slug: "aspect-ratio", visible: true },
      { label: "Paráfrasis", slug: "parafrasis", visible: true },
    ],
  },
  {
    id: "papeleria",
    label: "PAPELERÍA",
    href: "/papeleria",
    visible: true,
    subitems: [
      { label: "Tórculo", slug: "torculo", visible: true },
      { label: "Shakers", slug: "shakers", visible: true },
      { label: "Recursos (Papelería y almaZen)", slug: "recursos", visible: true },
    ],
  },
  {
    id: "volumenes",
    label: "VOLÚMENES",
    href: "/volumenes",
    visible: true,
  },
  {
    id: "encurso",
    label: "EN CURSO",
    href: "/encurso",
    visible: false,
    subitems: [
      { label: "Home painting", slug: "home-painting", visible: true },
      { label: "Papelería", slug: "papeleria", visible: true },
      { label: "Maquetas", slug: "maquetas", visible: false }, // Este subelemento estará oculto
    ],
  },
  {
    id: "acerca",
    label: "ACERCA DE",
    href: "/acerca-de",
    visible: true,
  },
]
