# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import requests

# app = Flask(__name__)
# CORS(app)

# @app.route('/weather', methods=['GET'])
# def get_weather():
#     city_name = request.args.get('city')
#     api_key = 'f57695816e3c138a7e222f2e119a1678'
#     api_url = f"https://api.openweathermap.org/data/2.5/weather?q={city_name}&units=metric&appid={api_key}&lang=pt_br"
#     response = requests.get(api_url)
#     if response.ok:
#         return jsonify(response.json()), 200
#     else:
#         return jsonify({"error": "Erro ao buscar dados do clima"}), 404

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"