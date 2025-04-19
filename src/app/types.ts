export type PageParams<T extends Record<string, string>> = {
  params: T;
  searchParams?: Record<string, string | string[] | undefined>;
};