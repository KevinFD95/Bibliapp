# resources/__init__.py
import json, os


def load_documents():
    path = os.path.join(os.path.dirname(__file__), "documents.json")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def load_users():
    path = os.path.join(os.path.dirname(__file__), "users.json")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)