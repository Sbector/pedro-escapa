import ReactNav from "./Nav";

export default function ReactHeader() {
    return (
        <header className="
        relative
        pt-4 lg:pt-12 
        px-4 lg:pl-12 lg:pr-0
        flex flex-row lg:flex-col
        ">
            <h1 className="
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
            <div className="absolute right-4 items-center">
                <a href="#">
                    <img className="block size-8 lg:hidden" src="/menu-icon.svg" alt="Menú" />
                </a>
            </div>

        </header>
    )
}