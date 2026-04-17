declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "atropos/css";

interface ImportMetaEnv {
  readonly VITE_GOOGLE_NEWS_ENDPOINT?: string;
  readonly VITE_GOOGLE_NEWS_QUERY?: string;
  readonly VITE_GOOGLE_NEWS_LIMIT?: string;
  readonly VITE_HN_LIMIT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.webp" {
    const value: any
    export default value
  }
  