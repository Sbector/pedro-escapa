import { useState } from "react";
import ReactNav from "./Nav";

export default function ReactHeader({ currentPath }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="
            min-h-14
            relative
            pt-6 lg:pt-12 
            px-6 lg:pl-12 lg:pr-0
            flex flex-row lg:flex-col
            lg:max-w-3xs
            ">
                <h1 className="
                absolute lg:static
                text-2xl
                lg:pb-20 
                font-semibold tracking-widest
                whitespace-nowrap">
                    <a href="/" onClick={closeMobileMenu}>PEDRO ESCAPA</a>
                </h1>
                
                {/* Nav para desktop - siempre visible en lg+ */}
                <div className="
                hidden lg:flex lg:flex-col 
                w-full h-full 
                overflow-auto no-scrollbar">
                    <ReactNav currentPath={currentPath} />
                </div>

                {/* Botón del menú mobile */}
                <div className="absolute right-6 items-center lg:hidden">
                    <button 
                        onClick={toggleMobileMenu}
                        className="block size-8"
                        aria-label="Toggle menu"
                    >
                        <img 
                            src={isMobileMenuOpen ? "/close-icon.svg" : "/menu-icon.svg"} 
                            alt={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            className="w-full h-full"
                        />
                    </button>
                </div>
            </header>

            {/* Overlay del menú mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/5 z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Menú mobile */}
            <div className={`
                lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw]
                bg-white shadow-xl z-50
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="p-6 h-full overflow-y-auto">
                    <ReactNav 
                        currentPath={currentPath} 
                        isMobile={true}
                        onLinkClick={closeMobileMenu}
                    />
                </div>
            </div>
        </>
    );
}