export type NavFunctionProps = {
    handleSearch?: (value: string) => void;
    topics?: string[];
};

export type DarkModeProps = {
    darkMode?: boolean; 
    toggleDarkmode?: () => void;
}

export type PageButtonFunctionProps = {
    toggleNextPage?: () => void;
    togglePrevPage?: () => void;
}

export type PicturePageProps = {
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
