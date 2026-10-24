export type Producer<T> = () => T;

export type DeepRecord = {
  [k: string]: DeepRecord | string;
};
