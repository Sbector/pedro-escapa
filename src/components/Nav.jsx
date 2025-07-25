import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { menu } from "@lib/menu";

export default function ReactNav() {
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
                                <Menu as="div" className="relative">
                                    <MenuButton className="cursor-pointer">
                                        {item.label}
                                    </MenuButton>
                                    <MenuItems
                                        anchor="bottom start"
                                        className="
                                        absolute z-10 ml-[1px] pt-[15px]
                                        space-y-[10px]
                                        text-xs font-medium capitalize
                                        transition duration-200 ease-in-out
                                        origin-top 
                                        bg-white
                                        ">
                                        {item.subitems
                                            .filter((subitem) => subitem.visible !== false)
                                            .map((sub) => (
                                                <MenuItem
                                                    key={sub.slug}
                                                    as="a"
                                                    href={`/${item.id}/${sub.slug}`}
                                                    className="block text-[#878383] hover:italic"
                                                >
                                                    {sub.label}
                                                </MenuItem>
                                            ))}
                                    </MenuItems>
                                    
                                </Menu>
                            ) : (
                                <a href={item.href} className="inline-block font-medium">
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}

                <li className="pt-20">
                    <a href="/contacto" className="text-xs font-medium">
                        CONTACTO
                    </a>
                </li>
            </ul>
        </nav>
    );
}
