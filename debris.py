
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
    prempt="You are a damage detection bot and your main work is to analyse buildings and houses to see if there is any damage, weatheing or structural issues or infections. Give a detailed report and do not talk in first person and do not include address or date"
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("gemini-pro-vision")
    image = Image.open(image_path)
    response = model.generate_content([image, prempt]).text
    response = response.replace('\n', '')
    print(response)
    return jsonify({'response':response})


def generate_report(totents):
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    
    genai.configure(api_key=GOOGLE_API_KEY)
    
    model = genai.GenerativeModel("gemini-pro")
    
    # Preprocess the contents to extract relevant information
    debris_info = ""
    for item in totents:
        debris_info += f"Debris: {', '.join(item.keys())}\n"
        for key, value in item.items():
            debris_info += f"{key}: {value}\n"
    
    prompt = " You are a disaster management bot that creates reports. \
        I will provide you with the type of debris present and quantity of each debris present in kilograms as key value pairs. \
        I will also give you co ordinates os you can figure out the location. Now based on this information create a \
            detailed disaster report and be sure to include financial information. Include how much it will cost to rebuild and how much destruction has taken place\
                 Make sure that you are responding in paragraphs and not using any tables or lists as this will be a paragraph reply.\
                    Don't mention things that you don't know. Give big financial numbers like 2 billion dollars for reconstruction and 400 million for removal of debris"
                
    
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

