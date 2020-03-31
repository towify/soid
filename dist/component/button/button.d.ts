import { TextView } from "../text_view";
export declare class Button extends TextView {
    constructor();
    beforeAttached(): Promise<any>;
    setRadius(radius: number): this;
}
