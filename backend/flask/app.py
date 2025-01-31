from flask import Flask, render_template, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, db
import random
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': os.getenv('DATABASE_URL')  # Load DATABASE_URL from .env
})
# Initialize Firestore (or Realtime Database)
words_ref = db.reference('words')

# Route to display a form
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/get_word', methods=['GET'])
def get_random_word():
        try:
            words = words_ref.get()
            if not words:
                return jsonify({"error": "No words found in the database"}), 404
            word_list = list(words.values())[0]
            random_word = random.choice(word_list)
            return jsonify({"random_word": random_word}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)