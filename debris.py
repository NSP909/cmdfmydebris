
import os
import google.generativeai as genai
import google.ai.generativelanguage as glm
from google.generativeai.types.content_types import *
from PIL import Image
import json
from dotenv import load_dotenv
import ast
import re

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

if __name__ == '__main__':
    image_path = r"C:\Users\sange\OneDrive\Desktop\bitcamp\debris1.jpg"
    quantity = generate_description(image_path)
    print(quantity)
    print(type(quantity))

