import cv2
import os
import shutil
import numpy as np

def gen_coords() -> list[float,float]:
    x = np.linspace(-76.5358951,-76.5118625, 40)
    y = np.linspace(39.2142473, 39.228078, 40)
    coords = []
    for i in zip(x, y):
        coords.append([i[0].round(10), i[1].round(10)])
    return coords

def grab_frames():
     # Delete existing 'frames' folder if it exists
    if os.path.exists('frames/'):
            # Delete all contents within the folder
            shutil.rmtree('frames/')

    # Create a new 'frames' folder
    os.mkdir('./frames/')

    vidcap = cv2.VideoCapture('vid.mp4')
    vidcap.set(cv2.CAP_PROP_FPS, 10)
    success,image = vidcap.read()
    count = 0

    while success:
        if count % 150 == 0:
            cv2.imwrite("./frames/frame%d.jpg" % count, image)     # save frame as JPEG file      
        success,image = vidcap.read()
        print('Read a new frame: ', success, count)
        count += 1
     

# Process the data as needed
if __name__ == '__main__':
    coords = gen_coords()
    grab_frames()





