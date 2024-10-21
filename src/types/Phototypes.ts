// Type for User Profile Image
type ProfileImage = {
    small: string;
    medium: string;
    large: string;
  };
  
  // Type for Links related to the User
  type UserLinks = {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
  };
  
  // Type for User Information
  type User = {
    id: string;
    username: string;
    name: string;
    portfolio_url: string;
    bio: string;
    location: string;
    total_likes: number;
    total_photos: number;
    total_collections: number;
    instagram_username: string;
    twitter_username: string;
    profile_image: ProfileImage;
    links: UserLinks;
  };
  
  // Type for Current User Collections
  type Collection = {
    id: number;
    title: string;
    published_at: string;
    last_collected_at: string;
    updated_at: string;
    cover_photo: string | null; // Cover photo can be null
    user: User | null; // User can be null
  };
  
  // Type for URLs of the Photo
  type PhotoUrls = {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  
  // Type for Links related to the Photo
  type PhotoLinks = {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  
  // Type for the Photo Object
  export type Photo = {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string | null; // Description can be null
    user: User;
    current_user_collections: Collection[];
    urls: PhotoUrls;
    links: PhotoLinks;
  };
  
  // Type for the array of Photos
  export type PhotoArray = Photo[];
  