import { useEffect, useRef, useState } from "react";
import { BehaviorSubject, Observable } from "rxjs";

export const useObservable = <TOutput, TInputs extends Readonly<any[]>>(
    setup:
        | (() => Observable<TOutput>)
        | ((inputs$: Observable<[...TInputs]>) => Observable<TOutput>),
    inputs?: [...TInputs]
) => {
    if (inputs === undefined) {
        const [state] = useState(setup as () => Observable<TOutput>);
        return state;
    }

    const [inputs$] = useState(() => new BehaviorSubject(inputs));
    const [sources$] = useState(() => setup(inputs$));

    const isMountedRef = useRef<boolean>(false);
    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = false;
            return;
        }

        inputs$.next(inputs);
    }, inputs);

    return sources$;
};

export default useObservable;
