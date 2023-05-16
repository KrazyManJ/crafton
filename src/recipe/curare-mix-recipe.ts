import RecipeRegistry, { Recipe, Item } from "../recipe-registry.js"
import Renderer from "../renderer.js"
import { createEl } from "../utils.js"

export default class CurareMixRecipe implements Recipe {

    private readonly resultId: string
    private readonly ingredientsId: string[]

    constructor(json: object){
        this.resultId = json["result"]
        this.ingredientsId = json["ingredients"]
    }

    draw() {
        const containerEl = Renderer.renderEmptyContainer("Curare Mix");

        createEl("div",{
            css: { display: "flex" },
            children: this.ingredientsId.map(id => Renderer.renderItemStack(id)),
            parent: containerEl.container
        })

        createEl("img",{
            attribs: { src: "./assets/arrow.png" },
            css: { height: "var(--def-slot-size)" },
            parent: containerEl.container
        })
        containerEl.container.appendChild(Renderer.renderItemStack(this.resultId,1,100))
        
        return containerEl.elem
    }
    
	ingredients(): string[] {
		return this.ingredientsId
	}
	results(): string[] {
		return [this.resultId]
	}
}