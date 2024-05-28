from pydantic import BaseModel

from utils.page import PageModel


def execute[InputModel: BaseModel](
    page: PageModel,
    key: str,
    model: InputModel,
) -> InputModel:
    return model
