from flask import Flask
from flask_cors import CORS
from app.routes.user_routes import user_bp
from app.routes.doc_routes import document_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(document_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)