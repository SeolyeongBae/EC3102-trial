import datetime
import firebase_admin
from firebase_config import db
from firebase_admin import credentials, db

# Firebase 설정 파일 경로
cred = credentials.Certificate("Your firebase verification key here") # firebase 인증 key 저장되어 있는 주소 작성 바랍니다.

# Firebase 초기화
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://ec3102-cfed4-default-rtdb.asia-southeast1.firebasedatabase.app/'
})


def save_data(prosecutor_statement, player_statement, judge_decision):
    ref = db.reference('game_logs')
    log_entry = {
        'timestamp': datetime.datetime.now().isoformat(),
        'prosecutor_statement': prosecutor_statement,
        'player_statement': player_statement,
        'judge_decision': judge_decision
    }
    ref.push(log_entry)


def read_data(path):
    ref = db.reference(path)
    data = ref.get()
    return data