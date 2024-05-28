from typing import Literal

from pydantic import BaseModel, Field


class InputModel(BaseModel):
    latest_news: str = Field(
        default='태풍 노루가 한국에 상륙',
    )

    llm_type: Literal['chatgpt', 'huggingface'] = Field(
        alias='Large Language Model Type',
        description='사용할 LLM 종류',
        default='chatgpt',
    )


class OutputModel(BaseModel):
    output: str = Field(
        description='이걸 사라',
    )
