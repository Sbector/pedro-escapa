import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { menu } from "@lib/menu";

export default function ReactNav({ currentPath, isMobile = false, onLinkClick }) {
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

    // Manejar click en enlaces
    const handleLinkClick = () => {
        if (isMobile && onLinkClick) {
            onLinkClick();
        }
    };

    // Clases base para desktop y mobile
    const containerClasses = isMobile 
        ? "flex flex-col space-y-6 text-sm tracking-widest"
        : "hidden lg:flex lg:flex-col lg:space-y-[20px] text-xs tracking-widest";

    const spacingClasses = isMobile 
        ? "pt-4 space-y-3 ml-2"
        : "pt-[15px] space-y-[10px] ml-[1px]";

    const contactSpacing = isMobile ? "pt-8" : "pt-20";

    return (
        <nav className="lg:max-w-[160px]">
            <ul className={containerClasses}>
                {menu
                    .filter((item) => item.visible !== false)
                    .map((item) => (
                        <li key={item.id}>
                            {item.subitems ? (
                                <Disclosure defaultOpen={hasCategoryActiveSubitem(item)}>
                                    <DisclosureButton 
                                        className={`cursor-pointer text-left ${
                                            hasCategoryActiveSubitem(item) 
                                                ? 'font-bold text-black' 
                                                : 'font-medium'
                                        }`}
                                    >
                                        {item.label}
                                    </DisclosureButton>
                                    <DisclosurePanel>
                                        <ul className={spacingClasses}>
                                            {item.subitems
                                                .filter((subitem) => subitem.visible !== false)
                                                .map((sub) => (
                                                    <li key={sub.slug}>
                                                        <a
                                                            href={`/${item.id}/${sub.slug}`}
                                                            onClick={handleLinkClick}
                                                            className={`block hover:italic ${
                                                                isSubitemActive(item.id, sub.slug)
                                                                    ? 'text-black font-semibold italic'
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
                                    onClick={handleLinkClick}
                                    className={`inline-block ${
                                        isActive(item.href)
                                            ? 'font-bold text-black'
                                            : 'font-medium'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}

                <li className={contactSpacing}>
                    <a 
                        href="/contacto" 
                        onClick={handleLinkClick}
                        className={`
                            pb-20 
                            ${
                            isActive('/contacto')
                                ? 'font-bold text-black'
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