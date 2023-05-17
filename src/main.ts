import RecipeRegistry from "./recipe-registry.js"
import Renderer from "./renderer.js"
import { createEl } from "./utils.js"


async function LoadPage(){
	await RecipeRegistry.registerJsonFile("./recipes/minecraft.json")
	await RecipeRegistry.registerJsonFile("./recipes/tropicraft_v1_5_2.json").then(() => {
		// ["minecraft","tropicraft"].forEach(cat => {

		// 	const ctr = Renderer.renderEmptyContainer("@"+cat)
		// 	document.body.appendChild(ctr.elem)
			
		// 	createEl("div",{
		// 		css: {
		// 			"display": "flex",
		// 			"flex-wrap": "wrap",
		// 			"justify-content": "center"
		// 		},
		// 		parent: ctr.container,
		// 		children: RecipeRegistry.getAllItemIds()
		// 			.filter(id => id.startsWith(cat))
		// 			.map(id => Renderer.renderItemStack(id))
		// 	})
		// })

		const unused = Renderer.renderEmptyContainer("#Unused#")
		document.body.appendChild(unused.elem)
		createEl("div",{
			css: {
				"display": "flex",
				"flex-wrap": "wrap",
				"justify-content": "center"
			},
			parent: unused.container,
			children: RecipeRegistry.getAllItemIds()
				.filter(id => RecipeRegistry.getRecipesByResult(id).length == 0)
				.map(id => Renderer.renderItemStack(id))
		})

		RecipeRegistry.getAllRecipes().forEach(r => document.body.appendChild(r.draw()))
	})
}

LoadPage()