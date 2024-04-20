from ultralytics import YOLO
from ultralytics.engine.results import Results, Boxes
from ultralytics.utils import ops
import numpy as np
from PIL import Image
import cv2
import torch
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



model: YOLO = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)
# Open the video file
video_path = "bruh.mp4"
cap = cv2.VideoCapture('bruh.mp4')
fps_cap = 30
cap.set(cv2.CAP_PROP_FPS, fps_cap)
output_path = "video.mp4"
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
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
        for box in results[0].boxes:
            if box.cls != 0:
                rows_to_remove.append(ind)
            ind += 1
        box_data = res.boxes.xyxy.tolist()
        indices_to_keep = [i for i in range(box_data.size(0)) if i not in rows_to_remove]
        try: rows_to_keep: torch.Tensor = torch.index_select(box_data, 0, torch.tensor(indices_to_keep))
        except:
            print(frame_count, total_frames, sep=" ")
            break
        for box in rows_to_keep:
            x1, y1, x2, y2 = box.tolist()
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)

        new_video.write(frame)
 
        # cv2.imshow("YOLOv8 Inference", frame,)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break

new_video.release()
# print("THIS IS  WORKING")
cv2.destroyAllWindows()
