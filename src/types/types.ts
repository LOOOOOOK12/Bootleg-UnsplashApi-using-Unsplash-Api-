export type NavFunctionProps = {
    handleSearch?: (value: string) => void;
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
};

export type PageButtonProps = PageButtonFunctionProps & DarkModeProps;

export type NavBarProps = NavFunctionProps & DarkModeProps;
