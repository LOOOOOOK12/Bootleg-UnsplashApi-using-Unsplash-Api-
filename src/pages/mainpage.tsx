import { Link } from "react-router-dom";
import { DarkModeProps } from "@/types/types.ts";
import PageButtons from "@/components/pageButtons.tsx";
import usePage from "../hooks/usePage.ts";
import useGetPhotos from "../hooks/useGetPhotos.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

function mainpage({ darkMode }: DarkModeProps) {
    const { page , handleNextPage, handlePrevPage } = usePage(1);
    const { photosData, isLoading } = useGetPhotos(page);

    return (
        <div
        className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${
            darkMode ? "dark" : ""
        }`}
        >
        <div
            id="Home"
            className={`gap-2 p-3 content-evenly columns-1 md:columns-3 lg:columns-4 dark:bg-darkMode-colors-background duration-200`}
        >
            {photosData.map((pic) =>
                isLoading ? (
                    <Skeleton className="h-80 mb-2" />
                ) : (
                    <Link
                    key={pic.id}
                    to={`/photos/${pic.id}`}
                    >
                        <img
                        id={pic.id}
                        src={pic.urls.regular + "&auto=format"}
                        alt={pic.description || "Image"}
                        title={pic.alt_description || "No description"}
                        className="object-cover mb-2"
                        />
                    </Link>
                )
            )}
        </div>
        <PageButtons
            toggleNextPage={handleNextPage}
            togglePrevPage={handlePrevPage}
            darkMode={darkMode}
        />
        </div>
    );
}

export default mainpage;
