
    export type RemoteKeys = 'characters/App';
    type PackageType<T> = T extends 'characters/App' ? typeof import('characters/App') :any;