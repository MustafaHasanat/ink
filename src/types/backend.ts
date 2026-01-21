export type TGeneric<T> = T | null;

export type ListResponse<T> = {
  data: T[];
  status: TGeneric<boolean>;
  error?: TGeneric<string>;
};

export type ListPaginatedResponse<T> = {
  count: number;
  next: TGeneric<number>;
  previous: TGeneric<number>;
  status: TGeneric<boolean>;
  error?: TGeneric<string>;
  data?: T[];
};

export type ItemResponse<T> = {
  data: TGeneric<T>;
  status: TGeneric<boolean>;
  error?: TGeneric<string>;
};

export type PaginationParams = {
  page_size?: number;
  page?: number;
  enabled?: boolean;
};

export type AxiosContentType =
  | "multipart/form-data"
  | "application/json"
  | "application/octet-stream"
  | "application/x-www-form-urlencoded"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export type AxiosAcceptType = "application/pdf";

export type AxiosResponseType = "blob";

export type AxiosWrapperType<T> = {
  data: T;
};
