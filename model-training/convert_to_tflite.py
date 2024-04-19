import tensorflow as tf

# Path to H5 model
model_path = '/Users/sumeyyasherief/my-fashion-styling-project/model-training/models/fashion_mnist_model.h5'
# Path to save the TensorFlow Lite model
tflite_model_path = '/Users/sumeyyasherief/my-fashion-styling-project/model-training/models/fashion_mnist_model.tflite'

# Loading  Keras model
model = tf.keras.models.load_model(model_path)
# custom_objects={'input_shape': (None, 28, 28, 1)})
# Creating TensorFlow Lite converter object
converter = tf.lite.TFLiteConverter.from_keras_model(model)
# Set the input shapes manually if necessary
# inputs = [tf.TensorSpec(shape=[None, 28, 28, 1], dtype=tf.float32, name="input")]
# converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS]

# Converting the model
tflite_model = converter.convert()

# Saving the converted model to a file
with open(tflite_model_path, 'wb') as f:
    f.write(tflite_model)
