from dotenv import *
import os
import google.generativeai as genai
import google.ai.generativelanguage as glm
from google.generativeai.types.content_types import *
from PIL import Image

def generate_description(image_path):
    load_dotenv()
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    
    genai.configure(api_key=GOOGLE_API_KEY)
    
    model = genai.GenerativeModel("gemini-pro-vision")
    image = Image.open(image_path)
    responses = model.generate_content([image, "quantify the debris in the image and give me an estimate of each type and no/volume/mass in json format"])
    
    return responses.text

image_path = r"C:\Users\sange\OneDrive\Desktop\bitcamp\debris1.jpg"
description = generate_description(image_path)
print(description)
