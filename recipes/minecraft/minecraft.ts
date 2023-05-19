import {CraftonExtension, Item} from "../../src/recipe-registry.js";
import {createEl, createItemRenderSides} from "../../src/utils.js";
import {ItemRenderer} from "../../src/renderer.js";
import ShapedRecipe from "./recipes/shaped-recipe.js";
import ShapelessRecipe from "./recipes/shapeless-recipe.js";

const BLOCK_MAP = {
    "top-side": "top",
    "right-side": "right",
    "left-side": "left",
    "mid-hor": "top",
    "mid-vert": "left",
    "lock-left": "lock",
    "lock-right": "lock",
    "lock-top": "lock"
}

export const ITEM: ItemRenderer = {
    preserve3d: false,
    callback: (item) => createEl("img", { attribs: { "src": "data:image/png;base64,"+item.img }})
}

export const BLOCK_LIKE_ITEM: ItemRenderer = {
    preserve3d: true,
    callback: (item) => createItemRenderSides(item, BLOCK_MAP,"top-side","right-side","left-side")
}

export const STAIRS: ItemRenderer = {
    preserve3d: true,
    callback: (item) => createItemRenderSides(item, BLOCK_MAP,"top-side","right-side","left-side","mid-hor","mid-vert")
}

export const CHEST: ItemRenderer = {
    preserve3d: true,
    callback: (item) => createItemRenderSides(item, BLOCK_MAP,"top-side","right-side","left-side","lock-left","lock-right","lock-top")
}

const Minecraft: CraftonExtension = {
    modulePath: new URL(import.meta.url).pathname,
    stylePath: "minecraft.css",
    recipeMap: {
        "minecraft:crafting_shaped": ShapedRecipe,
        "minecraft:crafting_shapeless": ShapelessRecipe
    },
    itemRendering: {
        "minecraft:item": ITEM,
        "minecraft:block": BLOCK_LIKE_ITEM,
        "minecraft:slab": BLOCK_LIKE_ITEM,
        "minecraft:stairs": STAIRS,
        "minecraft:plate": BLOCK_LIKE_ITEM,
        "minecraft:chest": CHEST,
        "minecraft:trapdoor": BLOCK_LIKE_ITEM
    }
}
export default Minecraft