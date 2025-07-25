import { Menu } from "@headlessui/react"

export default function ReactNav() {
    return(
        <nav>
            <ul className="hidden lg:flex lg:flex-col 
            lg:space-y-[20px] 
            text-xs tracking-widest">
                <li>BIDIMENSIONAL</li>
                <li>INTERACCIONES</li>
                <li>PAPELERÍA</li>
                <li>VOLÚMENES</li>
                <li>ACERCA DE</li>
            </ul>
        </nav>
    )
}