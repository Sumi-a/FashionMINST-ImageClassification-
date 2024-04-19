# from flask import Flask, request, jsonify
# from tensorflow.keras.models import load_model
# from PIL import Image, ImageOps
# import numpy as np
# import io

# app = Flask(__name__)

# # Load the pre-trained model
# model = load_model('fashion_mnist_model.h5')

# def prepare_image(img):
#     """Prepare the image for prediction."""
#     img = Image.open(io.BytesIO(img))
#     img = img.convert('L')  # Convert to grayscale
#     img = img.resize((28, 28))  # Resize to the input size expected by the model
#     img = ImageOps.invert(img)  # Invert colors
#     img = np.array(img)
#     img = img.reshape(1, 28, 28, 1)  # Reshape to the model's expected input
#     img = img.astype('float32') / 255.0  # Normalize pixel values
#     return img

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image uploaded'}), 400
#     image_file = request.files['image'].read()
#     image = prepare_image(image_file)
#     predictions = model.predict(image)
#     predicted_class = np.argmax(predictions, axis=1)
#     labels_description = {
#         0: "T-shirt/top", 1: "Trouser", 2: "Pullover", 3: "Dress", 4: "Coat",
#         5: "Sandal", 6: "Shirt", 7: "Sneaker", 8: "Bag", 9: "Ankle Boot"
#     }
#     class_label = labels_description[int(predicted_class)]
#     return jsonify({'class': class_label, 'confidence': float(np.max(predictions))})

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)  # Runs on a different port from your Node.js server
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

model = load_model('fashion_mnist_model.h5')  # Load the pre-trained model

def prepare_image(img):
    """Prepare the image for prediction."""
    img = Image.open(io.BytesIO(img))
    img = img.convert('L')  # Convert to grayscale
    img = img.resize((28, 28))  # Resize to the input size expected by the model
    img = ImageOps.invert(img)  # Invert colors
    img = np.array(img)
    img = img.reshape(1, 28, 28, 1)  # Reshape to the model's expected input
    img = img.astype('float32') / 255.0  # Normalize pixel values
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    image_file = request.files['image'].read()
    image = prepare_image(image_file)
    predictions = model.predict(image)
    predicted_class = np.argmax(predictions, axis=1)[0]
    labels_description = [
        "T-shirt/top", "Trouser", "Pullover", "Dress", "Coat",
        "Sandal", "Shirt", "Sneaker", "Bag", "Ankle Boot"
    ]
    class_label = labels_description[predicted_class]
    confidence = float(np.max(predictions))
    return jsonify({'class': class_label, 'confidence': confidence})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
