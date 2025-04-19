# app/services/api_response_service.py
from flask import jsonify

class ApiResponse:
    @staticmethod
    def success(data=None, message="Success", status_code=200):
        response = {
            "success": True,
            "message": message,
        }

        if data is not None:
            if isinstance(data, dict):
                response.update(data)

        return jsonify(response), status_code
    
    @staticmethod
    def error(message="An error ocurred", status_code=400, errors=None):
        response = {
            "success": False,
            "message": message,
        }
        if errors:
            response["errors"] = errors
        
        return jsonify(response), status_code