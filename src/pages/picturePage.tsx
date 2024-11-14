import { useParams } from "react-router-dom";
import { NavBarProps } from "@/types/types";
import { CircleUserRound, ThumbsUpIcon } from "lucide-react";
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
                    <div className="w-full">
                        <div className="gap-2 items-center">
                            <Skeleton className="size-14 rounded-full"/>
                            <Skeleton className="w-56"/>
                            <Skeleton className="w-56"/>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="flex gap-2 items-center text-sm">
                                    <>
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
                                    </>
                                </div>
                            </div>
                            <img src={photoData.urls.regular} alt={photoData.alt_description} className="h-96 w-60 object-cover"/>
                        <div className="w-full flex flex-col items-start gap-4">
                            <div className="flex flex-col gap-2">
                                <p>{photoData.description ? photoData.description : "No Description Available"}</p>
                                <p className="flex gap-2">
                                    <ThumbsUpIcon/>
                                    {photoData.likes}
                                </p>
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
