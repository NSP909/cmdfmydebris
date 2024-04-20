from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS
from debris import generate_description

app = Flask(__name__)
CORS(app, origins='*')

# MongoDB connection URI
uri = "mongodb+srv://ayushroy9711:ASiWwy7yhyYMLFss@cluster0.2gchnja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Establishing connection to MongoDB
cluster = MongoClient(uri)
db = cluster['records']

@app.route('/post-data', methods=['POST'])
def process_image():
    path = request.json
    image_path = path['image_path']
    output = generate_description(image_path)
    print(output)

    # Ensure output is in the format suitable for MongoDB
    try:
        # Insert each item in the 'debris_type' list separately
        db.items.insert_one(output)
        
        return jsonify({"message": "Data inserted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
