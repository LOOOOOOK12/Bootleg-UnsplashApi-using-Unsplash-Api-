export type Topics = {
    id: string;
    slug: string;
    title: string;
    cover_photo : {
        urls: {
            thumb: string;
        }
    }
};

export type Search = {
    results: {
        
    }
}

export type NavProps = {
    handleSearch?: (value: string) => void;
    handleDarkMode?: () => void;
    darkMode?: boolean;
};

export type DarkModeProps = {
    darkMode: boolean; 
    toggleDarkmode: () => void;
}