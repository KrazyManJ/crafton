import RecipeRegistry, { Item } from "./recipe-registry.js"
import { minecraftColorsToHTML } from "./utils.js"

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

    static renderItemStack(id: string, amount = 1, size: number = undefined): HTMLElement {
        if (!RecipeRegistry.getAllItemIds().includes(id)) throw new Error("This was not found")
        const item = RecipeRegistry.getItemById(id)
        const elem = document.createElement("div")
        elem.onmouseenter = () => this.itemMouseOver(item,id,RecipeRegistry.getAddonDisplayName(id.split(":")[0]))
        elem.onmouseleave = () => this.itemMouseLeave()
        elem.className = "mc-item-slot"
		if (size) elem.setAttribute("style","--slot-size: "+size+"px")
        if (amount > 1 && amount <= 64) elem.dataset["amount"] = Math.round(amount).toString()


        const BLOCK_MAP = {
            "top-side": "top",
            "right-side": "right",
            "left-side": "left",
            "mid-hor": "top",
            "mid-vert": "left",
            "lock-left": "lock",
            "lock-right": "lock",
            "lock-top": "lock"
        }

		if (["block","slab","stairs","plate","chest"].includes(item.type)){
			elem.classList.add(item.type,"model");
			const wrapper = elem.appendChild(document.createElement("div"))
			wrapper.className = "block-wrapper";
            const sides = ["top-side","right-side","left-side"]
            if (item.type === "stairs") sides.push("mid-hor","mid-vert")
            else if (item.type === "chest") sides.push("lock-left","lock-right","lock-top")
			sides.forEach(cls => {
				const img = document.createElement("img")
				img.className = cls
				img.src = "data:image/png;base64,"+(typeof item.img === "object" ? item.img[BLOCK_MAP[cls]] : item.img)
				wrapper.appendChild(img)
			});
		}
		else if (item.type === "item") {
			const itemImg = document.createElement("img")
			itemImg.src = "data:image/png;base64,"+item.img
			elem.appendChild(itemImg)
		}
        
		
		return elem
    }

    static renderEmptyContainer(title: string) {
        const elem = document.createElement("div")
        elem.className = "mc-inv-border"
        elem.dataset["title"] = title
        const innerCtr = document.createElement("div")
        innerCtr.className = "mc-inv-container"
        elem.appendChild(innerCtr)
        return { elem: elem, container: innerCtr }
    }

	static renderEmptySlot(size: number = undefined){
		const elem = document.createElement("div")
		elem.className = "mc-item-slot"
		if (size) elem.setAttribute("style","--slot-size: "+size+"px")
		return elem
	}
}