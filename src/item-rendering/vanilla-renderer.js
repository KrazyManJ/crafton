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
};
const sideGen = (item, ...sides) => sides.map(side => createEl("img", {
    cls: side,
    attribs: {
        src: "data:image/png;base64," + (typeof item.img === "object" ? item.img[BLOCK_MAP[side]] : item.img)
    }
}));
export const ITEM = {
    preserve3d: false,
    callback: (item) => createEl("img", { attribs: { "src": "data:image/png;base64," + item.img } })
};
export const BLOCK_LIKE_ITEM = {
    preserve3d: true,
    callback: (item) => sideGen(item, "top-side", "right-side", "left-side")
};
export const STAIRS = {
    preserve3d: true,
    callback: (item) => sideGen(item, "top-side", "right-side", "left-side", "mid-hor", "mid-vert")
};
export const CHEST = {
    preserve3d: true,
    callback: (item) => sideGen(item, "top-side", "right-side", "left-side", "lock-left", "lock-right", "lock-top")
};
