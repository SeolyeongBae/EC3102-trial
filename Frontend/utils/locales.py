import i18n


def init_i18n() -> None:
    i18n.load_path.append('./locales')
    i18n.set('available_locales', ['en-US'])
    i18n.set('file_format', 'yaml')
    i18n.set('filename_format', '{namespace}.{format}')
    i18n.set('locale', 'en-US')
    i18n.set('skip_locale_root_data', True)
    i18n.set('use_locale_dirs', True)
