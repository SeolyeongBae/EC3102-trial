from dotenv import load_dotenv
import uuid
from openai import OpenAI
import os
from . import firebase
import json
import random

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
        "text": "the speech of the judge, should include the winner of the trial",
        "winner": "prosecutor | lawyer"
    }}
    '''

def initialize_game():
    
    with open("assets/trial-data.json", "r") as f:
        trial_data = json.load(f)
        random_trial = random.choice(trial_data)

    trial_id = str(uuid.uuid4())

    data = {
        "trial_id": trial_id,
        "description": random_trial["description"],
        "evidences": random_trial["evidences"],
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
        messages.append({"role": "user", "content": f"What {role} should say? Please respond in Korean."})

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
        prompt = "lawyer는 검사의 주장에 이의를 제기하려고 합니다. lawyer는 뭐라고 말할까요? 한국어로 작성해주세요."
    elif action == "받아랏":
        prompt = "lawyer는 증거를 이용해 검사의 주장을 반박하려고 합니다. lawyer는 뭐라고 말할까요? 한국어로 작성해주세요."

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