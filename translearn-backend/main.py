from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import deepl
import os

DEEPL_API_AUTH=os.getenv("DEEPL_API_AUTH")
DEEPL_URL=os.getenv("DEEPL_URL")

class Text(BaseModel):
    text: str = Query(min_length=1, max_length=34)

origins = ["*"]
    
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello There": "General Kenobi"}

@app.post("/translate")
def translate(text: Text):
    translator = deepl.Translator(DEEPL_API_AUTH)
    result = translator.translate_text(text.text, target_lang="PL")
    print(result.detected_source_lang)
    if result.detected_source_lang != "EN":
        result = translator.translate_text(text.text,source_lang="PL", target_lang="EN-GB")
    translation: Text = Text(text=result.text)
    return translation

@app.get("/words_left")
def get_words_left():
    translator = deepl.Translator(DEEPL_API_AUTH)
    usage = translator.get_usage()._character
    return usage.limit - usage.count
