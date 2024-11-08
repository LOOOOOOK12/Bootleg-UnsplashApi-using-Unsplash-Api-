import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import { DarkModeProps } from "@/types/types.ts";
import PageButtons from "@/components/pageButtons.tsx";
import usePage from "../hooks/usePage.ts";
import useGetPhotos from "../hooks/useGetPhotos.ts";

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
            className="flex flex-wrap justify-center gap-3 px-4 py-8 dark:bg-darkMode-colors-background duration-200"
        >
            {photosData.map((pic) =>
            isLoading ? (
                <Blurhash hash={pic.blur_hash} punch={1} />
            ) : (
                <Link
                key={pic.id}
                to={`/photo/${pic.id}`}
                state={{
                    image: pic.urls.regular,
                    title: pic.alt_description,
                    description: pic.description || "No description",
                    place: pic.location ? pic.location.name : "Unknown",
                    likes: pic.likes || "0",
                    userPfp: pic.user.profile_image.small,
                    user: pic.user.username,
                    forHire: pic.for_hire,
                }}
                >
                <div className="relative">
                    <img
                    id={pic.id}
                    src={pic.urls.raw + "&auto=format&w=1080&h=300&fit=fill"}
                    alt={pic.description || "Image"}
                    title={pic.alt_description || "No description"}
                    className="object-cover"
                    />
                </div>
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
