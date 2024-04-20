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
    total=sum(output.values())
    print(total)
    output['totalz']=total
    output['cood']="56.0738, 80.27733"
    print(output)
    
    # Ensure output is in the format suitable for MongoDB
    try:
        # Insert each item in the 'debris_type' list separately
        db.items.insert_one(output)
        
        return jsonify({"message": "Data inserted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
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
