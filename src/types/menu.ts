export interface Subitem {
  slug: string
  label: string
  visible?: boolean // Propiedad opcional para controlar visibilidad
  [key: string]: any // puedes quitar esto si defines todos los campos
}

export interface MenuItem {
  id: string
  label: string
  visible?: boolean // Propiedad opcional para controlar visibilidad
  subitems?: Subitem[]
  [key: string]: any
}

export interface SubitemData extends Subitem {
  categoria: string
  categoriaLabel: string
} 