import RecipeRegistry, { Item } from "./recipe-registry.js"
import { createEl, minecraftColorsToHTML } from "./utils.js"
import * as vanilla_renderer from "./item-rendering/vanilla-renderer.js"


export interface ItemRenderer {
    preserve3d: boolean
    callback: (item: Item) => Node | Node[]
}

interface ItemRenderOptions {
    amount?: number
    size?: number
}

export default class Renderer {
    private static readonly TOOLTIP = document.getElementById("tooltip")

    static {
        window.onmousemove = (ev: MouseEvent) => {
            if (this.TOOLTIP.hidden) return
            const rect = this.TOOLTIP.getBoundingClientRect()
            this.TOOLTIP.style.transform = `translate(
                ${Math.min(ev.x,window.innerWidth-rect.width-50)}px,
                ${Math.max(ev.y-rect.height,20)}px
            )`
        }

    }

    private static itemMouseOver(item: Item, id: string, categoryName: string){
        this.TOOLTIP.hidden = false;
        this.TOOLTIP.querySelector("div").innerHTML = minecraftColorsToHTML(item.name)
        this.TOOLTIP.querySelector("p").innerHTML = minecraftColorsToHTML(item.lore ?? "")
        this.TOOLTIP.querySelector("p").innerHTML += ((item.lore ?? "").length > 0 ? "\n" : "") + minecraftColorsToHTML("&9&o@"+categoryName+"\n&8"+id)
    }

    private static itemMouseLeave(){
        this.TOOLTIP.hidden = true;
    }

    /* RENDERING */

    private static readonly itemRenderers: Record<string,ItemRenderer> = {
        "item": vanilla_renderer.ITEM,
        "block": vanilla_renderer.BLOCK_LIKE_ITEM,
        "slab": vanilla_renderer.BLOCK_LIKE_ITEM,
        "stairs": vanilla_renderer.STAIRS,
        "plate": vanilla_renderer.BLOCK_LIKE_ITEM,
        "chest": vanilla_renderer.CHEST
    }

    static registerItemRenderer(id: string, renderer: ItemRenderer){
        this.itemRenderers[id] = renderer
    }

    static renderItemStack(id: string, options?: ItemRenderOptions): HTMLElement {
        if (!RecipeRegistry.getAllItemIds().includes(id)) throw new Error("This was not found")
        const item = RecipeRegistry.getItemById(id)
        const elem = document.createElement("div")
        elem.onmouseenter = () => this.itemMouseOver(item,id,RecipeRegistry.getAddonDisplayName(id.split(":")[0]))
        elem.onmouseleave = () => this.itemMouseLeave()
        elem.className = "mc-item-slot"
        if (options) {
            if (options.size) elem.setAttribute("style","--slot-size: "+options.size+"px")
            if (options.amount){
                if (options.amount > 1 && options.amount <= 64) elem.dataset["amount"] = Math.round(options.amount).toString()
            }
        }
        

        if (!Object.keys(this.itemRenderers).includes(item.type)) {
            console.warn(`Renderer not found for type "${item.type}". Skipped rendering!`)
            return elem
        }

        const renderer = this.itemRenderers[item.type]
        const appenders = renderer.callback(item)

        if (renderer.preserve3d) {
            elem.classList.add(item.type,"model")
            
            createEl("div",{cls:"block-wrapper",parent:elem}).append(...(Array.isArray(appenders) ? appenders : [appenders]))
        }
        else elem.append(...(Array.isArray(appenders) ? appenders : [appenders]))
        return elem
    }

    static renderEmptyContainer(title: string) {
        const ctr = createEl("div",{
            cls: "mc-inv-container",
        })
        const elem = createEl("div", {
            cls: "mc-inv-border",
            attribs: {
                "data-title": title
            },
            children: [
                ctr
            ]
        })
        return { elem: elem, container: ctr }
    }

	static renderEmptySlot(size: number = undefined){
        return createEl("div",{
            cls: "mc-item-slot",
            attribs: size ? {"--slot-size": size+"px"} : {}
        })
	}
}