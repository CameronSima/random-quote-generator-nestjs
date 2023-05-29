export interface Quote {
  quote_id: number;
  quote: string;
  character: string;
}

export type Filter<T> = (quotes: T[]) => T[];
