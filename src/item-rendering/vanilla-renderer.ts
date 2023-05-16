import { Item } from "../recipe-registry.js";
import { ItemRenderer } from "../renderer.js";
import { createEl } from "../utils.js";

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

const sideGen = (item:Item, ...sides: string[]): HTMLElement[] => sides.map(side => createEl("img",{
    cls: side,
    attribs: {
        src: "data:image/png;base64,"+(typeof item.img === "object" ? item.img[BLOCK_MAP[side]] : item.img)
    } 
}))

export const ITEM: ItemRenderer = {
    preserve3d: false,
    callback: (item) => createEl("img", { attribs: { "src": "data:image/png;base64,"+item.img }})
}

export const BLOCK_LIKE_ITEM: ItemRenderer = {
    preserve3d: true,
    callback: (item) => sideGen(item,"top-side","right-side","left-side")
}

export const STAIRS: ItemRenderer = {
    preserve3d: true,
    callback: (item) => sideGen(item,"top-side","right-side","left-side","mid-hor","mid-vert")
}

export const CHEST: ItemRenderer = {
    preserve3d: true,
    callback: (item) => sideGen(item,"top-side","right-side","left-side","lock-left","lock-right","lock-top")
}