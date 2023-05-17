import Renderer from "../renderer.js";
import { createEl } from "../utils.js";
export default class CurareMixRecipe {
    constructor(json) {
        this.resultId = json["result"];
        this.ingredientsId = json["ingredients"];
    }
    draw() {
        const containerEl = Renderer.renderEmptyContainer("Curare Mix");
        createEl("div", {
            css: { display: "flex" },
            children: this.ingredientsId.map(id => Renderer.renderItemStack(id)),
            parent: containerEl.container
        });
        containerEl.container.append(Renderer.renderArrow());
        containerEl.container.appendChild(Renderer.renderItemStack(this.resultId, {
            amount: 1,
            size: 100
        }));
        return containerEl.elem;
    }
    ingredients() {
        return this.ingredientsId;
    }
    results() {
        return [this.resultId];
    }
}
