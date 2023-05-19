import {createEl} from "./utils.js";
import Renderer, {ItemRenderer} from "./renderer.js";


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
    type: string
}
export interface ItemStack {
    id: string,
    amount: number
}
export interface NonSerialized {
    type: string,
    data: object
}

export interface CraftonExtension {
    /**
     * Use code below for relative pathing of all assets:
     * ```ts
     * modulePath: new URL(import.meta.url).pathname
     * ```
     */
    modulePath: string
    recipeMap: Record<string,RecipeSerializer>

    stylePath?: string
    jsonPath?: string
    itemRendering?: Record<string,ItemRenderer>
}


export default class RecipeRegistry {

    private static readonly recipeMap: Record<string, RecipeSerializer> = {}
    private static readonly items: Record<string,Item> = {}
    private static readonly recipes: Record<string,Recipe> = {}
    private static readonly displayNames: Record<string,string> = {}

    static async registerCraftonExtension(extension: CraftonExtension){
        const id = extension.modulePath
            .substring(extension.modulePath.lastIndexOf("/")+1)
            .split(".")[0]
        const folder = extension.modulePath.substring(0,extension.modulePath.lastIndexOf("/"))

        if (extension.stylePath){
            createEl("link", {
                attribs: {
                    id: id,
                    rel: "stylesheet",
                    type: "text/css",
                    href: folder+"/"+extension.stylePath+(extension.stylePath.endsWith(".css") ? "" : ".css"),
                    media: "all",
                },
                parent: document.head
            })
        }
        const json = extension.jsonPath ? folder+"/"+extension.jsonPath : folder+"/"+id+".json"
        Object.entries(extension.recipeMap).forEach(([id,recipe]) => this.recipeMap[id] = recipe)

        if (extension.itemRendering){
            Object.entries(extension.itemRendering).forEach(([id, render]) => Renderer.registerItemRenderer(id,render))
        }

        return fetch(json).then(r => r.json()).then((j: object) => {
            this.displayNames[j["id"]] = j["name"]
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
        return Object.keys(this.items)
            //.sort((a,b) => a.localeCompare(b,'en',{numeric:true}))
    }

    static getAddonDisplayName(id: string) {
        return this.displayNames[id]
    }

    static getRecipesByIngredients(id: string){
        return Object.values(this.recipes).filter(r => r.ingredients().includes(id))
    }

    static getRecipesByResult(id: string){
        return Object.values(this.recipes).filter(r => r.results().includes(id))
    }

    static getRecipesByRecipeType(id: string){
        return Object.values(this.recipes).filter(r => r instanceof this.recipeMap[id])
    }
}