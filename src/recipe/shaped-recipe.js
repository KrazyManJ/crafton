import Renderer from "../renderer.js";
import { createEl } from "../utils.js";
export default class ShapedRecipe {
    constructor(json) {
        this.result = json["result"];
        this.matrix = json["matrix"];
    }
    draw() {
        const containerEl = Renderer.renderEmptyContainer("Shaped Crafting");
        createEl("div", {
            parent: containerEl.container,
            css: {
                "display": "grid",
                "grid-template-columns": "repeat(3, 1fr)"
            },
            children: this.matrix.flat().map(i => i ? Renderer.renderItemStack(i) : Renderer.renderEmptySlot())
        });
        containerEl.container.append(Renderer.renderArrow());
        containerEl.container.appendChild(Renderer.renderItemStack(this.result.id, {
            amount: this.result.amount,
            size: 100
        }));
        return containerEl.elem;
    }
    ingredients() {
        return this.matrix.flat();
    }
    results() {
        return [this.result.id];
    }
}
