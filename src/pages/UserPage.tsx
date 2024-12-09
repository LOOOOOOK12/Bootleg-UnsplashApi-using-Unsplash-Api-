import { NavBarProps } from "@/types/types";
import useGetUser from "@/hooks/useGetUser";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, Link } from "react-router-dom";
import { Captions, Link2 } from "lucide-react";
import { useState } from "react";

function UserPage({ darkMode }: NavBarProps) {
    const { username } = useParams<{ username: string }>();
    const { userInfo, isLoading, userPhotos, userCollections, userLikedPhotos } = useGetUser(username);
    const [toggleState, setToggleState] = useState<string>("Photos");

    const toggle = (t: string) => {
        setToggleState(t);
        console.log(toggleState);
    };

    console.log(username);
    console.log(userInfo);
    console.log(userPhotos);
    console.log(userLikedPhotos);
    console.log(userCollections)

    return (
        <div className={` ${darkMode ? "dark" : ""}`}>
            <div className="text-lightMode-text flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text py-2 pt-0">
                {isLoading ? (
                    <Skeleton className="w-full h-80" />
                ) : (
                    userInfo && (
                        <div className="w-full h-full">
                            <div className="relative w-full flex items-center justify-center h-80">
                                <div className="h-full w-full flex flex-row relative z-10 overflow-hidden">
                                    {userInfo.photos[0].urls.regular && userInfo.photos[1].urls.regular && userInfo.photos[2].urls.regular ?
                                        <div className="w-full h-full">
                                            <img src={userInfo.photos[0].urls.regular} alt="" className="w-full h-full object-cover brightness-50 hover:brightness-75 duration-100" />
                                            <img src={userInfo.photos[1].urls.regular} alt="" className="w-full h-full object-cover brightness-50 hover:brightness-75 duration-100" />
                                            <img src={userInfo.photos[2].urls.regular} alt="" className="w-full h-full object-cover brightness-50 hover:brightness-75 duration-100" />
                                        </div> : 
                                        <div className=" w-full h-full bg-gray-400">
                                        </div>
                                    }
                                </div>
                                <h1 className="absolute font-bold text-4xl z-20 md:text-6xl lg:text-8xl text-darkMode-colors-text">{userInfo.name}</h1>
                                <div className="absolute size-48 z-30 -bottom-16 md:left-5 lg:left-5">
                                    <img src={userInfo.profile_image.large} alt={userInfo.username} className="h-full w-full rounded-full" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 px-4 mb-4 mt-24 w-full">
                                <div className="flex flex-col gap-2 p-2 border border-gray-400 rounded-md w-full">
                                    <span className="flex gap-2" title="Bio">
                                        <Captions />
                                        <p>{userInfo.bio || "No bio"}</p>
                                    </span>
                                    <span className="flex gap-2" title="Portfolio Link">
                                        <Link2 />
                                        <p>{userInfo.portfolio_url || "No Url Available"}</p>
                                    </span>
                                </div>
                                <div className=" w-full flex flex-col gap-2 p-2 border border-gray-400 rounded-md">
                                    <span className="flex gap-2" title="Bio">
                                        <Captions />
                                        <p>{userInfo.bio || "No bio"}</p>
                                    </span>
                                    <span className="flex gap-2" title="Portfolio Link">
                                        <Link2 />
                                        <p>{userInfo.portfolio_url || "No Url Available"}</p>
                                    </span>
                                </div>
                            </div>
                            <div className="px-4 h-full flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row gap-2">
                                    <button
                                        onClick={() => toggle("Photos")}
                                        className={`border border-gray-400 rounded-sm px-4 py-2 text-center dark:text-darkMode-colors-text dark:hover:bg-gray-700 text-lightMode-text hover:bg-gray-200 duration-200 ${toggleState === "Photos" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                                    >
                                        Total Photos: {userInfo.total_photos}
                                    </button>
                                    <button
                                        onClick={() => toggle("Collections")}
                                        className={`border dark:text-darkMode-colors-text border-gray-400 rounded-sm px-4 py-2 text-center dark:hover:bg-gray-700 text-lightMode-text hover:bg-gray-200 duration-200 ${toggleState === "Collections" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                                    >
                                        Total Collections: {userInfo.total_collections}
                                    </button>
                                    <button
                                        onClick={() => toggle("LikedPhotos")}
                                        className={`border dark:text-darkMode-colors-text border-gray-400 rounded-sm px-4 py-2 text-center dark:hover:bg-gray-700 text-lightMode-text hover:bg-gray-200 duration-200 ${toggleState === "Collections" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                                    >
                                        Liked Photos: {userInfo.total_likes}
                                    </button>
                                </div>
                                <div className="content-evenly columns-1 md:columns-3 gap-2">
                                    {toggleState === "Photos" && userPhotos.map((pics) => (
                                        <div className="w-full h-full">
                                            <Link to={`/photos/${pics.id}`} className="h-72" key={pics.id}>
                                                <img src={pics.urls.regular} className="object-cover mb-4" />
                                            </Link>
                                        </div>
                                    ))}
                                    {toggleState === "Collections" && userCollections.map((collections) => (
                                        <div className="w-full h-full">
                                                <Link
                                            to={`/collections/${collections.id}/photos`}
                                            state={{
                                                id: collections.id,
                                                image: collections.preview_photos[1].urls.raw + "&w=180&h=300&fit=max&dpr=1",
                                                title: collections.title,
                                                description: collections.description || "No description",
                                                totalPhotos: collections.total_photos,
                                                user: collections.user.username,
                                                pfp: collections.user.profile_image.small,
                                            }}
                                            key={collections.id}
                                            className="w-full h-full "
                                            >
                                            <div key={collections.id} className="relative h-96 w-full mb-2">
                                                <div className="w-full h-full gap-1 grid grid-cols-2 grid-rows-2 rounded-md brightness-50 hover:brightness-75 duration-200">
                                                    <img
                                                    src={collections.preview_photos[0].urls.regular}
                                                    title={collections.title}
                                                    className="object-cover col-span-1 row-span-1 h-full w-full rounded-xl"
                                                    />
                                                    <img
                                                    src={collections.preview_photos[1].urls.regular}
                                                    title={collections.title}
                                                    className="object-cover col-span-2 row-span-1 h-full w-full rounded-xl"
                                                    />
                                                    <img
                                                    src={collections.preview_photos[2].urls.regular}
                                                    title={collections.title}
                                                    className="object-cover col-span-3 row-span-2 h-full w-full rounded-xl"
                                                    />
                                                </div>
                                                <h1 className="absolute bottom-2 right-2 text-darkMode-colors-text text-2xl text-right font-bold">
                                                    {collections.title}
                                                </h1>
                                                </div>
                                        </Link>
                                        </div>
                                        
                                    ))}
                                    {toggleState === "LikedPhotos" && userLikedPhotos.map((pics) => (
                                        <Link to={`/photos/${pics.id}`} className="h-72" key={pics.id}>
                                            <img src={pics.urls.regular} className="object-cover mb-2" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default UserPage;