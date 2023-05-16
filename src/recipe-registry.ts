import { RECIPE_MAP } from "./map.js"


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

    private static readonly items: Record<string,Item> = {}
    private static readonly recipes: Recipe[] = []
    private static readonly displayNames: Record<string,string> = {}

    static async registerJsonFile(path: string){
        return fetch(path).then(r => r.json()).then((j: object) => {
            this.displayNames[j["id"]] = j["displayName"] 
            Object.entries(j["items"]).forEach(([key,value]:[string,Item]) => this.items[key] = value);
            (j["recipes"] as NonSerialized[]).forEach(d => this.recipes.push(new RECIPE_MAP[d["type"]](d["data"])))
        })
    }

    static getItemById(id: string): Item {
        return this.items[id]
    }

    static getAllRecipes(): Recipe[] {
        return this.recipes
    }

    static getAllItems(): Item[] {
        return Object.keys(this.items).sort().map((key) => this.items[key])
    }

    static getAllItemIds(): string[] {
        return Object.keys(this.items).sort()
    }

    static getAddonDisplayName(id: string) {
        return this.displayNames[id]
    }

    static getRecipesByIngredients(id: string){
        return this.recipes.filter(r => r.ingredients().includes(id))
    }

    static getRecipesByUsage(id: string){
        return this.recipes.filter(r => r.results().includes(id))
    }
}