import { useEffect, useState } from "react";

type Props = {};

const getVisibilityAttrs = () => {
    let visibilityChange;
    let hidden;

    if (typeof window === "undefined") {
        return { visibilityChange, hidden };
    }

    if (typeof document?.hidden !== "undefined") {
        visibilityChange = "visibilitychange";
        hidden = "hidden";
    }

    // else if (typeof document?.mozHidden !== "undefined") {
    //     visibilityChange = "mozvisibilitychange";
    //     hidden = "mozHidden";
    // } else if (typeof document?.msHidden !== "undefined") {
    //     visibilityChange = "msvisibilitychange";
    //     hidden = "msHidden";
    // } else if (typeof document?.webkitHidden !== "undefined") {
    //     visibilityChange = "webkitvisibilitychange";
    //     hidden = "webkitHidden";
    // }

    return { visibilityChange, hidden };
};

const getVisibilityState = () => {
    if (typeof window === "undefined") {
        return false;
    }

    const { hidden = "" } = getVisibilityAttrs();
    // @ts-ignore
    return document[hidden];
};

export const useVisibilityChange = (props: Props) => {
    const [visibilityState, setVisibilityState] = useState<boolean>(
        getVisibilityState()
    );

    useEffect(() => {
        const { visibilityChange, hidden } = getVisibilityAttrs();
        if (!visibilityChange) {
            return;
        }

        const handleVisibilityChange = (
            e: DocumentEventMap["visibilitychange"]
        ) => {
            const target = <Document>e.target ?? document;
            const visibilityState: DocumentVisibilityState =
                target.visibilityState;

            setVisibilityState(visibilityState === "visible");
        };

        document.addEventListener(visibilityChange, handleVisibilityChange);
        return () => {
            if (!visibilityChange) {
                return;
            }

            document.removeEventListener(
                visibilityChange,
                handleVisibilityChange
            );
        };
    }, []);

    return {
        visibilityState,
    };
};
