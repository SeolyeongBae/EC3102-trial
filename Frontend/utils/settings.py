
from pydantic_settings import BaseSettings

from utils.client import MobileXClient


class Settings(BaseSettings):
    client: MobileXClient = MobileXClient()

    class Config:
        env_nested_delimiter = '__'
        env_prefix = 'FRONTEND_'
