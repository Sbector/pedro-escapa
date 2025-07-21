import type { MenuItem } from "./getSubitemData";

export const menu: MenuItem[] = [
  {
    id: "bidimensional",
    label: "BIDIMENSIONAL",
    href: "/bidimensional",
    subitems: [
      { label: "89-01", slug: "89-01" },
      { label: "Escaleras", slug: "escaleras" },
      { label: "Pi", slug: "pi" },
      { label: "Mixta sobre escaleras", slug: "mixta-sobre-escaleras" },
      { label: "Composición", slug: "composicion" },
      { label: "Consejos", slug: "consejos" },
      { label: "Usos múltiples", slug: "usos-multiples" },
      { label: "Semicírculos", slug: "semicirculos" },
      { label: "Óleo", slug: "oleo" },
    ],
  },
  {
    id: "interacciones",
    label: "INTERACCIONES",
    href: "/interacciones",
    subitems: [
      { label: "De la vista el amor", slug: "de-la-vista-el-amor" },
      { label: "Colegages", slug: "colegages" },
      { label: "Arquitecturas", slug: "arquitecturas" },
      { label: "A quien corresponda", slug: "a-quien-corresponda" },
      { label: "Papelería y almaZen", slug: "papeleria-y-almazen" },
      { label: "Sic", slug: "sic" },
      { label: "Abstracción figurativa", slug: "abstraccion-figurativa" },
      { label: "Death of painting is a", slug: "death-of-painting-is-a" },
      { label: "Aspect ratio", slug: "aspect-ratio" },
      { label: "Paráfrasis", slug: "parafrasis" },
    ],
  },
  {
    id: "papeleria",
    label: "PAPELERÍA",
    href: "/papeleria",
    subitems: [
      { label: "Proyecto", slug: "proyecto" },
      { label: "Shakers", slug: "shakers" },
    ],
  },
  {
    id: "volumenes",
    label: "VOLÚMENES",
    href: "/volumenes",
    subitems: [
      { label: "Esculturas", slug: "esculturas" },
      { label: "Maquetas", slug: "maquetas" },
    ],
  },
  {
    id: "encurso",
    label: "EN CURSO",
    href: "/encurso",
    subitems: [
      { label: "Home painting", slug: "home-painting" },
      { label: "Papelería", slug: "papeleria" },
      { label: "Maquetas", slug: "maquetas" },
    ],
  },
  {
    id: "acerca",
    label: "ACERCA DE",
    href: "/acerca-de",
  },
];
