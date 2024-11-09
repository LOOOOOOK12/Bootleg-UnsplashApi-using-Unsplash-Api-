import { Link} from "react-router-dom";
import { Input } from "./ui/input";
import { Image, Moon, Sun } from "lucide-react";
import { NavBarProps } from "@/types/types";
import useGetTopics from "@/hooks/useGetTopics";
import useSearch from "@/hooks/useSearch";

function Nav({ toggleDarkmode, darkMode }: NavBarProps) {
    const { topicsData } = useGetTopics();
    const { handleSearch, searchQuery, setSearchQuery } = useSearch();

    const onSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchQuery) {
        handleSearch(searchQuery);
        console.log(searchQuery);
        }
    };

    return (
        <nav className={`sticky z-10 top-0 ${darkMode ?"bg-darkMode-colors-background border-b-gray-400 text-darkMode-colors-text" :"bg-lightMode-background border-b-gray-400"} flex flex-col justify-between border border-x-0 border-t-0 py-2 px-4 gap-2 w-full duration-200`}>
        <div className="flex flex-row w-full justify-between gap-2 bg-">
            <div className="flex w-full gap-4 items-center">
            <Link to={`/`}>
                {darkMode ? (
                <Image color="#f9fafb" />
                ) : (
                <Image color="#040506" className="h-full" />
                )}
            </Link>
            <div className="w-1/2">
                <form onSubmit={onSearchSubmit}>
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search photos and illustrations"
                    type="text"
                    defaultValue={searchQuery}
                    className={`w-full border ${
                    darkMode
                        ? "dark:bg-darkMode-colors-background dark:text-darkMode-colors-text dark:border-gray-400"
                        : "border-gray-400"
                    } duration-200`}
                />
                </form>
            </div>
            </div>
            <button onClick={toggleDarkmode}>
                {darkMode ? <Sun color="#f9fafb" /> : <Moon color="#040506" />}
            </button>
        </div>
        <div>
            <div className="hidden md:flex gap-2">
            {topicsData?.map((topic) => (
                <Link
                key={topic.slug}
                to={`/topics/${topic.slug}/photos`}
                className={` border ${darkMode ? " dark:text-darkMode-colors-text dark:hover:bg-gray-700" : "text-lightMode-text hover:bg-gray-200 duration-200"} border-gray-400 rounded-sm px-4 py-2`}                >
                {topic.slug}
                </Link>
            ))}
            <Link
                to={`/collections`}
                className={` border ${darkMode ? " dark:text-darkMode-colors-text dark:hover:bg-gray-700" : "text-lightMode-text hover:bg-gray-200 duration-200"} border-gray-400 rounded-sm px-4 py-2`}
            >
                Collections
            </Link>
            </div>
        </div>
        </nav>
    );
}

export default Nav;
