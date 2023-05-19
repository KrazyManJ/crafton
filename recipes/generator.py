import os
from os import listdir, pardir
import os.path as path
import json
from pathlib import Path
from base64 import b64encode

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer




class FileListener:
    def __init__(self, path, onchange) -> None:
        self.__observer = Observer()
        self.__observer.schedule(FileChangeHandler(onchange), path, recursive=True)

    def start(self):
        try:
            self.__observer.start()
            self.__observer.join()
        except KeyboardInterrupt:
            self.__observer.stop()


class FileChangeHandler(FileSystemEventHandler):

    def __init__(self, onchange) -> None:
        super().__init__()
        self.__onchange = onchange

    def on_any_event(self, event):
        if event.is_directory:
            return
        if event.event_type in ['created', 'deleted', 'moved']:
            self.__onchange()


MODSDATA = path.join(__file__, pardir, "modsdata")

def cutExt(pth:str):
    return Path(pth).stem

def imgToBase64(pth:str) -> str:
    return b64encode(open(pth,"rb").read()).decode("utf-8")

def list_files_with_extension(pth:str, extension:str):
    file_list = []
    for root, dirs, files in os.walk(pth):
        for file in files:
            if file.endswith(extension):
                file_list.append(os.path.join(root, file))
    return file_list

