import CurareMixRecipe from "./recipe/curare-mix-recipe.js";
import ShapedRecipe from "./recipe/shaped-recipe.js";
import ShapelessRecipe from "./recipe/shapeless-recipe.js";
export default class RecipeRegistry {
    static registerRecipeClass(type, clazz) {
        this.recipeMap[type] = clazz;
    }
    static async registerJsonFile(path) {
        return fetch(path).then(r => r.json()).then((j) => {
            this.displayNames[j["id"]] = j["displayName"];
            Object.entries(j["items"]).forEach(([key, value]) => this.items[key] = value);
            Object.entries(j["recipes"]).forEach(([key, value]) => this.recipes[key] = new this.recipeMap[value["type"]](value["data"]));
        });
    }
    static getItemById(id) {
        return this.items[id];
    }
    static getAllRecipes() {
        return Object.values(this.recipes);
    }
    static getAllItems() {
        return this.getAllItemIds().map((key) => this.items[key]);
    }
    static getAllItemIds() {
        return Object.keys(this.items).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
    }
    static getAddonDisplayName(id) {
        return this.displayNames[id];
    }
    static getRecipesByIngredients(id) {
        return Object.values(this.recipes).filter(r => r.ingredients().includes(id));
    }
    static getRecipesByResult(id) {
        return Object.values(this.recipes).filter(r => r.results().includes(id));
    }
}
RecipeRegistry.recipeMap = {
    "minecraft:shaped_crafting": ShapedRecipe,
    "minecraft:shapeless_crafting": ShapelessRecipe,
    "tropicraft:curare_mix": CurareMixRecipe,
};
RecipeRegistry.items = {};
RecipeRegistry.recipes = {};
RecipeRegistry.displayNames = {};
