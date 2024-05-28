import os
import dotenv
import streamlit as st
from streamlit.errors import StreamlitAPIException

from utils.locales import init_i18n
from utils.settings import Settings


def _init() -> Settings:
    # Load environment variables from dotenv file
    dotenv.load_dotenv()

    # Load locales
    init_i18n()

    # Configure page
    try:
        st.set_page_config(
            page_title='MobileX | Experience Lab',
            layout='wide',
            initial_sidebar_state='auto',
        )
    except StreamlitAPIException:
        pass

    # Load settings
    return Settings()


def init_once() -> Settings:
    # Enable cache on headless mode (~production)
    if os.environ.get('STREAMLIT_IS_PRODUCTION', 'false') == 'true':
        @st.cache_resource
        def _init_once():
            return _init()
    else:
        _init_once = _init

    return _init_once()
