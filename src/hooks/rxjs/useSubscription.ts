import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

// export function useSubscription(
//     obs$: BehaviorSubject<any> | BehaviorSubject<any>[],
//     observer: (args: any | any[]) => void
// ) {
//     const isMountedRef = useState<boolean>(false);
//     useEffect(() => {
//         const unsubscribe = obs$.subscribe(observer);
//     }, []);

//     return;
// }
