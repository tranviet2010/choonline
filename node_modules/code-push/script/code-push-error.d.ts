export declare class CodePushError extends Error {
    constructor(message: string);
}
export declare class CodePushHttpError extends CodePushError {
    constructor(message: string);
}
export declare class CodePushDeployStatusError extends CodePushError {
    constructor(message: string);
}
export declare class CodePushPackageError extends CodePushError {
    constructor(message: string);
}
export declare class CodePushUnauthorizedError extends CodePushError {
    constructor(message: string);
}
