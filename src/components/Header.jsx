import ReactNav from "./Nav";

export default function ReactHeader() {
    return (
        <header className="
        min-h-14
        relative
        pt-6 lg:pt-12 
        px-6 lg:pl-12 lg:pr-0
        flex flex-row lg:flex-col
        ">
            <h1 className="
            absolute lg:static
            text-2xl
            lg:pb-20 
            font-semibold tracking-widest
            whitespace-nowrap">
                <a href="/">PEDRO ESCAPA</a>
            </h1>
            <div className="
            flex flex-col 
            w-full h-full 
            overflow-auto no-scrollbar">
                <ReactNav />
            </div>
            <div className="absolute right-6 items-center">
                <a href="#">
                    <img className="block size-8 lg:hidden" src="/menu-icon.svg" alt="Menú" />
                </a>
            </div>

        </header>
    )
}