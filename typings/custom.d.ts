declare module "*.svg" {
  const content: any;
  export default content;
}
declare namespace JSX {
  interface IntrinsicAttributes {
    store?: any;
  }
}