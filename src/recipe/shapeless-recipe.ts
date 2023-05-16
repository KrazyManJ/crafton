import RecipeRegistry, { Recipe, ItemStack, Item } from "../recipe-registry.js"
import Renderer from "../renderer.js"
import { createEl } from "../utils.js"

export default class ShapelessRecipe implements Recipe {
	private readonly result: ItemStack
	private readonly matrix: string[]

	constructor(json: object){
		this.result = json["result"]
		this.matrix = json["matrix"]
	}

	draw(): HTMLElement {
		const containerEl = Renderer.renderEmptyContainer("Shapeless Crafting");

		const gridSize = Math.max(2,Math.ceil(Math.sqrt(this.matrix.length)));
		const empty = []
		for (let i = 0; i < Math.pow(gridSize,2)-this.matrix.length; i++)
			empty.push(Renderer.renderEmptySlot())

		createEl("div",{
			parent: containerEl.container,
			css: {
				"display": "grid",
				"grid-template-columns": `repeat(${gridSize}, 1fr)`
			},
			children: [
				...this.matrix.map(i => Renderer.renderItemStack(i)),
				...empty
			]
		})

		createEl("img",{
            attribs: { src: "./assets/arrow.png" },
            css: { height: "var(--def-slot-size)" },
            parent: containerEl.container
        })
		
        containerEl.container.appendChild(Renderer.renderItemStack(this.result.id,this.result.amount,100))
		return containerEl.elem
	}
	
	ingredients(): string[] {
		return this.matrix.flat()
	}
	results(): string[] {
		return [this.result.id]
	}
}