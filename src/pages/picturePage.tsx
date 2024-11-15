import { useParams } from "react-router-dom";
import { NavBarProps } from "@/types/types";
import { CircleUserRound, ThumbsUpIcon, Camera } from "lucide-react";
import useGetPhoto from "@/hooks/useGetPhoto";
import useSearch from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";

function PicturePage({ darkMode }: NavBarProps) {
    const { pictureId } = useParams<{ pictureId: string }>();
    const { photoData } = useGetPhoto(pictureId);
    const { handleSearch } = useSearch();
    console.log(photoData);

    return (
        <div className={`relative bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? "dark" : ""}`}>
            <div className={`min-h-screen text-lightMode-text bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text flex flex-col items-center gap-4 px-5 py-8`}>
                {!photoData ? (
                    <>
                        <div className="w-full">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="size-6 rounded-full"/>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="w-24 h-2 rounded-sm"/> 
                                    <Skeleton className="w-16 h-2 rounded-sm"/>
                                </div>
                            </div>
                        </div>
                        <Skeleton className="h-80 w-60 object-cover items-center"/>
                    </>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="flex gap-2 items-center text-sm">
                                        {photoData.user.profile_image ? (
                                            <img src={photoData.user.profile_image.small} alt={photoData.username} className="rounded-full"/>
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
                                    <h1>{photoData.description ? photoData.description : photoData.alt_description}</h1>
                                    <span className="flex gap-2 items-center">
                                        <span title="Total of Likes"><ThumbsUpIcon size={20}/></span>
                                        {photoData.likes}
                                    </span>
                                    <h1>Published in:   
                                        {new Date(photoData.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                        })}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-col gap-2 border border-gray-400 rounded-sm p-2">
                                    <span title="Camera model" className="flex gap-2">
                                        <Camera/>
                                        {photoData.exif?.model && photoData.exif?.name && photoData.exif?.make ? (
                                        <p>{`${photoData.exif.model}, ${photoData.exif.name}, ${photoData.exif.make}`}</p>
                                        ) : (
                                            <p>no description</p>
                                        )}
                                    </span>
                                    <span className="flex gap-2"> 
                                        <span className="flex-col">
                                            <h1>Lens: {photoData.exif.aperture}, {photoData.exif.exposure_time}, {photoData.exif.focal_length}, {photoData.exif.iso}</h1>
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
                        </div>
                    </>    
                )}
            </div>
        </div>
    );
}

export default PicturePage;
