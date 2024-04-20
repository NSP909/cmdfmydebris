from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from yolo import detect_person


app = Flask(__name__)
CORS(app)

@app.route('/detect-person', methods=['POST'])
def hello():
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
    app.run(debug=True)