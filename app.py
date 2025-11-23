from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Serve ALL files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_all(path):
    if path == "":
        return send_from_directory('.', 'index.html')
    else:
        return send_from_directory('.', path)

if __name__ == '__main__':
    print("🍎 MAC SERVER RUNNING!")
    print("📍 OPEN: http://localhost:5000/login.html")
    print("📍 OR: http://localhost:5000/")
    app.run(port=5000)