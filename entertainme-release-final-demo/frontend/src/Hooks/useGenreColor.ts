import { useEffect, useState } from "react";


const useGenreColorHook = (genreName: string) => {
    const [color, setColor] = useState("");

    useEffect(() => {
        // Define your color mapping logic here based on the genreName
        // For example, you can use a switch statement to assign different colors to different genres
        let genreColor = "";

        switch (genreName) {
            case "Action":
            case "Action-Adventure":
            case "Action & Adventure":
            case "Adventure":
            case "TV Action & Adventure":
                genreColor = "#b82f1a";
                break;
            case "Comedy":
            case "Comedies":
            case "Stand-Up Comedy":
            case "TV Comedies":
            case "Stand-Up Comedy & Talk Shows":
                genreColor = "#adbd53";
                break;
            case "Drama":
            case "Dramas":
            case "Reality TV":
            case "Reality":
            case "TV Dramas":
                genreColor = "#48cfe0";
                break;
            case "Animation":
            case "Anime":
            case "Anime Series":
            case "Anime Features":
                genreColor = "orange";
                break;
            case "Western":
                genreColor = "#a16c10";
                break;
            case "Kids":
            case "Children & Family Movies":
            case "Kids' TV":
            case "Family":
                genreColor = "#77bf34";
                break;
            case "TV Shows":
            case "British TV Shows":
            case "International TV Shows":
                genreColor = "#a69586";
                break;
            case "Documentaries":
            case "Documentary":
            case "Docuseries":
            case "Anthology":
                genreColor = "#163c94";
                break;
            case "Horror":
            case "Horror Movies":
            case "TV Horror":
                genreColor = "#911378"
                break;
            case "Crime":
            case "Crime TV Shows":
                genreColor = '#798269'
                break;
            case "Sci-Fi & Fantasy":
            case "Sci-Fi":
                genreColor = '#638a96'
                break;
            case "Animals & Nature":
                genreColor = '#2c5737'
                break;
            default:
                genreColor = "rgb(117, 113, 161)"; // Default color if genreName doesn't match any cases
        }

        setColor(genreColor);
    }, [genreName]);

    return color;
};

export default useGenreColorHook;