IDS_SORT = {
    "tropicraft": [
        "chunk",
        "azurite_ore",
        "eudialyte_ore",
        "manganese_ore",
        "shaka_ore",
        "zircon_ore",
        "azurite_block",
        "eudialyte_block",
        "manganese_block",
        "shaka_block",
        "zircon_block",
        "zirconium_block",
        "acai_vine",
        "anemone",
        "bromeliad",
        "canna",
        "commelina_diffusa",
        "crocosmia",
        "croton",
        "dracaena",
        "tropical_fern",
        "foliage",
        "magic_mushroom",
        "orange_anthurium",
        "orchid",
        "pathos",
        "red_anthurium",
        "purified_sand",
        "packed_purified_sand",
        "coral_sand",
        "foamy_sand",
        "volcanic_sand",
        "mineral_sand",
        "mud",
        "mud_with_pianguas",
        "bamboo_bundle",
        "thatch_bundle",
        "mahogany_planks",
        "palm_planks",
        "mahogany_log",
        "palm_log",
        "mohogany_wood",
        "palm_wood",
        "palm_stairs",
        "mahogany_stairs",
        "thatch_stairs",
        "thatch_stairs_fuzzy",
        "bamboo_stairs",
        "chunk_stairs",
        "coconut",
        "bamboo_slab",
        "thatch_slab",
        "chunk_slab",
        "palm_slab",
        "thatch_slab",
        "chunk_slab",
        "palm_slab",
        "mahogany_slab",
        "mahogany_leaves",
        "palm_leaves",
        "kapok_leaves",
        "fruit_leaves",
        "grapefruit_leaves",
        "lemon_leaves",
        "lime_leaves",
        "orange_leaves",
        "papaya_leaves",
        "grapefruit_sapling",
        "lemon_sapling",
        "lime_sapling",
        "orange_sapling",
        "papaya_sapling",
        "mahogany_sapling",
        "palm_sapling",
        "papaya_log",
        "papaya_wood",
        "red_mangrove_log",
        "red_mangrove_wood",
        "red_mangrove_roots",
        "light_mangrove_log",
        "light_mangrove_wood",
        "light_mangrove_roots",
        "black_mangrove_log",
        "black_mangrove_wood",
        "black_mangrove_roots",
        "red_mangrove_leaves",
        "tall_mangrove_leaves",
        "tea_mangrove_leaves",
        "black_mangrove_leaves",
        "red_mangrove_propagule",
        "tall_mangrove_propagule",
        "tea_mangrove_propagule",
        "black_mangrove_propagule",
        "stripped_mangrove_log",
        "stripped_mangrove_wood",
        "mangrove_planks",
        "mangrove_stairs",
        "mangrove_slab",
        "mangrove_fence",
        "mangrove_fence_gate",
        "mangrove_door",
        "mangrove_trapdoor",
        "reeds",
        "papaya",
        "bamboo_fence",
        "thatch_fence",
        "chunk_fence",
        "palm_fence",
        "mahogany_fence",
        "bamboo_fence_gate",
        "thatch_fence_gate",
        "chunk_fence_gate",
        "palm_fence_gate",
        "mahogany_fence_gate",
        "chunk_wall",
        "bamboo_door",
        "palm_door",
        "mahogany_door",
        "thatch_door",
        "bamboo_trapdoor",
        "palm_trapdoor",
        "mahogany_trapdoor",
        "thatch_trapdoor",
        "iris",
        "pineapple",
        "small_bongo_drum",
        "medium_bongo_drum",
        "large_bongo_drum",
        "bamboo_ladder",
        "bamboo_boardwalk",
        "palm_boardwalk",
        "mahogany_boardwalk",
        "thatch_boardwalk",
        "bamboo_chest",
        "sifter",
        "drink_mixer",
        "air_compressor",
        "tiki_torch",
        "bamboo_flower_pot",
        "golden_leather_fern",
        "azurite_gem",
        "eudialyte_gem",
        "zircon_gem",
        "shaka_ingot",
        "manganese_ingot",
        "zirconium_gem",
        "white_umbrella",
        "orange_umbrella",
        "magenta_umbrella",
        "light_blue_umbrella",
        "yellow_umbrella",
        "lime_umbrella",
        "pink_umbrella",
        "gray_umbrella",
        "light_gray_umbrella",
        "cyan_umbrella",
        "purple_umbrella",
        "blue_umbrella",
        "brown_umbrella",
        "green_umbrella",
        "red_umbrella",
        "black_umbrella",
        "white_chair",
        "orange_chair",
        "magenta_chair",
        "light_blue_chair",
        "yellow_chair",
        "lime_chair",
        "pink_chair",
        "gray_chair",
        "light_gray_chair",
        "cyan_chair",
        "purple_chair",
        "blue_chair",
        "brown_chair",
        "green_chair",
        "red_chair",
        "black_chair",
        "white_beach_float",
        "orange_beach_float",
        "magenta_beach_float",
        "light_blue_beach_float",
        "yellow_beach_float",
        "lime_beach_float",
        "pink_beach_float",
        "gray_beach_float",
        "light_gray_beach_float",
        "cyan_beach_float",
        "purple_beach_float",
        "blue_beach_float",
        "brown_beach_float",
        "green_beach_float",
        "red_beach_float",
        "black_beach_float",
        "bamboo_stick",
        "bamboo_spear",
        "solonox_shell",
        "frox_conch",
        "pab_shell",
        "rube_nautilus",
        "starfish",
        "turtle_shell",
        "lemon",
        "lime",
        "grapefruit",
        "orange",
        "pineapple_cubes",
        "coconut_chunk",
        "raw_coffee_bean",
        "roasted_coffee_bean",
        "coffee_berry",
        "bamboo_mug",
        "black_coffee",
        "coconut_water",
        "orangeade",
        "lemonade",
        "cocktail",
        "mai_tai",
        "caipirinha",
        "pina_colada",
        "limeade",
        "white_pearl",
        "black_pearl",
        "scale",
        "nigel_stache",
        "fresh_marlin",
        "seared_marlin",
        "raw_ray",
        "cooked_ray",
        "frog_leg",
        "cooked_frog_leg",
        "sea_urchin_roe",
        "toasted_nori",
        "raw_fish",
        "cooked_fish",
        "poison_frog_skin",
        "iguana_leather",
        "tropical_fertilizer",
        "bamboo_item_frame",
        "music_disc_buried_treasure",
        "music_disc_eastern_isles",
        "music_disc_the_tribe",
        "music_disc_low_tide",
        "music_disc_trade_winds",
        "music_disc_summering",
        "tropical_fish_bucket",
        "sardine_bucket",
        "piranha_bucket",
        "koa_spawn_egg",
        "tropicreeper_spawn_egg",
        "iguana_spawn_egg",
        "tropiskelly_spawn_egg",
        "eih_spawn_egg",
        "sea_turtle_spawn_egg",
        "marlin_spawn_egg",
        "failgull_spawn_egg",
        "dolphin_spawn_egg",
        "seahorse_spawn_egg",
        "tree_frog_spawn_egg",
        "sea_urchin_spawn_egg",
        "v_monkey_spawn_egg",
        "piranha_spawn_egg",
        "sardine_spawn_egg",
        "tropical_fish_spawn_egg",
        "eagle_ray_spawn_egg",
        "tropi_spider_spawn_egg",
        "ashen_spawn_egg",
        "hammerhead_spawn_egg",
        "cowktail_spawn_egg",
        "man_o_war_spawn_egg",
        "tropibee_spawn_egg",
        "tapir_spawn_egg",
        "jaguar_spawn_egg",
        "brown_basilisk_lizard_spawn_egg",
        "green_basilisk_lizard_spawn_egg",
        "hummingbird_spawn_egg",
        "fiddler_crab_spawn_egg",
        "spider_monkey_spawn_egg",
        "white_lipped_peccary_spawn_egg",
        "cubera_spawn_egg",
        "ashen_mask_square_zord",
        "ashen_mask_horn_monkey",
        "ashen_mask_oblongatron",
        "ashen_mask_headinator",
        "ashen_mask_square_horn",
        "ashen_mask_screw_attack",
        "ashen_mask_the_brain",
        "ashen_mask_bat_boy",
        "ashen_mask_invader",
        "ashen_mask_mojo",
        "ashen_mask_warthog",
        "ashen_mask_the_heart",
        "ashen_mask_enigma",
        "dagger",
        "blow_gun",
        "zircon_hoe",
        "zirconium_hoe",
        "eudialyte_hoe",
        "zircon_axe",
        "zirconium_axe",
        "eudialyte_axe",
        "zircon_pickaxe",
        "zirconium_pickaxe",
        "eudialyte_pickaxe",
        "zircon_shovel",
        "zirconium_shovel",
        "eudialyte_shovel",
        "zircon_sword",
        "zirconium_sword",
        "eudialyte_sword",
        "fire_boots",
        "fire_leggings",
        "fire_chestplate",
        "fire_helmet",
        "scale_boots",
        "scale_leggings",
        "scale_chestplate",
        "scale_helmet",
        "yellow_scuba_goggles",
        "yellow_scuba_harness",
        "yellow_scuba_flippers",
        "pink_scuba_goggles",
        "pink_scuba_harness",
        "pink_scuba_flippers",
        "yellow_pony_bottle",
        "pink_pony_bottle",
        "water_wand",
        "exploding_coconut",
        "fishing_net",
        "pianguas"


    ],
    "minecraft": [

    ]
}


