const Auth = `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`;

export async function getPhotos(page?: Number) {
    const url = `https://api.unsplash.com/photos?per_page=30&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            "cache-control": "public, max-age=1000",
            Authorization: Auth,
        }
    }

    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getPhoto(id:any){
    const url = `https://api.unsplash.com/photos/${id}`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }

    try {
        const response = await fetch(url, options)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function getTopics() {
    const url = `https://api.unsplash.com/topics?page=1&per_page=5&order_by=featured`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }
    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result = response.json();
        return result;
    } catch (error) {   
        console.log(error);
    }
}

export async function getTopicPhotos(page: Number = 1, slug?: string) {
    const url = `https://api.unsplash.com/topics/${slug}/photos?page=${page}&per_page=30`
    const option = {
        method : "GET",
        headers:{
            Authorization: Auth,
        }
    }
    try {
        const response = await fetch(url, option);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function searchPictures(search?: string, page: Number = 1){
    const url = `https://api.unsplash.com/search/photos?query=${search}&page=${page}&per_page=30`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.results;
    } catch (error) {
        console.log(error)
    }
}

export async function getCollections(page: Number = 1){
    const url = `https://api.unsplash.com/collections?page=${page}&per_page=30`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getCollectionPhotos(page: Number = 1, id: string) {
    const url = `https://api.unsplash.com/collections/${id}/photos?page=${page}&per_page=30`
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getUser( username?:string ) {
    const url = `https://api.unsplash.com/users/${username}`
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserPhotos( username?:string ) {
    const url = `https://api.unsplash.com/users/${username}/photos`
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserCollections( username?:string ) {
    const url = `https://api.unsplash.com/users/${username}/collections`
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserLikedPhotos( username?:string ) {
    const url = `https://api.unsplash.com/users/${username}/likes`
    const options = {
        method: 'GET',
        headers: {
            Authorization: Auth,
        }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

