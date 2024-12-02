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
            <div className="h-screen px-4 py-2 text-lightMode-text flex bg-lightMode-background dark:bg-darkMode-colors-background dark:text-darkMode-colors-text">
                {isLoading ? (
                    <Skeleton className="h-40 w-60" />
                ) : (
                    userInfo && (
                        <div>
                            <img src={userInfo.profile_image.medium} alt={userInfo.username} className="h-11 w-20" />
                            <div className="flex flex-col">
                                <h1>{userInfo.name}</h1>
                                <p>{userInfo.bio}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default UserPage;