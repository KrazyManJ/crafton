import RecipeRegistry from "./src/recipe-registry.js"
import Renderer from "./src/renderer.js"


async function LoadPage(){
	await RecipeRegistry.registerJsonFile("./recipes/minecraft.json")
	await RecipeRegistry.registerJsonFile("./recipes/tropicraft_v1_5_2.json").then(() => {
		["minecraft","tropicraft"].forEach(cat => {

			const ctr = Renderer.renderEmptyContainer("@"+cat)
			document.body.appendChild(ctr.elem)
			
			const items = document.createElement("div")
			items.style.display = "flex"
			items.style.flexWrap = "wrap"
			items.style.justifyContent = "center"
			ctr.container.appendChild(items)
			
			RecipeRegistry.getAllItemIds().filter(v => v.startsWith(cat)).forEach(r => 
				items.appendChild(Renderer.renderItemStack(r))
				)
			})
		RecipeRegistry.getAllRecipes().forEach(r => document.body.appendChild(r.draw()))
	})
}

LoadPage()