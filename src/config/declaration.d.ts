declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "atropos/css";

declare module "*.webp" {
    const value: any
    export default value
  }
  