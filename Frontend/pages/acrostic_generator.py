import os

import pages
from utils.page import PageModel
from utils.init import init_once


if __name__ == '__main__':
    # Init
    settings = init_once()

    # Configure metadata
    name = os.path.basename(__file__)[:-3]

    # Configure home page
    model = PageModel(
        settings=settings,
        input=name,
        function=name,
        output_type='pydantic',
    )

    # Draw
    pages.render(model)