def updateJSONs():
    for folder in [p for p in listdir(MODSDATA) if path.exists(path.join(MODSDATA,p,"moddata.json")) and p != "minecraft"]:

        FULL_FOLDER_PATH = path.join(MODSDATA,folder)
        MODDATA: dict[str,str] = json.load(open(path.join(FULL_FOLDER_PATH,"moddata.json"),"r"))
        LANG: dict[str,str] = json.load(open(path.join(FULL_FOLDER_PATH,"assets",folder,"lang","en_us.json"),"r"))

        ASSETS_PATH = path.join(FULL_FOLDER_PATH,"assets")
        DATA_PATH = path.join(FULL_FOLDER_PATH,"data")

    # ===================================================================================
    #   TAGS
    # ===================================================================================

        tags = {}
        for data_child_folder in listdir(DATA_PATH):
            TAG_PATH = path.join(DATA_PATH,data_child_folder,"tags")
            for tagfile in list_files_with_extension(TAG_PATH,".json"):
                tags[f"#{folder}:{cutExt(tagfile)}"] = json.load(open(tagfile,"r"))["values"]

    # ===================================================================================
    #   ITEM
    # ===================================================================================

        items = {}


        ITEM_DIR = os.path.join(FULL_FOLDER_PATH, "assets", folder, "textures", "item")
        for item in os.listdir(ITEM_DIR):
            itemname = LANG.get(f"item.{folder}.{cutExt(item)}",LANG.get(f"block.{folder}.{cutExt(item)}",None))
            if itemname is not None:
                items[f"{folder}:{cutExt(item)}"] = {
                    "name": itemname,
                    "type": "minecraft:item",
                    "img": imgToBase64(path.join(ITEM_DIR,item))
                }

    # ===================================================================================
    #   BLOCKS, SLABS, STAIRS
    # ===================================================================================

        TXT_PATH = path.join(FULL_FOLDER_PATH, "assets", folder, "textures")

        for cat in listdir(TXT_PATH):
            txt_folder_path = path.join(TXT_PATH, cat)
            if not path.exists(txt_folder_path): continue
            try:
                for item in os.listdir(txt_folder_path):
                    itemname = LANG.get(f"item.{folder}.{cutExt(item)}",LANG.get(f"block.{folder}.{cutExt(item)}",None))
                    if itemname is not None:

                        if path.isdir(path.join(txt_folder_path,item)):
                            img = {
                                "top": imgToBase64(path.join(txt_folder_path,item,"top.png")),
                                "right": imgToBase64(path.join(txt_folder_path,item,"right.png")),
                                "left": imgToBase64(path.join(txt_folder_path,item,"left.png")),
                            }
                        else:
                            img = imgToBase64(path.join(txt_folder_path,item))


                        items[f"{folder}:{cutExt(item)}"] = {
                            "name": itemname,
                            "type": cat.replace("..",":") if ".." in cat else "minecraft:"+cat,
                            "img": img
                        }
            except:
                pass


        sorteditems = {}
        for newid in [folder+":"+i for i in IDS_SORT[folder]]:
            sorteditems[newid] = items.get(newid,{
                "name": "Error",
                "type": "minecraft:item",
                "img": ""
            })

        result = {
            "id": MODDATA["id"],
            "name": MODDATA["name"],
            "items": sorteditems,
            "recipes": {},
            "tags": dict(sorted(tags.items(), key=lambda x: x[0])),
        }

        if folder != "minecraft":
            dest = path.join(__file__,pardir,"mods",folder)
        else:
            dest = path.join(__file__,pardir,folder)
        os.makedirs(dest,exist_ok=True)
        json.dump(result,open(path.join(dest,f"{folder}.json"),"w"),indent=4)

updateJSONs()
FileListener(MODSDATA,updateJSONs).start()