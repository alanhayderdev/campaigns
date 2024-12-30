export interface FetchOptions {
  headers?: HeadersInit;
  cache?: "force-cache" | "no-store";
  revalidate?: false | 0 | number;
  tags?: string[];
}

export interface IRequestOptions {
  endpoint: string;
  method?: string;
  body?: object;
  params?: object;
  options?: FetchOptions;
  token?: string;
}

export type RequestPayloadConfig = Omit<IRequestOptions, "endpoint" | "method">;
export type RequestConfig = Omit<
  IRequestOptions,
  "endpoint" | "body" | "method"
>;
