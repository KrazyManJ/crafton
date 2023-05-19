import { Item } from "./recipe-registry.js"
import { minecraftColorsToHTML } from "./utils.js"

export default class ToolTip {

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

    public static show(item: Item, id: string, categoryName: string){
        this.TOOLTIP.hidden = false;
        this.TOOLTIP.querySelector("div").innerHTML = minecraftColorsToHTML(item.name)
        this.TOOLTIP.querySelector("p").innerHTML = minecraftColorsToHTML(item.lore ?? "")
        this.TOOLTIP.querySelector("p").innerHTML += ((item.lore ?? "").length > 0 ? "\n" : "") + minecraftColorsToHTML("&9&o"+categoryName+"\n&8"+id)
    }

    public static hide(){
        this.TOOLTIP.hidden = true;
    }
}