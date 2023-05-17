null = None

class Recipe:
    @classmethod
    def shapeless(cls, resultid, resultamount, *ids):
        return {
            "type": "minecraft:shapeless_crafting",
            "data": { "result": { "id": resultid, "amount": resultamount }, "matrix": ids }
        }
    @classmethod
    def shaped(cls, resultid, resultamount, i1, i2, i3, i4, i5, i6, i7, i8, i9):
        return {
            "type": "minecraft:shaped_crafting",
            "data": {
                "result": {"id": resultid ,"amount": resultamount },
                "matrix": [[i1, i2, i3],[i4,i5,i6],[i7,i8,i9]]
            }
        }
    @classmethod
    def curare(cls, resultid, *ids):
        return {
            "type": "tropicraft:curare_mix",
            "data": { "result": resultid, "ingredients": ids }
        }

class RecipeTemplate:
    @classmethod
    def block(cls, resultid, resultamount, id):
        return Recipe.shaped(resultid,resultamount,id,id,id,id,id,id,id,id,id)
    
    @classmethod
    def chest(cls, resultid, resultamount, id):
        return Recipe.shaped(resultid,resultamount,id,id,id,id,null,id,id,id,id)
    
    @classmethod
    def smallblock(cls, resultid, resultamount, id):
        return Recipe.shaped(resultid,resultamount,id,id,null,id,id,null,null,null,null)
    
    @classmethod
    def stairs(cls, resultid, resultamount, id):
        return Recipe.shaped(resultid,resultamount,null,null,id,null,id,id,id,id,id)
    
    @classmethod
    def stick(cls, resultid, resultamount, id):
        return Recipe.shaped(resultid,resultamount,id,null,null,id,null,null,null,null,null)
    
    @classmethod
    def cauldron(cls, resultid, resultamount, id):
        return Recipe.shaped(resultid,resultamount,id,null,id,id,null,id,id,id,id)