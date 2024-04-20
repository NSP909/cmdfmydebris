from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/api/data', methods=['GET'])
def get_data():
    # Sample GET endpoint
    data = {'message': 'This is a sample GET endpoint'}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    # Sample POST endpoint
    data = request.get_json()
    # Process the data
    response = {'message': 'Data received successfully'}
    return jsonify(response)

if __name__ == '__main__':
    app.run()