import { useEffect, useState } from "react";

const getMatches = (query: string) => {
    if (typeof window !== "undefined") {
        return window.matchMedia(query).matches;
    }

    return false;
};

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(getMatches(query));

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        const handleMatchChange = () => {
            const flag = getMatches(query);
            setMatches(flag);
        };

        try {
            matchMedia.addEventListener("change", handleMatchChange);
        } catch (e) {
            // for old browser
            matchMedia.addListener(handleMatchChange);
        }

        return () => {
            try {
                matchMedia.removeEventListener("change", handleMatchChange);
            } catch (e) {
                // for old browser
                matchMedia.removeListener(handleMatchChange);
            }
        };
    }, [query]);

    return {
        matches,
    };
};
