from dotenv import load_dotenv
import uuid
from openai import OpenAI
import os
from . import firebase
import json

load_dotenv()

client=OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

prosecutor_json_format = f'''
    {{
        "role": "prosecutor",
        "text": "the speech of the prosecutor",
    }}
    '''

lawyer_json_format = f'''
    {{
        "role": "lawyer",
        "text": "the speech of the lawyer",
    }}
    '''

judge_json_format = f'''
    {{
        "role": "judge",
        "text": "the speech of the judge",
        "winner": "prosecutor | lawyer"
    }}
    '''

def initialize_game():
    cases = {
        "도난 사건": {
            "judge_prompt": "당신은 공정한 판사입니다. 검사와 변호사의 주장을 듣고 더 타당한 주장을 판단하세요.",
            "prosecutor_prompt": ("존경하는 재판장님, 배심원 여러분. 오늘 저는 김철수가 박영희의 가방을 훔친 사건에 대해 다루고 있습니다. "
                                   "피고의 지문이 현장에서 발견되었고, CCTV 영상에 피고가 현장에 있음이 포착되었습니다. "
                                   "따라서 피고가 범죄를 저질렀음을 입증하겠습니다.")
        },
        "살인 사건": {
            "judge_prompt": "당신은 공정한 판사입니다. 검사와 변호사의 주장을 듣고 더 타당한 주장을 판단하세요.",
            "prosecutor_prompt": ("존경하는 재판장님, 배심원 여러분. 오늘 저는 이용수가 이순신을 살해한 혐의에 대해 다루고 있습니다. "
                                   "피고는 범행 현장에서 발견되었으며, 살해 현장에는 그의 지문과 DNA가 발견되었습니다. "
                                   "이에 기초하여 피고의 유죄를 입증하겠습니다.")
        },
        "서버실 에어컨 강제 종료 사건":{
            "judge_prompt": ("당신은 서버실 에어컨 강제 종료 사건의 부장판사를 맡았습니다."
                              "해당 사건은 GIST에 있는 EECS 서버실에서 일어났습니다."
                              "이는 에어컨을 교수님의 과도한 업무 지시로 인해 밤 늦게까지 일을 하던 한 대학원생이 끄고 나간 것이라 의심됩니다."
                              "이 사건과 관련된 검사와 변호사의 이야기를 듣고, 해당 대학원생에게 처벌이 합당할지 더 타당한 주장을 판단하세요."),
            "prosecutor_prompt":("당신은 서버실 에어컨 강제 종료 사건의 검사를 맡았습니다."
                              "해당 사건은 GIST에 있는 EECS 서버실에서 일어났습니다."
                              "이는 에어컨을 교수님의 과도한 업무 지시로 인해 밤 늦게까지 일을 하던 한 대학원생이 끄고 나간 것이라 의심됩니다."
                              "이 사건과 관련하여 대학원생의 잘못을 입증하기 위한 다양한 단서와 알리바이를 조합해 타당한 주장을 내세우세요."
                              "단, 이전에 이야기했던 주장을 반복하는 것은 안됩니다. 따라서 가장 처음 주장을 펼칠 때, 너무 많은 증거를 한 번에 내세우지는 마세요.")
        }
    }

    evidences = '''
증거물 1: 서버실 출입 기록
변호사: 서버실 출입 기록에 따르면 사건 발생 시간대에 박모 씨 외에도 서버실을 출입한 다른 사람이 있었다.
검사: 출입 기록은 박모 씨가 사건 발생 시간대에 서버실에 있었음을 명확히 하고 있으며, 다른 사람의 출입은 시간대가 다르다.
증거물 2: CCTV 영상
변호사: CCTV 영상에서 박모 씨는 에어컨을 끄는 행동을 하지 않았으며, 다른 사람이 에어컨 근처에 접근하는 모습이 포착되었다.
검사: CCTV 영상에는 박모 씨가 서버실에서 나가는 모습만 잡혀 있으며, 에어컨을 끄는 장면은 직접적으로 포착되지 않았으나 박모 씨가 마지막 출입자다.
증거물 3: 에어컨 원격 제어 로그
변호사: 에어컨이 사건 당시 원격으로 제어된 기록이 있으며, 박모 씨가 원격 제어를 할 수 있는 권한이 없었다.
검사: 원격 제어 로그는 사건 발생 시간에 에어컨이 수동으로 꺼졌음을 나타내며, 이는 서버실 내부에서 조작된 것이다.
증거물 4: 박모 씨의 알리바이
변호사: 박모 씨는 사건 시간에 다른 장소에서 동료와 함께 있었으며, 이 동료가 이를 증언해줄 수 있다.
검사: 박모 씨의 알리바이는 불충분하며, 동료의 증언은 사건 발생 시간을 정확히 기억하지 못한다.
증거물 5: 에어컨 조작 패널의 지문
변호사: 에어컨 조작 패널에서 박모 씨의 지문 외에도 다른 사람의 지문이 발견되었다.
검사: 에어컨 조작 패널에서 박모 씨의 지문이 가장 선명하게 나타나며, 이는 박모 씨가 에어컨을 조작했음을 시사한다.'''

    trial_id = str(uuid.uuid4())

    data = {
        "trial_id": trial_id,
        "description": "2024년 5월 15일 밤, GIST(광주과학기술원) EECS(전자공학 및 컴퓨터공학) 서버실에서 서버실 에어컨이 강제 종료되는 사건이 발생했습니다. 이로 인해 서버 과열로 중요한 연구 데이터가 손상되었습니다. 사건 당시, 서버실은 대학원생 박모 씨가 마지막으로 사용한 것으로 확인되었습니다. 박모 씨는 교수님의 과도한 업무 지시로 인해 밤 늦게까지 업무를 수행하던 중이었으며, 에어컨을 끄고 서버실을 떠났다는 의심을 받고 있습니다.",
        "evidences": evidences,
        "scripts": [],
        "prosecutor_life": 3,
        "lawyer_life": 3,
    }
        
    firebase.save_data(trial_id, data)

    return data


