from file_listener import FileListener
import os
from item_creator import createItemsByID
from recipe_creator import Recipe
import sys
import json

null = None

RECIPES = {
    "tropicraft": {
        "tropicraft:bamboo_stick": Recipe.shaped("tropicraft:bamboo_stick",4,"tropicraft:bamboo_chute",null,null,"tropicraft:bamboo_chute",null,null,null,null,null),
        "tropicraft:bamboo_mug": Recipe.shaped("tropicraft:bamboo_mug",1,"tropicraft:bamboo_chute",null,"tropicraft:bamboo_chute","tropicraft:bamboo_chute",null,"tropicraft:bamboo_chute","tropicraft:bamboo_chute","tropicraft:bamboo_chute","tropicraft:bamboo_chute"),
        "tropicraft:chair_blue": Recipe.shaped(f"tropicraft:chair_blue",1,"tropicraft:bamboo_stick","minecraft:light_blue_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:light_blue_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:light_blue_wool","tropicraft:bamboo_stick"),
        "tropicraft:umbrella_blue": Recipe.shaped("tropicraft:umbrella_blue",1,"minecraft:light_blue_wool","minecraft:light_blue_wool","minecraft:light_blue_wool",null,"tropicraft:bamboo_stick",null,null,"tropicraft:bamboo_stick",null),
        "tropicraft:chair_green": Recipe.shaped(f"tropicraft:chair_green",1,"tropicraft:bamboo_stick","minecraft:lime_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:lime_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:lime_wool","tropicraft:bamboo_stick"),
        "tropicraft:umbrella_green": Recipe.shaped("tropicraft:umbrella_green",1,"minecraft:lime_wool","minecraft:lime_wool","minecraft:lime_wool",null,"tropicraft:bamboo_stick",null,null,"tropicraft:bamboo_stick",null),
        "tropicraft:chair_purple": Recipe.shaped(f"tropicraft:chair_purple",1,"tropicraft:bamboo_stick","minecraft:purple_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:purple_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:purple_wool","tropicraft:bamboo_stick"),
        "tropicraft:umbrella_purple": Recipe.shaped("tropicraft:umbrella_purple",1,"minecraft:purple_wool","minecraft:purple_wool","minecraft:purple_wool",null,"tropicraft:bamboo_stick",null,null,"tropicraft:bamboo_stick",null),
        "tropicraft:chair_red": Recipe.shaped(f"tropicraft:chair_red",1,"tropicraft:bamboo_stick","minecraft:red_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:red_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:red_wool","tropicraft:bamboo_stick"),
        "tropicraft:umbrella_red": Recipe.shaped("tropicraft:umbrella_red",1,"minecraft:red_wool","minecraft:red_wool","minecraft:red_wool",null,"tropicraft:bamboo_stick",null,null,"tropicraft:bamboo_stick",null),
        "tropicraft:chair_yellow": Recipe.shaped(f"tropicraft:chair_yellow",1,"tropicraft:bamboo_stick","minecraft:yellow_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:yellow_wool","tropicraft:bamboo_stick","tropicraft:bamboo_stick","minecraft:yellow_wool","tropicraft:bamboo_stick"),
        "tropicraft:umbrella_yellow": Recipe.shaped("tropicraft:umbrella_yellow",1,"minecraft:yellow_wool","minecraft:yellow_wool","minecraft:yellow_wool", null,"tropicraft:bamboo_stick",null,null,"tropicraft:bamboo_stick",null),
        "tropicraft:enc_tropica": Recipe.shaped("tropicraft:enc_tropica",1,"tropicraft:bamboo_chute","tropicraft:bamboo_chute","tropicraft:bamboo_chute","tropicraft:bamboo_chute","minecraft:book","tropicraft:bamboo_chute","tropicraft:bamboo_chute","tropicraft:bamboo_chute","tropicraft:bamboo_chute"),
        "tropicraft:curare_confusion": Recipe.curare("tropicraft:curare_confusion","tropicraft:flower_7","tropicraft:flower_8","tropicraft:flower_9"),
        
        # CURARE
        
        "tropicraft:curare_harm": Recipe.curare("tropicraft:curare_harm","tropicraft:flower_7","tropicraft:flower_7","tropicraft:flower_7","tropicraft:flower_7","tropicraft:flower_7","tropicraft:flower_7","tropicraft:flower_8","tropicraft:flower_9","tropicraft:flower_2"),
        "tropicraft:curare_hunger_0": Recipe.curare("tropicraft:curare_hunger","tropicraft:flower_0","tropicraft:flower_1","tropicraft:flower_2"),
        "tropicraft:curare_hunger_1": Recipe.curare("tropicraft:curare_hunger","tropicraft:flower_0","tropicraft:flower_1","tropicraft:flower_3"),
        "tropicraft:curare_hunger_2": Recipe.curare("tropicraft:curare_hunger","tropicraft:flower_0","tropicraft:flower_1","tropicraft:flower_4"),
        "tropicraft:curare_slow_down": Recipe.curare("tropicraft:curare_slow_down","tropicraft:flower_7","tropicraft:flower_1","tropicraft:flower_2"),
        "tropicraft:curare_poison_0": Recipe.curare("tropicraft:curare_poison","tropicraft:flower_7","tropicraft:flower_8","tropicraft:flower_4","tropicraft:flower_7"),
        "tropicraft:curare_poison_1": Recipe.curare("tropicraft:curare_poison","tropicraft:flower_7","tropicraft:flower_9","tropicraft:flower_4","tropicraft:flower_7"),
        "tropicraft:curare_weakness": Recipe.curare("tropicraft:curare_weakness","tropicraft:flower_1","tropicraft:flower_3","tropicraft:flower_4"),
    },
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


def updateJSONs():
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
    updateJSONs()
    FileListener(os.path.join(__file__,os.pardir),updateJSONs).start()

