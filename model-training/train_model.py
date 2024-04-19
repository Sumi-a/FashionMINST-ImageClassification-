import tensorflow as tf
import numpy as np
import pandas as pd
from PIL import Image, ImageOps
from tensorflow.keras.models import Sequential 
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout 
from tensorflow.keras.utils import to_categorical 
from tensorflow.keras.layers import Input 
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from sklearn.metrics import classification_report, confusion_matrix

def get_classes_distribution(labels):
    unique, counts = np.unique(labels, return_counts=True)
    label_distribution = dict(zip(unique, counts))
    total_samples = sum(counts)

    # Define the label descriptions
    labels_description = {
        0: "T-shirt/top", 1: "Trouser", 2: "Pullover", 3: "Dress", 4: "Coat",
        5: "Sandal", 6: "Shirt", 7: "Sneaker", 8: "Bag", 9: "Ankle Boot"
    }

    # Print the count and percentage of each class
    print("Class Distribution:")
    for label, count in label_distribution.items():
        label_name = labels_description[label]
        percent = (count / total_samples) * 100
        print(f"{label_name:<15s}: {count} or {percent:.2f}%")


# Load the Fashion MNIST dataset
fashion_mnist = tf.keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# Normalize the images to a range of 0 to 1
train_images = train_images / 255.0
test_images = test_images / 255.0

# Reshape images to include a channel dimension
train_images = train_images.reshape((-1, 28, 28, 1))
test_images = test_images.reshape((-1, 28, 28, 1))
# train_images = train_images.reshape((train_images.shape[0], 28, 28, 1))
# test_images = test_images.reshape((test_images.shape[0], 28, 28, 1))

# Convert labels to one-hot encoding
train_labels = to_categorical(train_labels)
test_labels = to_categorical(test_labels)

# Model definition
model = Sequential([
    Input(shape=(28, 28, 1)),
    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.25),  # Adjust dropout rate as necessary
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.25),
    Conv2D(128, (3, 3), activation='relu'),  # Added additional Conv2D layer
    Dropout(0.4),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(train_images, train_labels, epochs=10, validation_data=(test_images, test_labels))

predictions = model.predict(test_images)
predicted_classes = np.argmax(predictions, axis=1)
true_classes = np.argmax(test_labels, axis=1)


print(confusion_matrix(true_classes, predicted_classes))
print(classification_report(true_classes, predicted_classes))

# Checking weights
for layer in model.layers:
    weights = layer.get_weights()
    print(weights)  # Just print summary stats or shapes to avoid too much output

# Evaluating the model
test_loss, test_acc = model.evaluate(test_images, test_labels, verbose=2)
print(f"Test accuracy: {test_acc}, Test loss: {test_loss}")

# Model summary
model.summary()

model.save('fashion_mnist_model.h5')

model = load_model('fashion_mnist_model.h5')
print("Model loaded successfully!")

def classify_image(model, prepared_img):
    # Make a prediction
    prediction = model.predict(prepared_img)
    # Convert prediction probabilities to class index
    class_index = np.argmax(prediction, axis=1)
    # Define class labels 
    labels_description = {
        0: "T-shirt/top", 1: "Trouser", 2: "Pullover", 3: "Dress", 4: "Coat",
        5: "Sandal", 6: "Shirt", 7: "Sneaker", 8: "Bag", 9: "Ankle Boot"
    }
    # Return the class label
    return labels_description[class_index[0]]

# Example usage:
image_path = '/Users/sumeyyasherief/Desktop/image3.jpeg'


try:
    original_image = Image.open(image_path)
except FileNotFoundError:
    print(f"No file found at {image_path}")
    # Handle the error as appropriate

# Convert to grayscale, resize, add padding to keep aspect ratio, and invert colors
processed_image = ImageOps.grayscale(original_image)
processed_image = processed_image.resize((28, 28))
processed_image = ImageOps.invert(processed_image)

# Convert to numpy array and normalize
image_array = np.array(processed_image) / 255.0
image_array = image_array.reshape((1, 28, 28, 1))  # Reshape for the model

# Predict and print the class
predicted_class = classify_image(model, image_array)
print("Predicted class:", predicted_class)
prediction = model.predict(image_array)
predicted_class = np.argmax(prediction, axis=1)
print("Predicted class index:", predicted_class)