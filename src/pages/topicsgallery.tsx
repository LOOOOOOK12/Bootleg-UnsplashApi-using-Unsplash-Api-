import { Link, useParams } from 'react-router-dom';
import PageButtons from '@/components/pageButtons';
import { DarkModeProps } from '@/types/types'; 
import useGetTopicPhotos from '@/hooks/useGetTopicPhotos';
import usePage from '@/hooks/usePage';
import useSearch from '@/hooks/useSearch';
import { Blurhash } from 'react-blurhash';

function TopicsGallery({ darkMode }: DarkModeProps) {
    const { page, handleNextPage, handlePrevPage } = usePage(1);
    const { slug } = useParams<{ slug: string }>();
    
    const { topicPhotos, isLoading } = useGetTopicPhotos(page, slug);

    return (
        <div className={`relative flex flex-col bg-lightMode-background dark:bg-darkMode-colors-background ${darkMode ? 'dark' : ''}`}>
            <div id="Home" className="max-h-* flex flex-wrap overflow-hidden justify-center gap-3 px-4 py-8 dark:bg-darkMode-colors-background duration-200" >
                {topicPhotos.map((pic) => 
                isLoading ? (
                    <Blurhash
                        hash={pic.blur_hash}
                        width={300}
                        height={250}
                        punch={1}
                    />
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
                                className="w-full h-80 grow"
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
