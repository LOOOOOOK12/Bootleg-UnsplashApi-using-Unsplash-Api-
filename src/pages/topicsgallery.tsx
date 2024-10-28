import { Link, useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import NavBar from '../components/nav';
import PageButtons from '@/components/pageButtons';
import { DarkModeProps } from '@/types/types'; 
import useGetTopicPhotos from '@/hooks/useGetTopicPhotos';
import usePage from '@/hooks/usePage';
import useSearch from '@/hooks/useSearch';

function TopicsGallery({ toggleDarkmode, darkMode }: DarkModeProps) {
    const { page, handleNextPage, handlePrevPage } = usePage(1);
    const { handleSearch } = useSearch();
    const { slug } = useParams<{ slug: string }>();
    
    const { topicPhotos, isLoading } = useGetTopicPhotos(page, slug);

    return (
        <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <NavBar handleSearch={handleSearch} toggleDarkmode={toggleDarkmode} darkMode={darkMode}/>
            <div id="Home" className="max-h-* flex flex-wrap overflow-hidden justify-center gap-3 px-4 py-8 dark:bg-darkMode-colors-background duration-200" >
                {isLoading ? (
                    Array(30).fill(0).map((_, idx) => (
                        <Skeleton key={idx} className="h-52 w-60" />
                    ))
                ) : (
                    topicPhotos.map((pic) => (
                        <Link
                            key={pic.id}
                            to={`/photo/${pic.id}`}
                            state={{
                                image: pic.urls.regular,
                                imageDescription: pic.description,
                                place: pic.user.location ? pic.user.location.name : 'Unknown',
                                likes: pic.likes,
                            }}
                        >
                            <img
                                id={pic.id}
                                src={pic.urls.regular}
                                alt={pic.description || 'Image'}
                                title={pic.description || 'No description'}
                                className="w-full h-80 grow"
                            />
                        </Link>
                    ))
                )}
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode} />
        </div>
    );
}

export default TopicsGallery;