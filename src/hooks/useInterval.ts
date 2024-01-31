import React, { useEffect, useState } from "react";

type TCallback = () => void;

export function useInterval(callback: TCallback, delay: number | null = null) {
    const [func] = useState<{ callback: null | TCallback }>(() => {
        return { callback };
    });

    useEffect(() => {
        func.callback = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            func.callback && func.callback();
        };

        if (delay !== null) {
            const timer = setInterval(tick, delay);
            return () => clearInterval(timer);
        }
    }, [delay]);
}

export default useInterval;
