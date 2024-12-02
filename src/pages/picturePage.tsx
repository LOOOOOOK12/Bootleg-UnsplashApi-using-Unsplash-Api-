import { Link, useParams } from "react-router-dom";
import { NavBarProps } from "@/types/types";
import { CircleUserRound, ThumbsUpIcon, Camera, Download, Eye, CalendarClock, Captions, Focus } from "lucide-react";
import useGetPhoto from "@/hooks/useGetPhoto";
import useSearch from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

function PicturePage({ darkMode }: NavBarProps) {
    const { pictureId } = useParams<{ pictureId: string }>();
    const { photoData } = useGetPhoto( pictureId );
    const { handleSearch, fetchSearchResults, searchResultsData } = useSearch();
    console.log(photoData);

    useEffect(() => {
        if (photoData && photoData.tags && photoData.tags.length > 0) {
            fetchSearchResults(photoData.tags[0].title);
        }
    }, [photoData]);

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? "dark" : ""}`}>
            <div className={`min-h-screen text-lightMode-text bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text flex flex-col items-center gap-4 px-5 py-8`}>
                {!photoData ? (
                    <>
                        <div className="w-full">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="size-11 rounded-full"/>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="w-24 h-2 rounded-sm"/> 
                                    <Skeleton className="w-16 h-2 rounded-sm"/>
                                </div>
                            </div>
                        </div>
                        <Skeleton className="h-80 w-60 object-cover items-center"/>
                        <div className="w-full flex flex-col gap-3 md:flex-row">
                            <Skeleton className="w-full h-40"/>
                            <Skeleton className="w-full h-40"/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="flex gap-2 items-center text-sm">
                                        {photoData.user.profile_image ? (
                                            <Link
                                                to={`/users/${photoData.user.username}`}
                                                state={{
                                                    username: photoData.user.username
                                                }}
                                            >
                                                <img src={photoData.user.profile_image.small} alt={photoData.username} className="rounded-full"/>
                                            </Link>
                                        ) : (
                                            <CircleUserRound />
                                        )}
                                        <div className="flex flex-col">
                                            {photoData.user.name ? (<h1 className="font-semibold">{photoData.user.name}</h1> ) : ( <h1 className="font-semibold">No user available</h1>)}
                                            <p className={`${photoData.user.for_hire ? `text-green-400`: `text-red-400`}`}>
                                                {photoData.user.for_hire ? "For Hire" : "Not Available"}
                                            </p>
                                        </div>
                                </div>
                            </div>
                            <img src={photoData.urls.regular} alt={photoData.alt_description} className="h-96 w-60 object-cover"/>
                        <div className="w-full flex flex-col items-start gap-4">
                            <div className="w-full flex flex-col gap-3 md:flex-row">
                                <div className="w-full flex flex-col gap-2 border border-gray-400 rounded-sm p-2">
                                    <span className="flex gap-2">
                                        <span title="Description"><Captions/></span>
                                        <h1>{photoData.description ? photoData.description : photoData.alt_description}</h1>
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <span title="Total of Likes"><ThumbsUpIcon size={20}/></span>
                                        {photoData.likes}
                                    </span>
                                    <span className="flex gap-2">
                                        <span title="Date Uploaded"><CalendarClock/></span>
                                        <h1> 
                                            {new Date(photoData.updated_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                            })}
                                        </h1>
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <span title="Total Downloads"><Download/></span>
                                        {photoData.downloads}
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <span title="Total views"><Eye/></span>
                                        {photoData.views}
                                    </span>
                                </div>
                                <div className="w-full flex flex-col gap-2 border border-gray-400 rounded-sm p-2">
                                    <span title="Camera model" className="flex gap-2">
                                        <Camera/>
                                        {photoData.exif?.model && photoData.exif?.name && photoData.exif?.make ? (
                                        <p>{`${photoData.exif.model}, ${photoData.exif.name}, ${photoData.exif.make}`}</p>
                                        ) : (
                                            <p>Not Available</p>
                                        )}
                                    </span>
                                    <span className="flex gap-2"> 
                                        <span title="Lens"><Focus/></span>
                                        <span className="flex-col">
                                            <h1>{photoData.exif.aperture ?? "N/A"}, {photoData.exif.exposure_time ?? "N/A"}, {photoData.exif.focal_length ?? "N/A"}, {photoData.exif.iso ?? "N/A"}</h1>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <h1>Tags:</h1>
                                <div className="flex flex-wrap gap-2">
                                    {photoData.tags.map((tag:any) => (
                                        <button
                                        onClick={() => handleSearch(tag.title)} 
                                        key={tag.title} 
                                        className="border border-darkMode-colors-primary rounded-sm px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 duration-200">
                                            {tag.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <h1>Related Images</h1>
                                <div className="flex flex-wrap justify-center gap-3 dark:bg-darkMode-colors-background duration-200">
                                    {searchResultsData.map((relPic) =>(
                                        <Link
                                            to={`/photos/${relPic.id}`}
                                            key={relPic.id}
                                        >
                                            <img
                                            key={relPic.id}
                                            src={relPic.urls.regular}
                                            alt={relPic.alt_description}
                                            className=" h-80 object-cover"
                                            /> 
                                        </Link>
                                        
                                    ))}
                                </div>
                            </div>                          
                        </div>
                    </>    
                )}
            </div>
        </div>
    );
}

export default PicturePage;
