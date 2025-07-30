import type { MenuItem, SubitemData } from "../types/menu";

export function getSubitemData(menu: MenuItem[], categoria: string, slug: string): SubitemData | null {
  const categoriaData = menu.find((item) => item.id === categoria)
  if (!categoriaData || !categoriaData.subitems) return null

  const subitem = categoriaData.subitems.find((s) => s.slug === slug)
  if (!subitem) return null

  return {
    categoria: categoriaData.id,
    categoriaLabel: categoriaData.label,
    ...subitem,
  }
}
