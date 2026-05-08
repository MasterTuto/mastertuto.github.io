export enum ScrollDirection {
  DOWN,
  UP
}

export interface ScrollStateChange {
  amount: number;
  direction: ScrollDirection;
  controls: string;
}