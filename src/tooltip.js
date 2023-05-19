var _a;
import { minecraftColorsToHTML } from "./utils.js";
export default class ToolTip {
    static show(item, id, categoryName) {
        this.TOOLTIP.hidden = false;
        this.TOOLTIP.querySelector("div").innerHTML = minecraftColorsToHTML(item.name);
        this.TOOLTIP.querySelector("p").innerHTML = minecraftColorsToHTML(item.lore ?? "");
        this.TOOLTIP.querySelector("p").innerHTML += ((item.lore ?? "").length > 0 ? "\n" : "") + minecraftColorsToHTML("&9&o" + categoryName + "\n&8" + id);
    }
    static hide() {
        this.TOOLTIP.hidden = true;
    }
}
_a = ToolTip;
ToolTip.TOOLTIP = document.getElementById("tooltip");
(() => {
    window.onmousemove = (ev) => {
        if (_a.TOOLTIP.hidden)
            return;
        const rect = _a.TOOLTIP.getBoundingClientRect();
        _a.TOOLTIP.style.transform = `translate(
                ${Math.min(ev.x, window.innerWidth - rect.width - 50)}px,
                ${Math.max(ev.y - rect.height, 20)}px
            )`;
    };
})();
