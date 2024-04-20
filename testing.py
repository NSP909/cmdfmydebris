import requests

# Define the image path
image_path = r"C:\Users\sange\OneDrive\Desktop\bitcamp\hurricane.jpg"

# Define the URL of your Flask app
url = 'http://127.0.0.1:5000/post-data'  # Assuming Flask is running locally

# Send a POST request to the Flask app with the image path
response = requests.post(url, json={"image_path": image_path})

# Print the response from the Flask app
print(response.json())
