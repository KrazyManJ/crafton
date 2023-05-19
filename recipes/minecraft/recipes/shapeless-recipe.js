import Renderer from "../../../src/renderer.js";
import { createEl } from "../../../src/utils.js";
export default class ShapelessRecipe {
    constructor(json) {
        this.result = json["result"];
        this.matrix = json["matrix"];
    }
    draw() {
        const containerEl = Renderer.renderEmptyContainer("Shapeless Crafting");
        const gridSize = Math.max(2, Math.ceil(Math.sqrt(this.matrix.length)));
        const empty = [];
        for (let i = 0; i < Math.pow(gridSize, 2) - this.matrix.length; i++)
            empty.push(Renderer.renderEmptySlot());
        createEl("div", {
            parent: containerEl.container,
            css: {
                "display": "grid",
                "grid-template-columns": `repeat(${gridSize}, 1fr)`
            },
            children: [
                ...this.matrix.map(i => Renderer.renderItemStack(i)),
                ...empty
            ]
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
