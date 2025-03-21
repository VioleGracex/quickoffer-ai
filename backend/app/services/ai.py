import openai
import logging
from app.core.config import settings
from yandex_cloud_ml_sdk import YCloudML

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def generate_proposal_text(additional_prompt, template_text, product_data_text, selected_products, model="deepseek-chat", api="deepseek"):
    """Генерация текста коммерческого предложения с OpenAI, DeepSeek или Yandex GPT."""

    prompt = f"""
    {additional_prompt}  # Add additional prompt here
    Текст шаблона: {template_text}
    Данные о продуктах: {product_data_text}
    
    Выбранные продукты: {", ".join(selected_products)}

    Пожалуйста, найдите и используйте следующие значения, если они присутствуют в тексте шаблона:
    - Название компании 
    - Юридический адрес 
    - ИНН 
    - Расчетный счет 
    - Название банка 
    - Название клиента 
    - Контактное лицо 
    - Название продукта 
    - Тариф 
    - Количество лицензий 
    
    Пожалуйста, создайте убедительный текст предложения, используя профессиональный коммерческий русский язык, правильную грамматику и российские бизнес-термины.
    
    Учебное задание:
    Представьте, что вы готовите коммерческое предложение для клиента, который ищет лучшее предложение для своей компании. Включите в текст ключевые преимущества, уникальные предложения и возможные скидки. Текст должен быть профессиональным, лаконичным и убедительным.
    
    ===
    
    Начните текст предложения ниже:
    """

    logger.info("📌 Начало генерации коммерческого предложения.")
    logger.debug(f"📄 Сгенерированный prompt:\n{prompt}")

    # Printf-like functionality for the prompt
    print(f"Generated prompt:\n{prompt}")

    try:
        if api == "openai":
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "Вы менеджер в компании и готовите коммерческое предложение для клиента. Текст должен быть профессиональным, лаконичным и убедительным."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=500,
                stop=["==="]
            )
        elif api == "deepseek":
            client = openai.OpenAI(api_key=settings.DEEPSEEK_API_KEY, base_url="https://api.deepseek.com/v1")
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "Вы менеджер в компании и готовите коммерческое предложение для клиента. Текст должен быть профессиональным, лаконичным и убедительным."},
                    {"role": "user", "content": prompt},
                ],
                stream=False
            )
        elif api == "yandex":
            sdk = YCloudML(folder_id="b1gpnbjii14cs5phf9of", auth=settings.YANDEX_API_KEY)
            model = sdk.models.completions("yandexgpt", model_version="rc")
            model = model.configure(temperature=0.3)
            result = model.run(
                [
                    {"role": "system", "text": "Вы менеджер в компании и готовите коммерческое предложение для клиента. Текст должен быть профессиональным, лаконичным и убедительным."},
                    {"role": "user", "text": prompt},
                ]
            )
            response_text = result[0]["text"]
        else:
            raise ValueError("❌ Неподдерживаемый API: используйте 'openai', 'deepseek' или 'yandex'.")

        if api == "yandex":
            return response_text.strip()
        else:
            return response.choices[0].message.content.strip()

    except openai.OpenAIError as e:
        logger.error(f"⚠ Ошибка при генерации текста: {str(e)}")
        raise RuntimeError(f"Ошибка генерации: {str(e)}")

    except Exception as e:
        logger.error(f"❌ Непредвиденная ошибка: {str(e)}")
        raise RuntimeError(f"Ошибка генерации текста: {str(e)}")