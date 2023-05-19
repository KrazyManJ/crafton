import { createEl } from "./utils.js";
import Renderer from "./renderer.js";
export default class RecipeRegistry {
    static async registerCraftonExtension(extension) {
        const id = extension.modulePath
            .substring(extension.modulePath.lastIndexOf("/") + 1)
            .split(".")[0];
        const folder = extension.modulePath.substring(0, extension.modulePath.lastIndexOf("/"));
        if (extension.stylePath) {
            createEl("link", {
                attribs: {
                    id: id,
                    rel: "stylesheet",
                    type: "text/css",
                    href: folder + "/" + extension.stylePath + (extension.stylePath.endsWith(".css") ? "" : ".css"),
                    media: "all",
                },
                parent: document.head
            });
        }
        const json = extension.jsonPath ? folder + "/" + extension.jsonPath : folder + "/" + id + ".json";
        Object.entries(extension.recipeMap).forEach(([id, recipe]) => this.recipeMap[id] = recipe);
        if (extension.itemRendering) {
            Object.entries(extension.itemRendering).forEach(([id, render]) => Renderer.registerItemRenderer(id, render));
        }
        return fetch(json).then(r => r.json()).then((j) => {
            this.displayNames[j["id"]] = j["name"];
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
        return Object.keys(this.items);
        //.sort((a,b) => a.localeCompare(b,'en',{numeric:true}))
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
    static getRecipesByRecipeType(id) {
        return Object.values(this.recipes).filter(r => r instanceof this.recipeMap[id]);
    }
}
RecipeRegistry.recipeMap = {};
RecipeRegistry.items = {};
RecipeRegistry.recipes = {};
RecipeRegistry.displayNames = {};
