
    export type RemoteKeys = 'characterDetail/App';
    type PackageType<T> = T extends 'characterDetail/App' ? typeof import('characterDetail/App') :any;