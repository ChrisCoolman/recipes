import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

function Searchbar({onSearch} : {onSearch: (searchTerm: string) => void}) {
    const [input, setInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        onSearch(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents page reload
        onSearch(input);
    };

    return(
        <form onSubmit={handleSubmit} className="bg-dark-green text-white text-center p-2 m-8 rounded-4xl flex items-center justify-begin w-2xl">
            <div className="pl-4">
                <FaMagnifyingGlass />
            </div>
            <input
                className="searchbar pl-2"
                type="text"
                placeholder="Search for a recipe"
                value={input}
                onChange={handleChange}
            />
        </form>
    );
}

export default Searchbar;