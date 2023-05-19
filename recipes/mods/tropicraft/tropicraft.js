import { createItemRenderSides } from "../../../src/utils.js";
const Tropicraft = {
    modulePath: new URL(import.meta.url).pathname,
    stylePath: "tropicraft.css",
    recipeMap: {},
    itemRendering: {
        "tropicraft:roots": {
            preserve3d: true,
            callback: (item) => createItemRenderSides(item, {
                "top-side": "top",
                "right-side": "right",
                "left-side": "left",
            }, "top-side", "right-side", "left-side")
        }
    }
};
export default Tropicraft;
