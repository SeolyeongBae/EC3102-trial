from models.interview_simulator import InputModel, OutputModel
from utils.page import PageModel


def execute(
    page: PageModel,
    key: str,
    model: InputModel,
) -> OutputModel | None:
    return page.settings.client.call(
        function=page.function,
        input=model,
        output_model=OutputModel,
    )
