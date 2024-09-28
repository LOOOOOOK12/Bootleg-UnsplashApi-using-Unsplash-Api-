import NavBar from '../components/nav';
import { useLocation } from 'react-router-dom';

type PicturePageProps = {
    image: string;
    imageDescription: string;
    place: string;
};

function PicturePage() {
    const location = useLocation();

    const state = location.state as PicturePageProps | undefined;

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, imageDescription, place } = state;

    return (
        <div>
            <NavBar/>
            <div> 
                <img src={image} alt={imageDescription} className='h-64'/>
                <div className='flex flex-col'>
                    <p>{imageDescription}</p>
                    <p>{place}</p>
                </div>
            </div>
        </div>
    );
}

export default PicturePage;
