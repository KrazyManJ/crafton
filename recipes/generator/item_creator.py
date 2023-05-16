import os
import base64
import json
import re


def pathToBase64(path):
    return base64.b64encode(open(path, 'rb').read()).decode('utf-8')

def createItemsByID(id: str):
    data = {}
    folder_path = os.path.join(__file__,os.pardir,"data",id)
    
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)

        parts = re.split("\_\_",file_name[:-4] if file_name.endswith(".png") else file_name)
        if len(parts) > 1:
            itemid, name, iType = id+":"+parts[0], parts[1], parts[2]
            
            imgdata = None
            if os.path.isdir(file_path):
                imgdata = {
                    "top": pathToBase64(os.path.join(file_path,"top.png")),
                    "right": pathToBase64(os.path.join(file_path,"right.png")),
                    "left": pathToBase64(os.path.join(file_path,"left.png"))
                }
                for lname in ["lock"]:
                    
                    if os.path.isfile(os.path.join(file_path,f"{lname}.png")):
                        imgdata[lname] = pathToBase64(os.path.join(file_path,f"{lname}.png"))
            else: 
                imgdata = pathToBase64(file_path)
            
            
            data[itemid] = {
                "name": name,
                "img": imgdata,
                "type": iType
            }
    return data