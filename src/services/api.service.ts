import { IRequestOptions } from "@/interfaces/api.interface";

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Generic request handler
  private async request<T>(config: IRequestOptions): Promise<T> {
    try {
      const { endpoint, method, body, options, token } = config;
      const headers = this.prepareAuthHeaders(token);
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers: {
          ...headers,
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        cache: options?.cache,
        next: {
          revalidate: options?.revalidate,
          tags: options?.tags,
        },
      });

      return response?.json() as Promise<T>;
    } catch (error) {
      throw error;
    }
  }

  // GET request
  public get<T>(config: Omit<IRequestOptions, "method">): Promise<T> {
    const { endpoint, params, options, token } = config;

    const url = params
      ? `${endpoint}?${new URLSearchParams(params as any)}`
      : endpoint;

    return this.request<T>({
      endpoint: url,
      method: "GET",
      options,
      token,
    });
  }

  // POST request
  public post<T>(config: Omit<IRequestOptions, "method">): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  // PUT request
  public put<T>(config: Omit<IRequestOptions, "method">): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  // PATCH request
  public patch<T>(config: Omit<IRequestOptions, "method">): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  // DELETE request
  public delete<T>(config: Omit<IRequestOptions, "method">): Promise<T> {
    const { params, endpoint } = config;

    const url = params
      ? `${endpoint}?${new URLSearchParams(params as any)}`
      : endpoint;
    return this.request<T>({
      ...config,
      endpoint: url,
      params,
      method: "DELETE",
    });
  }

  public prepareAuthHeaders(token?: string): object {
    if (token) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else
      return {
        "Content-Type": "application/json",
      };
  }
}

export const apiService = new ApiService(
  process.env.NEXT_PUBLIC_API_URL as string
);
