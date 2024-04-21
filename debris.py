
import os
import google.generativeai as genai
import google.ai.generativelanguage as glm
from google.generativeai.types.content_types import *
from PIL import Image
import json
from dotenv import load_dotenv
import ast
import re
from flask import Flask, jsonify
 

PROMPT = """
!!IMPORTANT!! - Make sure you follow the format strictly as given below.

you are a YOLO model that accurately detects amount and type of debris in the provided image. You need to output the quantity, type and mass of each debris detected in the image.
Account for scattered debbris as well.


strictly follow this format and print nothing else:
{{"debris1": mass1, "debris2": mass2.....}}

replace debris1, debris2 and so on with the type of debris detected
estimate mass in kilograms and volume in cubic metres. 

"""


def generate_description(image_path):
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    
    genai.configure(api_key=GOOGLE_API_KEY)
    
    model = genai.GenerativeModel("gemini-pro-vision")
    image = Image.open(image_path)
    response = model.generate_content([image, PROMPT]).text
    response = re.search(r"(```(json)?\n)?\{(.+)\}(\n```)?", response).group(3)
    print(response)
    return ast.literal_eval(response)


def detect_damage(image_path):
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    prempt="You are a damage detection bot and your main work is to analyse buildings and houses to see if there is any damage, weatheing or structural issues or infections"
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("gemini-pro-vision")
    image = Image.open(image_path)
    response = model.generate_content([image, prempt]).text
    response = response.replace('\n', '')
    print(response)
    return jsonify({'response':response})


def generate_report(contents):
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    
    genai.configure(api_key=GOOGLE_API_KEY)
    
    model = genai.GenerativeModel("gemini-pro")
    
    # Preprocess the contents to extract relevant information
    debris_info = ""
    for item in contents:
        debris_info += f"Debris: {', '.join(item.keys())}\n"
        for key, value in item.items():
            debris_info += f"{key}: {value}\n"
    
    prompt = " You are a disaster relief manager. I will provide you with data about a disaster like a bridge collapse or an incident with data \
        about debris and quantity of each element. Your job is to provide me a detailed report about the destruction \
    that has taken place, how much money this has cost approximately, and how much it will cost to rebuild. You will also provide information about how each debris can be recycled and give financial reports. If not recyclable or reusable, \
        you will give methods to dispose of it. Do not provide date and also  try to speak continously\n\n\
            this is an example\
            Debris Report\n\nIncident: Bridge Collapse\n\nLocation: Not provided\n\nDate: Not provided\n\nDebris Analysis\n\nDebris Type | Quantity \n---|---\nPlastic Bottles | 10 \nPaper | 5 \nWood | 15 \nMetal | 20 \nTotal | 50 \n\nEstimated Cost of Debris Removal\n\nBased on industry averages, the estimated cost of debris removal is approximately $2,000 per ton. Assuming a density of 1 ton per 10 cubic meters, the total volume of debris is approximately 5 cubic meters. Therefore, the estimated cost of debris removal is $10,000.\n\nEstimated Cost of Rebuilding\n\nThe cost of rebuilding the bridge will depend on a number of factors, including the size and complexity of the bridge, the availability of materials, and the cost of labor. However, based on past projects of similar scope, it is estimated that the cost of rebuilding the bridge will be $50 million.\n\nDebris Recycling and Disposal\n\nPlastic Bottles: Plastic bottles can be recycled at most recycling centers. They can be used to make new plastic products, such as bottles, clothing, and toys.\n\nPaper: Paper can be recycled at most recycling centers. It can be used to make new paper products, such as newspapers, magazines, and cardboard.\n\nWood: Wood can be recycled at some recycling centers. It can be used to make new wood products, such as furniture, lumber, and paper.\n\nMetal: Metal can be recycled at most recycling centers. It can be used to make new metal products, such as cars, appliances, and construction materials.\n\nFinancial Report\n\nCategory | Cost \n---|---\nDebris Removal | $10,000 \nRebuilding | $50 million \nTotal | $50,010,000 \n\nConclusion\n\nThe bridge collapse has resulted in significant damage and will require a substantial investment to clean up and rebuild. The cost of debris removal is relatively small compared to the cost of rebuilding the bridge. However, it is important to recycle and dispose of the debris properly in order to minimize the environmental impact."
                
    
    # Generate the report
    response = model.generate_content([debris_info, prompt]).text
    print(response)
    # Extract the necessary information from the response
    report_content = response
    
    # Return the report content as a dictionary
    return {'report': report_content}


if __name__ == '__main__':
    image_path = r"C:\Users\sange\OneDrive\Desktop\bitcamp\debris1.jpg"
    quantity = generate_description(image_path)
    print(quantity)
    print(type(quantity))

