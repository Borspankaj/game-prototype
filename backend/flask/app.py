from flask import Flask, render_template, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore (or Realtime Database)
db = firestore.client()

# Route to display a form
@app.route('/')
def home():
    return render_template('index.html')

# Route to save data to Firestore
# @app.route('/add', methods=['POST'])
# def add_data():
#     try:
#         # Get data from the form
#         name = request.form.get('name')
#         email = request.form.get('email')

#         # Add data to Firestore
#         doc_ref = db.collection('users').document()
#         doc_ref.set({
#             'name': name,
#             'email': email
#         })

#         return jsonify({"message": "Data added successfully!"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Route to fetch data from Firestore
# @app.route('/get', methods=['GET'])
# def get_data():
#     try:
#         # Fetch all documents from the 'users' collection
#         users_ref = db.collection('users')
#         docs = users_ref.stream()

#         # Convert documents to a list of dictionaries
#         users = []
#         for doc in docs:
#             users.append(doc.to_dict())

#         return jsonify(users), 200
#     except Exception as e:
        # return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)