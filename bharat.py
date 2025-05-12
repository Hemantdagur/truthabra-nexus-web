from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle Cross-Origin Requests
from sentence_transformers import SentenceTransformer, util
from fuzzywuzzy import fuzz
import torch
import praw

app = Flask(__name__)

# === Enable CORS for all origins and all methods ===
CORS(app, resources={r"/*": {"origins": "*"}})

# ==== STEP 1: Reddit API Setup ====
reddit = praw.Reddit(
    client_id='2s6YVsc7Mvs0rrLx3cPCsg',
    client_secret='2DjfVP-8JVlHa4k1HyAp4v7yBpaDcg',
    user_agent='FactCheckerBot/0.1 Mysterious_Lab_801'
)

# ==== STEP 2: Load NLP model ====
model = SentenceTransformer('all-mpnet-base-v2')

# ==== STEP 3: Fetch Reddit Posts ====
def fetch_reddit_posts(query, max_posts=10):
    posts = []
    for submission in reddit.subreddit(
        "india+worldnews+IndianDefense+Indiannews+IndiaSpeaks+Chodi+DesiMeta+geoplitics+globalaffairs+Warnews+CombatFootage+AskIndia+NeutralPolitics+Skeptic+AskHistorians"
    ).search(query, limit=max_posts):
        post_text = submission.title + " " + submission.selftext[:300]
        posts.append(post_text)
    return posts

# ==== STEP 4: Check similarity ====
def check_fact(claim, posts):
    if not posts:
        return 0.0, []

    claim_embedding = model.encode(claim, convert_to_tensor=True)
    post_embeddings = model.encode(posts, convert_to_tensor=True)

    scores = util.cos_sim(claim_embedding, post_embeddings)[0]
    fuzzy_scores = [fuzz.partial_ratio(claim.lower(), post.lower()) for post in posts]

    best_score = max(float(scores.max()), max(fuzzy_scores) / 100)
    top_indices = torch.topk(scores, k=min(3, len(posts))).indices
    top_posts = [posts[i] for i in top_indices]

    return round(best_score * 100, 2), top_posts

# ==== Handle CORS preflight request ====
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response

# ==== API ROUTE ====
@app.route("/api/check", methods=["POST"])
def api_check():
    data = request.json
    if not data or "claim" not in data:
        return jsonify({"error": "Missing 'claim' in request"}), 400

    claim = data["claim"]
    try:
        reddit_posts = fetch_reddit_posts(claim)
        similarity_score, top_posts = check_fact(claim, reddit_posts)

        if similarity_score > 80:
            message = "✅ Highly credible!"
        elif similarity_score > 60:
            message = "⚠ Likely TRUE, but verify further."
        elif similarity_score > 40:
            message = "⚠ Possible misinformation, fact-check suggested."
        else:
            message = "❌ Likely FAKE!"

        return jsonify({
            "similarity_score": similarity_score,
            "message": message,
            "related_posts": top_posts
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==== Run the Flask App ====
if __name__ == "__main__":
    app.run(debug=True)
