import requests

# Define the URL of your Flask app
url = 'http://127.0.0.1:5000/post-data'  # Assuming Flask is running locally

# Define the video path
video_path = r"C:\Users\sange\OneDrive\Desktop\bitcamp\ez.mp4"

# Open the video file in binary mode
with open(video_path, 'rb') as file:
    # Create a dictionary containing the file object
    files = {'file': file}
    
    # Send a POST request to the Flask app with the video file
    response = requests.post(url, files=files)

# Print the response from the Flask app
print(response.json())
