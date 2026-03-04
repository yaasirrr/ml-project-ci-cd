import os
from flask import Flask, request, jsonify, send_from_directory
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

app = Flask(__name__, static_folder="build", static_url_path="/")

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/predictdata', methods=['POST'])
def predict_datapoint():
    try:
        data = request.json

        custom_data = CustomData(
            gender=data['gender'],
            race_ethnicity=data['ethnicity'],
            parental_level_of_education=data['parental_level_of_education'],
            lunch=data['lunch'],
            test_preparation_course=data['test_preparation_course'],
            reading_score=float(data['reading_score']),
            writing_score=float(data['writing_score'])
        )

        pred_df = custom_data.get_data_as_data_frame()

        predict_pipeline = PredictPipeline()
        results = predict_pipeline.predict(pred_df)

        return jsonify({"prediction": float(results[0])})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)