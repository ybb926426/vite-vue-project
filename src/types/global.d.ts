declare type Recordable<T extends any = any> = Record<string, T>;

declare interface Fn<T = any> {
  (...arg: T[]): T;
}

declare type Nullable<T> = T | null;