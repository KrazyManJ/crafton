import RecipeRegistry from "./recipe-registry.js";
import { createEl } from "./utils.js";
import ToolTip from "./tooltip.js";
export default class Renderer {
    static registerItemRenderer(id, renderer) {
        this.itemRenderers[id] = renderer;
    }
    static renderItemStack(id, options) {
        if (!RecipeRegistry.getAllItemIds().includes(id))
            throw new Error("This was not found");
        const item = RecipeRegistry.getItemById(id);
        const elem = document.createElement("div");
        elem.onmouseenter = () => ToolTip.show(item, id, RecipeRegistry.getAddonDisplayName(id.split(":")[0]));
        elem.onmouseleave = () => ToolTip.hide();
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
Renderer.itemRenderers = {};