def get_trial(trial_id):
    return firebase.read_data(trial_id)

# LLM을 호출하는 함수
def get_response(role, trial, content=None):

    if role == "prosecutor":
        json_format = prosecutor_json_format
    elif role == "lawyer":
        json_format = lawyer_json_format
    elif role == "judge":
        json_format = judge_json_format

    messages = [{"role": "system", "content": f"You are a {role}. Please respond to the following conversation. Response in json format. The format is as follows: " + json_format},]

    messages.append({"role": "system", "content": f"Prior knowledge - trial description: {trial["description"]}"})

    messages.append({"role": "system", "content": f"Prior knowledge - evidences: {trial["evidences"]}"})

    messages.append({"role": "system", "content": f"Prior knowledge - scripts: {trial['scripts']}"})

    if content:
        messages.append({"role": "user", "content": content})
    else:
        messages.append({"role": "user", "content": f"What {role} should say?"})

    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={ "type": "json_object" },
        messages=messages
    )

    return json.loads(response.choices[0].message.content)


def generate_prosecutor(trial_id):

    trial = firebase.read_data(trial_id)

    response = get_response("prosecutor", trial)

    trial["scripts"].append(response)
    
    firebase.update_data(trial_id, trial)

    return trial


def post_lawyer_script(trial_id, script):
    trial = firebase.read_data(trial_id)

    trial["scripts"].append({"role": "lawyer", "text": script})

    firebase.update_data(trial_id, trial)

    return trial

def generate_lawyer(trial_id, action):
    trial = firebase.read_data(trial_id)

    if action == "이의있음":
        prompt = "lawyer는 검사의 주장에 이의를 제기하려고 합니다. lawyer는 뭐라고 말할까요?"
    elif action == "받아랏":
        prompt = "lawyer는 증거를 이용해 검사의 주장을 반박하려고 합니다. lawyer는 뭐라고 말할까요?"

    response = get_response("lawyer", trial, prompt)

    trial["scripts"].append(response)

    firebase.update_data(trial_id, trial)

    return trial


def generate_judge(trial_id):
    trial = firebase.read_data(trial_id)

    response = get_response("judge", trial)

    if response["winner"] == "prosecutor":
        trial["lawyer_life"] -= 1
    elif response["winner"] == "lawyer":
        trial["prosecutor_life"] -= 1

    trial["scripts"].append(response)

    firebase.update_data(trial_id, trial)

    return trial