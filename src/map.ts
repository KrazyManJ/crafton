import { RecipeSerializer } from "./recipe-registry.js"
import CurareMixRecipe from "./recipe/curare-mix-recipe.js"
import ShapedRecipe from "./recipe/shaped-recipe.js"
import ShapelessRecipe from "./recipe/shapeless-recipe.js"



export const RECIPE_MAP: Record<string, RecipeSerializer> = {
	"minecraft:shaped_crafting": ShapedRecipe,
    "minecraft:shapeless_crafting": ShapelessRecipe,
    "tropicraft:curare_mix": CurareMixRecipe,
}