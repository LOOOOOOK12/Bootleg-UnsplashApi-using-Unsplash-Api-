import { Link, useParams } from 'react-router-dom';
import PageButtons from '@/components/pageButtons';
import { DarkModeProps } from '@/types/types'; 
import useGetTopicPhotos from '@/hooks/useGetTopicPhotos';
import usePage from '@/hooks/usePage';
import { Skeleton } from '@/components/ui/skeleton';

function TopicsGallery({ darkMode }: DarkModeProps) {
    const { page, handleNextPage, handlePrevPage } = usePage(1);
    const { slug } = useParams<{ slug: string }>();
    const { topicPhotos, isLoading } = useGetTopicPhotos(page, slug);

    return (
        <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div id="Home" className="content-evenly columns-1 md:columns-3 lg:columns-4 justify-center gap-2 px-4 py-8 dark:bg-darkMode-colors-background duration-200" >
                {topicPhotos.map((pic) => 
                    isLoading ? (
                        <Skeleton className="h-80 mb-2" />
                    ):(
                        <Link
                            key={pic.id}
                            to={`/photos/${pic.id}`}
                            state={{
                                id: pic.id,
                            }}
                        >
                            <img
                                id={pic.id}
                                src={pic.urls.regular}
                                alt={pic.alt_description || 'Image'}
                                title={pic.alt_description || 'No description'}
                                className="object-cover mb-2"
                            />
                        </Link>
                    ))
                }
            </div>
            <PageButtons toggleNextPage={handleNextPage} togglePrevPage={handlePrevPage} darkMode={darkMode} />
        </div>
    );
}

export default TopicsGallery;
