import { NavBarProps } from "@/types/types";
import useGetUser from "@/hooks/useGetUser";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, Link } from "react-router-dom";
import useSearch from "@/hooks/useSearch";
import { MessageSquareMore, Link2, Instagram, Twitter,CircleUserRound, MapPin } from "lucide-react";
import { useState } from "react";

function UserPage({ darkMode }: NavBarProps) {
    const { username } = useParams<{ username: string }>();
    const { userInfo, isLoading, userPhotos, userCollections, userLikedPhotos } = useGetUser(username);
    const { handleSearch }=useSearch();
    const [toggleState, setToggleState] = useState<string>("Photos");

    const toggle = (t: string) => {
        setToggleState(t);
        console.log(toggleState);
    };

    console.log(userInfo);

    return (
        <div className={` ${darkMode ? "dark" : ""}`}>
            <div className="text-lightMode-text flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text py-2 pt-0">
                {isLoading ? (
                    <Skeleton className="w-full h-80" />
                ) : (
                    userInfo && (
                        <div className="w-full h-full">
                            <div className="relative w-full flex items-center justify-center h-96">
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
                                <h1 className="absolute font-bold text-4xl z-20 md:text-6xl lg:text-7xl text-darkMode-colors-text">{userInfo.name}</h1>
                                <div className="absolute size-40 z-30 -bottom-16 md:left-5 lg:left-5">
                                    <div className={`absolute size-7 ${userInfo.for_hire ? "bg-green-400" : "bg-red-400"}  top-5 right-0 rounded-full border-2 border-slate-100 `} title={`${userInfo.for_hire ? "Available for Hire" : "Not for Hire"}`}></div>
                                    <img src={userInfo.profile_image.large} alt={userInfo.username} className="h-full w-full rounded-full" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-2 px-4 mb-4 mt-24">
                                <div className="flex flex-col gap-2 p-2 border border-gray-400 rounded-md w-full">
                                    <span className="flex gap-1" title="Bio">
                                        <MessageSquareMore />
                                        <p>{userInfo.bio || "No bio"}</p>
                                    </span>
                                    <span className="flex gap-1" title="Portfolio Link">
                                        <Link2 />
                                        <a href={userInfo.portfolio_url} target="_blank">{userInfo.portfolio_url || "No Url Available"}</a>
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 p-2 border border-gray-400 rounded-md w-full">
                                    <span className="flex gap-1" title="Name">
                                        <CircleUserRound />
                                        <p>{userInfo.first_name+ " " + userInfo.last_name || "No Instagram Available"}</p>
                                    </span>
                                    <span className="flex gap-1" title="Location">
                                        <MapPin />
                                        <p>{userInfo.location || "Location not available"}</p>
                                    </span>
                                    <span className="flex gap-1" title="Instagram username">
                                        <Instagram />
                                        <p>{userInfo.social.instagram_username || "No instagram available"}</p>
                                    </span>
                                    <span className="flex gap-1" title="Twitter username">
                                        <Twitter/>
                                        <p>{userInfo.social.twitter_username || "No Twitter Available"}</p>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 px-4 mb-4">
                                <h1>Related Tags:</h1>
                                <div className="flex flex-wrap gap-2">
                                    {userInfo.tags.aggregated.map((tag:any)=>(
                                        <button
                                            onClick={() => handleSearch(tag.title)} 
                                            key={tag.title} 
                                        className="border border-darkMode-colors-primary rounded-sm px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 duration-200">
                                            {tag.title}
                                        </button>
                                    ))}
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
                                    {toggleState === "Photos" && (
                                        userPhotos.length > 0 ? (
                                            userPhotos.map((pics) => (
                                                <div className="w-full h-full" key={pics.id}>
                                                    <Link to={`/photos/${pics.id}`} className="h-72">
                                                        <img src={pics.urls.regular} className="object-cover mb-4" />
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No photos available...</p>
                                        )
                                    )}
                                    {toggleState === "Collections" && (
                                        userCollections.length > 0 ? (
                                            userCollections.map((collections) => (
                                                <div className="w-full h-full" key={collections.id}>
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
                                                    >
                                                        <div className="relative h-96 w-full">
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
                                                                    className="object-cover col-span-1 row-span-1 h-full w-full rounded-xl"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No collections available...</p>
                                        )
                                    )}
                                    {toggleState === "LikedPhotos" && (
                                        userLikedPhotos.length > 0 ? (
                                            userLikedPhotos.map((pics) => (
                                                <div className="w-full h-full" key={pics.id}>
                                                    <Link to={`/photos/${pics.id}`} className="h-72">
                                                        <img src={pics.urls.regular} className="object-cover mb-4" />
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No liked photos available...</p>
                                        )
                                    )}
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