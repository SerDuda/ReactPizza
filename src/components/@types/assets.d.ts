// теперь импорт svg и png будет корректно работать в ts

declare module "*.svg" {
    const content: any;
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}
// + добавили scss ибо тоже ругался на импорт.
declare module "*.scss" {
    const content: any;
    export default content;
}