from typing import Literal
from pydantic import BaseModel, Field

from utils.settings import Settings


class PageModel(BaseModel):
    settings: Settings

    input: str = Field(description='page function inputs model name')
    function: str = Field(description='page function name')
    output_type: Literal['json', 'none', 'pydantic'] = Field(
        description='whether to show outputs',
        default='pydantic',
    )
