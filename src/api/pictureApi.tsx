export async function getRandomPicture() {
    const url = `https://api.unsplash.com/photos/random`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
        }
    }
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}