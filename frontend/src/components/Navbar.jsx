import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
function Navbar() {

    return (
        <>
            <nav className="mb-0 flex justify-center bg-red-950">
                <ul role="list" className="mt-6 flex justify-center items-center space-x-16 font-serif p-6">
                    <li className="nav_links relative flex flex-row gap-3">
                    <Link to="/register">
                            <button className="font-bold text-2xl block p-4 focus:outline-none bg-[#360808]  text-white hover:text-zinc-50 shadow-rose-950 shadow-xl border-none hover:-translate-y-1">Register</button>
                        </Link>
                        <Link to="/">
                            <button className="font-bold text-2xl block p-4 focus:outline-none bg-[#360808] hover:text-zinc-50 shadow-rose-950 text-white shadow-xl border-none hover:-translate-y-1">Log-In
                            </button>
                        </Link>
                        <Link to="/Dashboard">
                            <button className="font-bold text-2xl block p-4 focus:outline-none bg-[#360808] hover:text-zinc-50 shadow-rose-950 text-white shadow-xl border-none hover:-translate-y-1">Dashboard
                            </button>
                        </Link>

                        <Link to="/Newspaper">
                            <button
                                className="font-bold text-2xl block p-4 focus:outline-none bg-[#360808] hover:text-zinc-50 shadow-rose-950 text-white shadow-xl border-none hover:-translate-y-1">
                                Newsletter
                            </button>
                        </Link>
                        
                        <Link to="/Author">
                        <button className="font-bold text-2xl block p-4 focus:outline-none bg-[#360808]  text-white hover:text-zinc-50 shadow-rose-950 shadow-xl border-none hover:-translate-y-1">Submit Articles</button>
                        </Link>
                        <Link to="/User">
                        <button className="font-bold text-2xl block p-4 focus:outline-none bg-[#360808]  text-white hover:text-zinc-50 shadow-rose-950 shadow-xl border-none hover:-translate-y-1">User</button>
                        </Link>
                        <SearchBar />
                    </li>
                </ul >
            </nav >
        </>
    );
}

export default Navbar;
