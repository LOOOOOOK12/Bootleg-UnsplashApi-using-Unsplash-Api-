
export type NavFunctionProps = {
    topics?: string[];
    children?: React.ReactNode;
};

export type DarkModeProps = {
    darkMode?: boolean; 
    toggleDarkmode?: () => void;
}

export type PageButtonFunctionProps = {
    toggleNextPage?: () => void;
    togglePrevPage?: () => void;
}

//mainpage
export type PictureProps = {
    picturePageData: PicturePageProps[];
    isLoading: boolean;
    routes: Routes;
}

export type Routes = "photo" | "collections";

export type PhotoGalleryProps = {
    id: string;
    image: string;
    title: string;
    alt: string;
    link: string;
}
//mainpage

export type PicturePageProps = {
    id: string;
    image: string;
    imageDescription: string;
    place: string;
    color: string;
    likes: number;
};

export type CollectionPageProps = {
    image: string;
    title: string;
    description: string;
    totalPhotos: number;
    user: string;
}

export type PageButtonProps = PageButtonFunctionProps & DarkModeProps;

export type NavBarProps = NavFunctionProps & DarkModeProps;
