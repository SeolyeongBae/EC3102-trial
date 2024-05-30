from dotenv import load_dotenv

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

    

    return cases


# LLM을 호출하는 함수
def get_response(role, content, examples=None):
    messages = [{"role": "system", "content": f"You are a {role}."}]

    if examples:
        for example in examples:
            messages.append({"role": "system", "content": example["system"]})
            messages.append({"role": "user", "content": example["user"]})
            messages.append({"role": "assistant", "content": example["assistant"]})

    messages.append({"role": "user", "content": content})

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=messages
    )
    return response['choices'][0]['message']['content']


