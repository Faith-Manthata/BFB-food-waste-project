from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='.')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("✅ Server running!")
    print("🌐 OPEN: http://localhost:5000/login.html")
    app.run(port=5000)