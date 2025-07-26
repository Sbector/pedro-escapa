import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { menu } from "@lib/menu";

export default function ReactNav({ currentPath }) {
    // Función para verificar si un enlace está activo
    const isActive = (href) => {
        if (href === '/' && currentPath === '/') return true;
        if (href !== '/' && currentPath.startsWith(href)) return true;
        return false;
    };

    // Función para verificar si un subitem está activo
    const isSubitemActive = (categoryId, slug) => {
        return currentPath === `/${categoryId}/${slug}`;
    };

    // Función para verificar si una categoría tiene un subitem activo
    const hasCategoryActiveSubitem = (item) => {
        if (!item.subitems) return false;
        return item.subitems.some(sub => 
            sub.visible !== false && isSubitemActive(item.id, sub.slug)
        );
    };

    return (
        <nav>
            <ul
                className="hidden lg:flex lg:flex-col 
            lg:space-y-[20px] 
            text-xs tracking-widest"
            >
                {menu
                    .filter((item) => item.visible !== false)
                    .map((item) => (
                        <li key={item.id}>
                            {item.subitems ? (
                                <Disclosure defaultOpen={hasCategoryActiveSubitem(item)}>
                                    <DisclosureButton 
                                        className={`cursor-pointer ${
                                            hasCategoryActiveSubitem(item) 
                                                ? 'font-semibold italic' 
                                                : 'font-medium'
                                        }`}
                                    >
                                        {item.label}
                                    </DisclosureButton>
                                    <DisclosurePanel>
                                        <ul className="pt-[20px] pb-[12px] space-y-[10px] ml-[1px]">
                                            {item.subitems
                                                .filter((subitem) => subitem.visible !== false)
                                                .map((sub) => (
                                                    <li key={sub.slug}>
                                                        <a
                                                            href={`/${item.id}/${sub.slug}`}
                                                            className={`block hover:italic ${
                                                                isSubitemActive(item.id, sub.slug)
                                                                    ? 'text-black italic'
                                                                    : 'text-[#878383]'
                                                            }`}
                                                        >
                                                            {sub.label}
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </DisclosurePanel>
                                </Disclosure>
                            ) : (
                                <a 
                                    href={item.href} 
                                    className={`inline-block ${
                                        isActive(item.href)
                                            ? 'font-semibold italic'
                                            : 'font-medium'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}

                <li className="pt-20">
                    <a 
                        href="/contacto" 
                        className={`text-xs ${
                            isActive('/contacto')
                                ? 'font-semibold italic'
                                : 'font-medium'
                        }`}
                    >
                        CONTACTO
                    </a>
                </li>
            </ul>
        </nav>
    );
}