from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS
from debris import generate_description
from mapping import grab_frames
import os
import base64
import asyncio
import json
import ast

app = Flask(__name__)
CORS(app, origins='*')

# MongoDB connection URI
uri = "mongodb+srv://ayushroy9711:ASiWwy7yhyYMLFss@cluster0.2gchnja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Establishing connection to MongoDB
cluster = MongoClient(uri)
db = cluster['records']

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
            output['cood'] = "58.0738, 81.4733"
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
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
