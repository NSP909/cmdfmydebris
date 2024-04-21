from tkinter import Image
from pymongo import MongoClient
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from debris import generate_description, generate_report, detect_damage
from mapping import grab_frames
from yolo import detect_person
from mapping import rand_coords
import os
import base64
import asyncio
import json
import ast
from dotenv import load_dotenv

import PIL
load_dotenv()

app = Flask(__name__)
CORS(app, origins='*')

# MongoDB connection URI
uri = "mongodb+srv://ayushroy9711:ASiWwy7yhyYMLFss@cluster0.2gchnja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Establishing connection to MongoDB
cluster = MongoClient(uri)
db = cluster['records']
db.items.insert_one({"concrete": 10000, "wood": 5000, "metal": 3000, "glass": 2000, "cood": "39.20338528137422, -76.53489205723363"})

@app.route('/post-data', methods=['POST'])
async def post_data():
    file = request.files['file']
    if file.filename.endswith('.mp4'):
        upload_path = 'upload/video.mp4'
        file.save(upload_path)
        grab_frames(upload_path)
        tasks = []
        for image in os.listdir('./frames/'): 
            path = os.path.join('./frames/', image)
            task = asyncio.create_task(process_frame(path))
            tasks.append(task)
        await asyncio.gather(*tasks)
        return jsonify({"message": "Data inserted successfully"}), 200
    
async def process_frame(path):
    try:
        output = generate_description(path)  # Assuming generate_description is an async function
        if isinstance(output, dict):  # Check if output is a dictionary
            total = sum(output.values())
            output['totalz'] = total
            output['cood'] = rand_coords()
            print(output['cood'])
            try:
                await db.items.insert_one(output)
            except Exception as e:
                pass  # Ignore the exception and continue to the next call
    except Exception as e:
        pass  # Ignore the exception and continue to the next call

    
@app.route('/get-co', methods=['GET'])
def get_co():
    data = db.items.find()  # Querying 'calories' collection
    results = [calorie for calorie in data]# Convert cursor to a list of dictionaries
    
    if not results:
        return jsonify({"message": "No data found"})
    total=0
    d={}
    for result in results:
        result['_id'] = str(result['_id'])
        if 'totalz' in result:
            total+=result['totalz']
            
    for result in results:
        if 'cood' and 'totalz' in result:
            d[result['totalz']/total]=result['cood']
    return jsonify(d)

@app.route('/get-report', methods=['GET'])
def get_report():
    data = db.items.find()  # Querying 'calories' collection
    results = [calorie for calorie in data]# Convert cursor to a list of dictionaries
    lmaoz=results
    if not results:
        return jsonify({"message": "No data found"})
    total=0
    d={}
    for result in results:
        result['_id'] = str(result['_id'])
        if 'totalz' in result:
            total+=result['totalz']
            
    for result in results:
        if 'cood' and 'totalz' in result:
            d[result['totalz']/total]=result['cood']
      
    out= generate_report(lmaoz)

    return out

@app.route('/get-house', methods=['POST'])
def get_house():
     
     file = request.files['file']
     upload_path = 'upload/image.png'
     file.save(upload_path)
     out = detect_damage(upload_path)
     return out
  


@app.route('/detect-person', methods=['POST'])
def person_detection():
    if 'file' not in request.files:
        return 'No file uploaded', 400

    file = request.files['file']
    if file.filename.endswith('.mp4'):
        # Do something with the uploaded mp4 file
        upload_path = 'upload/video.mp4'
        file.save(upload_path)
        # return send_file(upload_path, mimetype='video/mp4')
        detect_person(upload_path)
        video_path = 'result/video.mp4'
        return send_file(video_path, mimetype='video/mp4')
    else:
        return 'Invalid file format. Only mp4 files are allowed', 400

if __name__ == "__main__":
    app.run(debug=True)
