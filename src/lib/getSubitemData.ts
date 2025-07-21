export interface Subitem {
  slug: string;
  label: string;
  [key: string]: any; // puedes quitar esto si defines todos los campos
}

export interface MenuItem {
  id: string;
  label: string;
  subitems?: Subitem[];
  [key: string]: any;
}

export interface SubitemData extends Subitem {
  categoria: string;
  categoriaLabel: string;
}

export function getSubitemData(
  menu: MenuItem[],
  categoria: string,
  slug: string
): SubitemData | null {
  const categoriaData = menu.find((item) => item.id === categoria);
  if (!categoriaData || !categoriaData.subitems) return null;

  const subitem = categoriaData.subitems.find((s) => s.slug === slug);
  if (!subitem) return null;

  return {
    categoria: categoriaData.id,
    categoriaLabel: categoriaData.label,
    ...subitem,
  };
}
