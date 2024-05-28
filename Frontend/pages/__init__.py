from typing import Protocol

import i18n
from pydantic import BaseModel
import streamlit as st
import streamlit_pydantic as sp

from models.base.image_preview import ImagePreviewModel
from utils.page import PageModel


class _Function(Protocol):
    def __call__(
        self,
        page: PageModel,
        key: str,
        model: BaseModel,
    ) -> BaseModel | None: ...


def render(model: PageModel) -> None:
    # Configure metadata
    key = f'/{model.function}/{model.input}'

    # Show title
    st.title(i18n.t(f'{model.function}.title'))

    # Load inputs model
    try:
        input_module = __import__(
            name=f'models.{model.input}',
            fromlist=['InputModel'],
        )
    except ModuleNotFoundError:
        raise ModuleNotFoundError(
            f'No module named {model.input!r} in \'models\'.',
        )
    if not hasattr(input_module, 'InputModel'):
        raise ImportError(
            f'\'InputModel\' class not defined on {model.input!r}.',
        )
    input_model = getattr(input_module, 'InputModel')

    # Collect inputs
    inputs = sp.pydantic_form(
        key=f'{key}/inputs',
        model=input_model,
    )
    if not inputs:
        return st.stop()

    # Load a function
    try:
        function_module = __import__(
            name=f'functions.{model.function}',
            fromlist=['execute'],
        )
    except ModuleNotFoundError:
        raise ModuleNotFoundError(
            f'No module named {model.function!r} in \'functions\'.',
        )
    if not hasattr(function_module, 'execute'):
        raise ImportError(
            f'\'execute\' function not defined on {model.function!r}.',
        )
    function: _Function = getattr(function_module, 'execute')

    # Call the function
    output_model: BaseModel | None = function(
        page=model,
        key=key,
        model=inputs,
    )
    if not output_model:
        return st.stop()

    # Preview the images
    if isinstance(output_model, ImagePreviewModel):
        st.image(str(output_model.image_url))

    # Show outputs
    match model.output_type:
        case 'json':
            st.write(output_model.model_json_schema())
        case 'none':
            pass
        case 'pydantic':
            sp.pydantic_output(output_model)
