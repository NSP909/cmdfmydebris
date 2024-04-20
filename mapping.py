import cv2
import os
import shutil
import numpy as np
import os
import random

def gen_coords(num: int) -> list[float,float]:
    x = np.linspace(-76.5358951,-76.5118625, num)
    y = np.linspace(39.2142473, 39.228078, num)
    coords = []
    for i in zip(x, y):
        coords.append([i[0].round(10), i[1].round(10)])
    return coords

def count_files_in_folder(folder_path):
    files = os.listdir(folder_path)
    num_files = len(files)
    return num_files
def rand_coords():
    num = count_files_in_folder("ENTER PATH HERE")
    xuplim = 39.232301
    yuplim = -76.502078
    xlowlim = 39.202423
    ylowlim = -76.557055
    i=0
    coords = []
    while(i<num):
        temp_tuple =(random.uniform(xlowlim,xuplim),random.uniform(ylowlim,yuplim))
        coords.append(temp_tuple)
        i+=1
    return coords

def grab_frames(path):
     # Delete existing 'frames' folder if it exists
    if os.path.exists('frames/'):
            shutil.rmtree('frames/')
    os.mkdir('./frames/')

    vidcap = cv2.VideoCapture(path)
    vidcap.set(cv2.CAP_PROP_FPS, 10)
    success,image = vidcap.read()
    count = 0

    while success:
        if count % 150 == 0:
            cv2.imwrite("./frames/frame%d.jpg" % count, image)     # save frame as JPEG file      
        success,image = vidcap.read()
        #print('Read a new frame: ', success, count)
        count += 1

def process_frames():
    folder_path = './frames/'
    files = os.listdir(folder_path)
    map = {}
    coords = gen_coords(num = len(files))
    file_count = 0
    for file in files:
        file_path = os.path.join(folder_path, file)
        map[file] = coords[file_count]
        print(file_path)
        file_count += 1
    return map

# Process the data as needed
if __name__ == '__main__':
    grab_frames()
    map = process_frames()
    print(map)





