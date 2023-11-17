import { MutableRefObject, useState } from "react";
import { BehaviorSubject } from "rxjs";

export function useObservableRef<TValue>(
    initialValue: TValue
): [MutableRefObject<TValue>, BehaviorSubject<TValue>];

export function useObservableRef<TValue>(
    initialValue: TValue | null
): [MutableRefObject<TValue>, BehaviorSubject<TValue>];

export function useObservableRef<TValue = undefined>(
    initialValue?: TValue
): [MutableRefObject<TValue | undefined>, BehaviorSubject<TValue | undefined>];

export function useObservableRef<TValue = undefined>(
    initialValue?: TValue
): [MutableRefObject<TValue | undefined>, BehaviorSubject<TValue | undefined>] {
    const [value$] = useState(() => new BehaviorSubject(initialValue));
    const [ref] = useState<MutableRefObject<TValue | undefined>>(() => {
        return {
            get current(): TValue | undefined {
                return value$.value;
            },
            set current(value: TValue | undefined) {
                value$.next(value);
            },
        };
    });

    return [ref, value$];
}
