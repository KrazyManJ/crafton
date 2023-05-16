import RecipeRegistry, { Recipe, ItemStack, Item } from "../recipe-registry.js"
import Renderer from "../renderer.js"
import { createEl } from "../utils.js"

declare type MatrixRow = [string | undefined, string | undefined, string | undefined]


export default class ShapedRecipe implements Recipe {
	private readonly result: ItemStack
	private readonly matrix: [MatrixRow,MatrixRow,MatrixRow]

	constructor(json: object){
		this.result = json["result"]
		this.matrix = json["matrix"]
	}

	draw(): HTMLElement {
		const containerEl = Renderer.renderEmptyContainer("Shaped Crafting");

		createEl("div",{
			parent: containerEl.container,
			css: {
				"display": "grid",
				"grid-template-columns": "repeat(3, 1fr)"
			},
			children: this.matrix.flat().map(i => i ? Renderer.renderItemStack(i) : Renderer.renderEmptySlot())
		})

		createEl("img",{
            attribs: { src: "./assets/arrow.png" },
            css: { height: "var(--def-slot-size)" },
            parent: containerEl.container
        })

        containerEl.container.appendChild(Renderer.renderItemStack(this.result.id,this.result.amount,100))

		return containerEl.elem
	}
	
	ingredients() {
		return this.matrix.flat()
	}
	results() {
		return [this.result.id]
	}
}