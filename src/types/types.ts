
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


export type PageButtonProps = PageButtonFunctionProps & DarkModeProps;

export type NavBarProps = NavFunctionProps & DarkModeProps;
