declare global {
    interface Window {
        mozRequestAnimationFrame: any;
        oRequestAnimationFrame: any;
        msRequestAnimationFrame: any;
        mozCancelRequestAnimationFrame: any;
        webkitCancelRequestAnimationFrame: any;
        oCancelRequestAnimationFrame: any;
        msCancelRequestAnimationFrame: any;
    }
}
export declare type RequestTimeout = object | number | void;
export declare const requestTimeout: (fn: Function, delay: number) => RequestTimeout;
export declare const clearRequestTimeout: (handle: any) => void;
