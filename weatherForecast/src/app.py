from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/weather', methods=['GET'])
def get_weather_data():
    city = request.args.get('city')
    api_weather_url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=f57695816e3c138a7e222f2e119a1678&lang=pt_br'
    
    try:
        res = requests.get(api_weather_url)
        if not res.ok:
            raise Exception('Erro ao buscar dados do clima')
        
        data = res.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)