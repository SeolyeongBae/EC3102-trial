import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from dotenv import load_dotenv
import os

load_dotenv()

# Firebase 설정 파일 경로
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH")) # firebase 인증 key 저장되어 있는 주소 작성 바랍니다.

# Firebase 초기화
firebase_admin.initialize_app(cred)
db = firestore.client()

# Firebase에 데이터 저장하기
def save_data(trial_id, data):
    db.collection('trials').document(trial_id).set(data)

def update_data(trial_id, data):
    db.collection('trials').document(trial_id).update(data)

# Firebase에서 데이터 읽어오기
def read_data(trial_id):
    doc_ref = db.collection('trials').document(trial_id)
    doc = doc_ref.get()
    return doc.to_dict()