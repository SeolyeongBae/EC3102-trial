from typing import Literal

from pydantic import BaseModel, Field

from models.base.image_preview import ImagePreviewModel


class InputModel(BaseModel):
    animation: str = Field(
        description='애니 제목',
        default='소드아트온라인 1부',
    )
    my_charactor: str = Field(
        description='캐릭터 이름',
        default='키리토',
    )
    target_charactor: str = Field(
        description='캐릭터 이름',
        default='아스나',
    )
    situation: str = Field(
        description='캐릭터가 처한 상황',
        default='못된 길드한테 낚여서 전재산 다 털릴 위기',
    )

    context: str = Field(
        description='내 대사',
        default='이런 나쁜 자식들!',
    )

    llm_type: Literal['chatgpt', 'huggingface'] = Field(
        alias='Large Language Model Type',
        description='사용할 LLM 종류',
        default='chatgpt',
    )


class OutputModel(ImagePreviewModel):
    output: str = Field(
        description='응답',
    )
