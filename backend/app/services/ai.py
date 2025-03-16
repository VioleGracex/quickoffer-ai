import openai
import logging
from app.core.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set the OpenAI API key from settings
openai.api_key = settings.OPENAI_API_KEY

async def generate_proposal_text(client_info, template_text, product_data_text, selected_products, model="gpt-4-turbo", api="openai"):
    # Construct the educational prompt in Russian with a persona
    prompt = f"""
    Персона:
    Имя: {client_info.get('name', '')}
    Компания: {client_info.get('company', '')}
    ИНН: {client_info.get('inn', '')}
    Скидка: {client_info.get('discount', '')}
    Описание: {client_info.get('description', '')}
    
    Текст шаблона: {template_text}
    Данные о продуктах: {product_data_text}
    
    Выбранные продукты: {", ".join(selected_products)}
    
    Пожалуйста, создайте убедительный текст предложения.
    
    Учебное задание:
    Представьте, что вы готовите коммерческое предложение для клиента, который ищет лучшее предложение для своей компании. Включите в текст ключевые преимущества, уникальные предложения и возможные скидки. Текст должен быть профессиональным, лаконичным и убедительным.
    
    ===
    
    Начните текст предложения ниже:
    """

    # Log and print when generation is started
    logger.info("Starting proposal text generation.")
    print("Starting proposal text generation.")

    if api == "openai":
        response = openai.Completion.create(
            engine=model,
            prompt=prompt,
            max_tokens=500,
            stop=["==="]
        )
    elif api == "deepseek":
        from deepseek import DeepSeek
        client = DeepSeek(api_key=settings.DEEPSEEK_API_KEY)
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": prompt},
            ],
            stream=False
        )
    else:
        raise ValueError("Unsupported API provider")

    return response.choices[0].message.content.strip() if api == "deepseek" else response.choices[0].text.strip()