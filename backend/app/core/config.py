from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str
    ALGORITHM: str
    OPENAI_API_KEY: str  # Add the OpenAI API key here
    DEEPSEEK_API_KEY: str  # Add the DeepSeek API key here
    AUTH0_DOMAIN: str  # Add the Auth0 domain here
    AUTH0_API_AUDIENCE: str  # Add the Auth0 API audience here
    AUTH0_ALGORITHMS: list[str] = ["RS256"]  # Add the Auth0 algorithms here

    class Config:
        env_file = ".env"

settings = Settings()