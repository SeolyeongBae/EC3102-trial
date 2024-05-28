import os

from fastapi import APIRouter

from llm.chat import build as build_chat
from llm.image import build as build_drawer
from llm.store import LLMStore
from models.anime_characterize import InputModel, OutputModel

# Configure API router
router = APIRouter(
    tags=['functions'],
)

# Configure metadata
NAME = os.path.basename(__file__)[:-3]

# Configure resources
store = LLMStore()

###############################################
#                   Actions                   #
###############################################


@router.post(f'/func/{NAME}')
async def call_acrostic_generator(model: InputModel) -> OutputModel:
    # Create a LLM chain
    chain = build_chat(
        name=NAME,
        llm=store.get(model.llm_type),
    )

    input = f'''
        # About Charactor
        * Animation name: {model.animation}
        * Charactor name: {model.target_charactor}
        * Charactor's current situation: {model.situation}

        # About Me
        * User's Charactor name: {model.my_charactor}

        # User's Talk
        {model.context}
    '''
    output = chain.invoke({
        'input_context': input,
    })

    drawer = build_drawer(
        name=NAME,
        chain=chain,
    )
    image_url = drawer.draw(input, output)

    return OutputModel(
        image_url=image_url,
        output=output,
    )
