import i18n
import streamlit as st

from utils.init import init_once


if __name__ == '__main__':
    # Init
    init_once()

    # Show title
    st.title(i18n.t('common.title'))

    # Show page description
    st.write(i18n.t('common.description'))

    # Show github link
    st.write(f'* Github: {i18n.t('common.github')}')
