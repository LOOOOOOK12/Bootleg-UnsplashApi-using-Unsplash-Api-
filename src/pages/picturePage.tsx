import NavBar from '../components/nav';
import { useParams, useLocation } from 'react-router-dom';

type PicturePageProps = {
    image: string;
    imageDescription: string;
    place: string;
};

function PicturePage() {
    const location = useLocation();

    // Extract state passed from <Link>
    const state = location.state as PicturePageProps | undefined;

    if (!state) {
        return <div>Error: No picture data available</div>; 
    }

    const { image, imageDescription, place } = state;

    return (
        <div>
        <NavBar />
        <div> 
            <img src={image} alt={imageDescription} className='h-64'/>
            <div>
                <p>{place}</p>
            </div>
        </div>
        </div>
    );
}

export default PicturePage;
