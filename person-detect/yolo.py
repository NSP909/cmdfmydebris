from ultralytics import YOLO
from PIL import Image

# Load a model
def create_model(dataset: str = "coco8.yaml"):
    # model = YOLO("yolov8l.yaml")  # build a new model from scratch
    model = YOLO("yolov8l.pt")  # load a pretrained model (recommended for training)

    # Use the model
    model.train(data="coco8.yaml", epochs=3)  # train the model
    metrics = model.val()  # evaluate model performance on the validation set
    results = model("https://ultralytics.com/images/bus.jpg")  # predict on an image
    path = model.export(format="onnx")  # export the model to ONNX format
    return model



model = YOLO("yolov8l.pt")  # load a pretrained model (recommended for training)

im1 = Image.open("original.jpg")
# results = model.predict(source=im1, save=True, filter_by_classes=["person"], save_dir="predictions")
results = model.predict(source = 'vid.mp4', show = True)
