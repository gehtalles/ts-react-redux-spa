import { Monad, Functor, Eq, eq } from 'tsmonad';

export enum RemoteDataType { NotAsked, Loading, Refreshing, Failure, Success }
export interface RemoteDataPatterns<E, D, T> {
    notAsked: () => T;
    loading: () => T;
    refreshing: (r: D) => T;
    failure: (l: E) => T;
    success: (r: D) => T;
}

export default class RemoteData<E, D> implements Monad<D>, Functor<D>, Eq<RemoteData<E, D>> {
    of = this.unit;
    chain = this.bind;
    lift = this.fmap;
    map = this.fmap;

    static notAsked<E, D>() {
        return new RemoteData<E, D>(RemoteDataType.NotAsked);
    }

    static loading<E, D>() {
        return new RemoteData<E, D>(RemoteDataType.Loading);
    }

    static refreshing<E, D>(interimData: D) {
        return new RemoteData<E, D>(RemoteDataType.Refreshing, undefined, interimData);
    }

    static failure<E, D>(error: E) {
        return new RemoteData<E, D>(RemoteDataType.Failure, error);
    }

    static success<E, D>(data: D) {
        return new RemoteData<E, D>(RemoteDataType.Success, undefined, data);
    }

    constructor(private type: RemoteDataType, private error?: E, private data?: D) {}

    unit<T>(t: T) {
        return RemoteData.success<E, T>(t);
    }

    bind<T>(f: (d: D) => RemoteData<E, T>) {
        switch (this.type) {
            case RemoteDataType.NotAsked:
                return RemoteData.notAsked<E, T>();
            case RemoteDataType.Loading:
                return RemoteData.loading<E, T>();
            case RemoteDataType.Refreshing:
                return f(this.data as D);
            case RemoteDataType.Failure:
                return RemoteData.failure<E, T>(this.error as E);
            case RemoteDataType.Success:
            default:
                return f(this.data as D);
        }
    }

    fmap<T>(f: (d: D) => T) {
        return this.bind(v => this.unit<T>(f(v)));
    }

    caseOf<T>(pattern: RemoteDataPatterns<E, D, T>) {
        switch (this.type) {
            case RemoteDataType.NotAsked:
                return pattern.notAsked();
            case RemoteDataType.Loading:
                return pattern.loading();
            case RemoteDataType.Refreshing:
                return pattern.refreshing(this.data as D);
            case RemoteDataType.Failure:
                return pattern.failure(this.error as E);
            case RemoteDataType.Success:
            default:
                return pattern.success(this.data as D);
        }
    }

    equals(other: RemoteData<E, D>) {
        if (other.type !== this.type) {
            return false;
        }

        switch (this.type) {
            case RemoteDataType.NotAsked:
            case RemoteDataType.Loading:
                return true;
            case RemoteDataType.Refreshing:
                return eq(this.data, other.data);
            case RemoteDataType.Failure:
                return eq(this.error, other.error);
            case RemoteDataType.Success:
            default:
                return eq(this.data, other.data);
        }
    }
}

export type UnsafeRemoteData<E, D> = {
    data?: D,
    error?: E,
    loading: boolean,
    refreshing: boolean,
};

// NOTE-jt-170606 sometimes this shape is more desireable than the RemoteData union type
export function toUnsafe<E, D>(remoteData: RemoteData<E, D>): UnsafeRemoteData<E, D> {
    return remoteData.caseOf({
        notAsked: () => ({ loading: false, refreshing: false }),
        loading: () => ({ loading: true, refreshing: false }),
        refreshing: (prev) => ({ data: prev, loading: true, refreshing: true }),
        failure: (error) => ({ error, loading: false, refreshing: false }),
        success: (data) => ({ data, loading: false, refreshing: false }),
    });
}
