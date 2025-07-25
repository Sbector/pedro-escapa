import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
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
                                <Disclosure>
                                    <DisclosureButton className="cursor-pointer">
                                        {item.label}
                                    </DisclosureButton>
                                    <DisclosurePanel>
                                        <ul className="pt-[15px] space-y-[10px] ml-[1px]">
                                            {item.subitems
                                                .filter((subitem) => subitem.visible !== false)
                                                .map((sub) => (
                                                    <li key={sub.slug}>
                                                        <a
                                                            href={`/${item.id}/${sub.slug}`}
                                                            className="block text-[#878383] hover:italic"
                                                        >
                                                            {sub.label}
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </DisclosurePanel>
                                </Disclosure>
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
