declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }
  declare module "*.pdf";
  declare module 'react-scroll-to-bottom'