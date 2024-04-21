from ultralytics import YOLO
from ultralytics.engine.results import Results, Boxes
from ultralytics.utils import ops
import numpy as np
from PIL import Image
import cv2
import torch
import os
import shutil
import ffmpeg
# Load a model
def create_model(dataset: str = "coco8.yaml"):
    # model = YOLO("yolov8l.yaml")  # build a new model from scratch
    model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)
    # Use the model
    model.train(data="coco8.yaml", epochs=3)  # train the model
    metrics = model.val()  # evaluate model performance on the validation set
    results = model("https://ultralytics.com/images/bus.jpg")  # predict on an image
    path = model.export(format="onnx")  # export the model to ONNX format
    return model


def detect_person(video_path:str):
    model: YOLO = YOLO("yolov8n.pt")
    # load a pretrained model (recommended for training)
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    fps_cap = 30
    cap.set(cv2.CAP_PROP_FPS, fps_cap)
    output_path = "result/video.mp4"
    fourcc = cv2.VideoWriter_fourcc(*'h264')
    new_video = cv2.VideoWriter(output_path, fourcc, fps_cap, (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_count = 0
    # Loop through the video frames
    while cap.isOpened():
        # Read a frame from the video
        print("FRAME = ", frame_count)
        success, frame = cap.read()
        frame_count += 1
        if success:
            # Run YOLOv8 inference on the frame
            results: Results = model(frame)
            res = results[0]
            rows_to_remove = []
            ind = 0
            conf = []
            for box in results[0].boxes:
                if box.cls == 0:
                    rows_to_remove.append(ind)
                    conf.append(box.conf)
                ind += 1
            box_data = res.boxes.xyxy.tolist()
            new_box_data = [box_data[i] for i in range(len(box_data)) if i in rows_to_remove]
            new_box_data_tensor = torch.tensor(new_box_data)
            # rows_to_keep = torch.index_select(box_data, 0, torch.tensor(indices_to_keep))
            for box,confidence in zip(new_box_data,conf):
                x1, y1, x2, y2 = box
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                label = f"Person: {confidence[0]:.2f}"
                cv2.putText(frame, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            new_video.write(frame)
        else: break

    new_video.release()
    # print("THIS IS  WORKING")
    cv2.destroyAllWindows()

def test_only_person(path: str):
    model = YOLO("yolov8l.pt")
    folder_path = "xxx"

    # Get the list of files and subdirectories inside the folder
    file_list = os.listdir(folder_path)

    # Iterate over the files and subdirectories
    for file_name in file_list:
        file_path = os.path.join(folder_path, file_name)
        
        # Check if the path is a file
        if os.path.isfile(file_path):
            os.remove(file_path)  # Remove the file
        else:
            shutil.rmtree(file_path) # Remove the subdirectory

    print("Contents inside the folder 'xxx' have been removed.")
    # Change the argument to 0 for webcam
    results = model.predict(source=path, classes = 0, save=True, show= True, project="xxx", name="yyy")
    convert_avi_to_mp4()
    return results

def convert_avi_to_mp4():
    # Construct the output file path
    input_path = r'C:\Users\tripa\Desktop\project\cmdfmydebris\xxx\yyy\video.avi'
    output_name = 'xxx/yyy/video.mp4'
    ffmpeg.input(input_path).output(output_name).run()
    
if __name__ == '__main__':
    convert_avi_to_mp4()
    # test_only_person("upload/video.mp4")
# Example usage:
