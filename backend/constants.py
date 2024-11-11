from dotenv import load_dotenv
import os
load_dotenv()

SERVER_URL = 'https://ai-calc-backend.vercel.app'
PORT = '8900'
ENV = 'production'

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")