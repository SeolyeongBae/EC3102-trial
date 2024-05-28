from typing import Literal

from pydantic import BaseModel, Field

MAX_LENGTH = 3


class InputModel(BaseModel):
    word: str = Field(
        alias='word',
        description='삼행시에 사용될 초성 단어를 입력해주세요!',
        default='지스트',
        min_length=MAX_LENGTH,
        max_length=MAX_LENGTH,
        pattern=rf'^[a-z|가-힣]{{{MAX_LENGTH}}}$',
    )

    llm_type: Literal['chatgpt', 'huggingface'] = Field(
        alias='Large Language Model Type',
        description='사용할 LLM 종류',
        default='chatgpt',
    )


class OutputModel(BaseModel):
    output: str = Field(
        description='삼행시 결과물',
    )
