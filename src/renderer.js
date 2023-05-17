var _a;
import RecipeRegistry from "./recipe-registry.js";
import { createEl, minecraftColorsToHTML } from "./utils.js";
import * as vanilla_renderer from "./item-rendering/vanilla-renderer.js";
export default class Renderer {
    static itemMouseOver(item, id, categoryName) {
        this.TOOLTIP.hidden = false;
        this.TOOLTIP.querySelector("div").innerHTML = minecraftColorsToHTML(item.name);
        this.TOOLTIP.querySelector("p").innerHTML = minecraftColorsToHTML(item.lore ?? "");
        this.TOOLTIP.querySelector("p").innerHTML += ((item.lore ?? "").length > 0 ? "\n" : "") + minecraftColorsToHTML("&9&o@" + categoryName + "\n&8" + id);
    }
    static itemMouseLeave() {
        this.TOOLTIP.hidden = true;
    }
    static registerItemRenderer(id, renderer) {
        this.itemRenderers[id] = renderer;
    }
    static renderItemStack(id, options) {
        if (!RecipeRegistry.getAllItemIds().includes(id))
            throw new Error("This was not found");
        const item = RecipeRegistry.getItemById(id);
        const elem = document.createElement("div");
        elem.onmouseenter = () => this.itemMouseOver(item, id, RecipeRegistry.getAddonDisplayName(id.split(":")[0]));
        elem.onmouseleave = () => this.itemMouseLeave();
        elem.className = "mc-item-slot";
        if (options) {
            if (options.size)
                elem.setAttribute("style", "--slot-size: " + options.size + "px");
            if (options.amount) {
                if (options.amount > 1 && options.amount <= 64)
                    elem.dataset["amount"] = Math.round(options.amount).toString();
            }
        }
        if (!Object.keys(this.itemRenderers).includes(item.type)) {
            console.warn(`Renderer not found for type "${item.type}". Skipped rendering!`);
            return elem;
        }
        const renderer = this.itemRenderers[item.type];
        const appenders = renderer.callback(item);
        if (renderer.preserve3d) {
            elem.classList.add(item.type, "model");
            createEl("div", { cls: "block-wrapper", parent: elem }).append(...(Array.isArray(appenders) ? appenders : [appenders]));
        }
        else
            elem.append(...(Array.isArray(appenders) ? appenders : [appenders]));
        return elem;
    }
    static renderEmptyContainer(title) {
        const ctr = createEl("div", {
            cls: "mc-inv-container",
        });
        const elem = createEl("div", {
            cls: "mc-inv-border",
            attribs: {
                "data-title": title
            },
            children: [
                ctr
            ]
        });
        return { elem: elem, container: ctr };
    }
    static renderEmptySlot(size = undefined) {
        return createEl("div", {
            cls: "mc-item-slot",
            attribs: size ? { "--slot-size": size + "px" } : {}
        });
    }
    static renderArrow() {
        const canvas = createEl("canvas", {
            attribs: { width: "23", height: "23" },
            css: { height: "var(--def-slot-size)" }
        });
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#8B8B8B";
        ctx.fillRect(0, 10, canvas.width - 1, 3);
        for (let i = 0; i < 8; i++)
            ctx.fillRect(canvas.width - 1 - i, 11 - i, 1, 1 + i * 2);
        return canvas;
    }
}
_a = Renderer;
Renderer.TOOLTIP = document.getElementById("tooltip");
(() => {
    window.onmousemove = (ev) => {
        if (_a.TOOLTIP.hidden)
            return;
        const rect = _a.TOOLTIP.getBoundingClientRect();
        _a.TOOLTIP.style.transform = `translate(
                ${Math.min(ev.x, window.innerWidth - rect.width - 50)}px,
                ${Math.max(ev.y - rect.height, 20)}px
            )`;
    };
})();
/* RENDERING */
Renderer.itemRenderers = {
    "item": vanilla_renderer.ITEM,
    "block": vanilla_renderer.BLOCK_LIKE_ITEM,
    "slab": vanilla_renderer.BLOCK_LIKE_ITEM,
    "stairs": vanilla_renderer.STAIRS,
    "plate": vanilla_renderer.BLOCK_LIKE_ITEM,
    "chest": vanilla_renderer.CHEST
};
