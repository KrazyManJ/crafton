import CurareMixRecipe from "./recipe/curare-mix-recipe.js"
import ShapedRecipe from "./recipe/shaped-recipe.js"
import ShapelessRecipe from "./recipe/shapeless-recipe.js"


export interface Recipe {
    draw(): HTMLElement
	ingredients(): string[]
	results(): string[]
}
export interface RecipeSerializer {
    new(json: object): Recipe
}

interface BlocktextureInfo {
    top: string
    right: string
    left: string
    lock?: string
}

export interface Item {
    name: string,
    img: string | BlocktextureInfo,
    lore?: string,
    type: "item" | "block" | "slab" | "stairs" | "plate" | "chest"
}
export interface ItemStack {
    id: string,
    amount: number
}
export interface NonSerialized {
    type: string,
    data: object
}

export default class RecipeRegistry {

    private static readonly recipeMap: Record<string, RecipeSerializer> = {
        "minecraft:shaped_crafting": ShapedRecipe,
        "minecraft:shapeless_crafting": ShapelessRecipe,
        "tropicraft:curare_mix": CurareMixRecipe,
    }

    private static readonly items: Record<string,Item> = {}
    private static readonly recipes: Record<string,Recipe> = {}
    private static readonly displayNames: Record<string,string> = {}

    static registerRecipeClass(type: string, clazz: RecipeSerializer) {
        this.recipeMap[type] = clazz
    }

    static async registerJsonFile(path: string){
        return fetch(path).then(r => r.json()).then((j: object) => {
            this.displayNames[j["id"]] = j["displayName"] 
            Object.entries(j["items"]).forEach(([key, value]: [string, Item]) => this.items[key] = value);
            Object.entries(j["recipes"]).forEach(([key, value]:[string, NonSerialized]) => 
                this.recipes[key] = new this.recipeMap[value["type"]](value["data"])
            )
        })
    }

    static getItemById(id: string): Item {
        return this.items[id]
    }

    static getAllRecipes(): Recipe[] {
        return Object.values(this.recipes)
    }

    static getAllItems(): Item[] {
        return this.getAllItemIds().map((key) => this.items[key])
    }

    static getAllItemIds(): string[] {
        return Object.keys(this.items).sort((a,b) => a.localeCompare(b,'en',{numeric:true}))
    }

    static getAddonDisplayName(id: string) {
        return this.displayNames[id]
    }

    static getRecipesByIngredients(id: string){
        return Object.values(this.recipes).filter(r => r.ingredients().includes(id))
    }

    static getRecipesByUsage(id: string){
        return Object.values(this.recipes).filter(r => r.results().includes(id))
    }
}