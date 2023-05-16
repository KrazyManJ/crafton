from file_listener import FileListener
import os
from item_creator import createItemsByID
from recipe_creator import Recipe
import sys
import json

null = None

RECIPES = {
    "tropicraft": [
        Recipe.shaped("tropicraft:bamboo_stick",4,"tropicraft:bamboo_chute",None,None,"tropicraft:bamboo_chute",None,None,None,None,None),
        Recipe.shaped("tropicraft:bamboo_mug",1,
            "tropicraft:bamboo_chute",
            null,
            "tropicraft:bamboo_chute",
            
            "tropicraft:bamboo_chute",
            null,
            "tropicraft:bamboo_chute",
            
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute"
        ),
        Recipe.shaped("tropicraft:chair_green",1,
            "tropicraft:bamboo_stick",
            "minecraft:lime_wool",
            "tropicraft:bamboo_stick",

            "tropicraft:bamboo_stick",
            "minecraft:lime_wool",
            "tropicraft:bamboo_stick",

            "tropicraft:bamboo_stick",
            "minecraft:lime_wool",
            "tropicraft:bamboo_stick"
        ),
        Recipe.shaped("tropicraft:umbrella_green",1,
            "minecraft:lime_wool",
            "minecraft:lime_wool",
            "minecraft:lime_wool",
            
            null,
            "tropicraft:bamboo_stick",
            null,

            null,
            "tropicraft:bamboo_stick",
            null
        ),
        Recipe.shaped("tropicraft:enc_tropica",1,
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute",
            "minecraft:book",
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute",
            "tropicraft:bamboo_chute"
        ),
        Recipe.curare("tropicraft:curare_confusion",
            "tropicraft:flower_7",
            "tropicraft:flower_8",
            "tropicraft:flower_9"
        ),
        Recipe.curare("tropicraft:curare_harm",
            "tropicraft:flower_7",
            "tropicraft:flower_7",
            "tropicraft:flower_7",
            "tropicraft:flower_7",
            "tropicraft:flower_7",
            "tropicraft:flower_7",
            "tropicraft:flower_8",
            "tropicraft:flower_9",
            "tropicraft:flower_2"
        ),
        Recipe.curare("tropicraft:curare_hunger",
            "tropicraft:flower_0",
            "tropicraft:flower_1",
            "tropicraft:flower_2"      
        ),
        Recipe.curare("tropicraft:curare_hunger",
            "tropicraft:flower_0",
            "tropicraft:flower_1",
            "tropicraft:flower_3"      
        ),
        Recipe.curare("tropicraft:curare_hunger",
            "tropicraft:flower_0",
            "tropicraft:flower_1",
            "tropicraft:flower_4"      
        ),
        Recipe.curare("tropicraft:curare_slow_down",
            "tropicraft:flower_7",
            "tropicraft:flower_1",
            "tropicraft:flower_2"      
        ),
        Recipe.curare("tropicraft:curare_poison",
            "tropicraft:flower_7",
            "tropicraft:flower_8",
            "tropicraft:flower_4",
            "tropicraft:flower_7"      
        ),
        Recipe.curare("tropicraft:curare_poison",
            "tropicraft:flower_7",
            "tropicraft:flower_9",
            "tropicraft:flower_4",
            "tropicraft:flower_7"      
        ),
        Recipe.curare("tropicraft:curare_weakness",
            "tropicraft:flower_1",
            "tropicraft:flower_3",
            "tropicraft:flower_4"      
        )
    ],
    "minecraft": []
}


MOD_INFO = {
    "tropicraft": {
        "filename": "tropicraft_v1_5_2.json",
        "displayName": "Tropicraft"
    },
    "minecraft": {
        "filename": "minecraft.json",
        "displayName": "Minecraft"
    }
}


def onchange():
    try:
        for key in MOD_INFO.keys():
            data = {
                "id": key,
                "displayName": MOD_INFO[key]["displayName"],
                "recipes": RECIPES[key],
                "items": createItemsByID(key)
            }
            final_path = os.path.join(__file__,os.pardir,os.pardir,MOD_INFO[key]["filename"])
            json.dump(data,open(final_path,"w"),indent=4)
    except:
        return

if __name__ == '__main__':
    onchange()
    FileListener(os.path.join(__file__,os.pardir),onchange).start()

