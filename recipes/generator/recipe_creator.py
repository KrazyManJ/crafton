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
