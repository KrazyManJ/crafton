import RecipeRegistry from "./recipe-registry.js";
import Renderer from "./renderer.js";
import { createEl } from "./utils.js";
import Tropicraft from "../recipes/mods/tropicraft/tropicraft.js";
import Minecraft from "../recipes/minecraft/minecraft.js";
(async () => {
    Promise.all([
        //CORE
        Minecraft,
        //MODS
        Tropicraft
    ].map(ext => RecipeRegistry.registerCraftonExtension(ext))).then(() => {
        const ctr = Renderer.renderEmptyContainer("All Items");
        document.body.appendChild(ctr.elem);
        createEl("div", {
            css: {
                "display": "grid",
                "grid-template-columns": "repeat(9, 1fr)"
            },
            parent: ctr.container,
            children: RecipeRegistry.getAllItemIds().map(id => Renderer.renderItemStack(id))
        });
        RecipeRegistry.getAllRecipes().forEach(r => document.body.appendChild(r.draw()));
    });
})();
