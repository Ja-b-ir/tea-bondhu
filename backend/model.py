import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input
from PIL import Image
import io

MODEL_PATH = "model/tea_leaf_model.keras"
IMG_SIZE = (224, 224)

CLASS_NAMES = [
    "Healthy",
    "Helopeltis",
    "Not_Tea_Leaf",
    "Red_Spider",
    "Sunlight_Scorching",
    "Thrips",
]

BASE_THRESHOLD = 0.35
DELTA_THRESHOLD = 0.15
HIGH_CONF_THRESHOLD = 0.65

CONFUSED_TRIO = {"Red_Spider", "Thrips", "Helopeltis"}

model = load_model(MODEL_PATH)


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)
    return arr


def smart_predict(probs: np.ndarray) -> dict:
    probs = probs[0]
    sorted_idx = np.argsort(probs)[::-1]
    top1_idx, top2_idx = sorted_idx[0], sorted_idx[1]
    top1_class, top2_class = CLASS_NAMES[top1_idx], CLASS_NAMES[top2_idx]
    top1_conf, top2_conf = float(probs[top1_idx]), float(probs[top2_idx])

    gap = top1_conf - top2_conf

    is_ambiguous = (
        top1_conf < HIGH_CONF_THRESHOLD
        and top1_conf >= BASE_THRESHOLD
        and gap < DELTA_THRESHOLD
        and top1_class in CONFUSED_TRIO
        and top2_class in CONFUSED_TRIO
    )

    if is_ambiguous:
        return {
            "prediction_type": "dual",
            "predictions": [
                {"class": top1_class, "confidence": round(top1_conf, 4)},
                {"class": top2_class, "confidence": round(top2_conf, 4)},
            ],
            "message": f"Model is uncertain between {top1_class} and {top2_class}. "
                       f"Consider both possibilities.",
        }

    return {
        "prediction_type": "single",
        "predictions": [
            {"class": top1_class, "confidence": round(top1_conf, 4)}
        ],
        "message": f"Predicted: {top1_class}",
    }


def predict_image(image_bytes: bytes) -> dict:
    x = preprocess_image(image_bytes)
    probs = model.predict(x, verbose=0)
    return smart_predict(probs)
