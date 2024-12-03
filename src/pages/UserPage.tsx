import { NavBarProps } from "@/types/types";
import useGetUser from "@/hooks/useGetUser";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";

function UserPage({ darkMode }: NavBarProps) {
    const { username } = useParams<{ username: string }>();
    const { userInfo, isLoading } = useGetUser(username);

    console.log(username);
    console.log(userInfo);

    return (
        <div className={` ${darkMode ? "dark" : ""}`}>
            <div className="h-screen text-lightMode-text flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text">
                {isLoading ? (
                    <Skeleton className="h-40 w-60" />
                ) : (
                    userInfo && (
                        <div className="w-full">
                            <div className="relative w-full flex items-center justify-center h-80">
                                <div className="h-full w-full flex flex-row relative z-10 overflow-hidden">
                                    <img src={userInfo.photos[0].urls.regular} alt="" className="w-full h-full object-cover brightness-50 hover:brightness-75 duration-100"/>
                                    <img src={userInfo.photos[1].urls.regular} alt="" className="w-full h-full object-cover brightness-50 hover:brightness-75 duration-100"/>
                                    <img src={userInfo.photos[2].urls.regular} alt="" className="w-full h-full object-cover brightness-50 hover:brightness-75 duration-100"/>
                                </div>
                                <h1 className="absolute font-bold text-4xl z-20 md:text-6xl lg:text-8xl text-darkMode-colors-text">{userInfo.name}</h1>
                                <img src={userInfo.profile_image.large} alt={userInfo.username} className="size-40 rounded-full z-30 absolute -bottom-16 md:left-5 lg:left-5" />  
                            </div>
                            <div className="flex flex-col gap-2 p-4 mt-32">
                                <p>{userInfo.bio || "No bio"}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default UserPage;