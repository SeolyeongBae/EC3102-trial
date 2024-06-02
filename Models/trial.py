from typing import Dict, List, Literal

from pydantic import BaseModel, Field


class InputModel(BaseModel):
    target_company: str = Field(
        default='Samsung SDS',
    )
    target_job: Literal[
        'Backend Developer',
        'Frontend Developer',
        'AI Researcher',
        'Cloud Engineer',
    ] = Field(
        default='Backend Developer',
    )
    expertisement: Literal[
        'Newbie',
        'Junior (~2 year)',
        'Normal (2~10 year)',
        'Senior (10~ year)',
    ] = Field(
        default='Newbie',
    )
    language: Literal[
        'English',
        'Korean',
    ] = Field(
        default='Korean',
    )

    llm_type: Literal['chatgpt', 'huggingface'] = Field(
        alias='Large Language Model Type',
        description='사용할 LLM 종류',
        default='chatgpt',
    )


class TrialModel(BaseModel):
    evidence: str = Field(
        description='Evidences',
    )
    background: str = Field(
        description='Background story of the trial',
    )
    scripts: List[Dict[str, str]] = Field(
        description='List of scripts with character and text',
    )