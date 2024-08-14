export const Pill = () => {
    return (
        <nav className="py-4 px-8">
            <div className="max-w-6xl mx-auto flex justify-between items-center drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)]">
                <div className="border-2 border-black rounded-full py-[10px] p-[2px]">
                    <a
                        href="#"
                        className="px-4 py-2 text-xl rounded-full hover:bg-black hover:text-[#F3F3F2] transition-colors"
                    >
                        Network
                    </a>
                    <a
                        href="#"
                        className="px-4 py-2 text-xl rounded-full hover:bg-black hover:text-[#F3F3F2] transition-colors"
                    >
                        Studio
                    </a>
                </div>
            </div>
        </nav>
    );
};
