import openai
import logging
from app.core.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def generate_proposal_text(client_info, template_text, product_data_text, selected_products, model="gpt-4-turbo", api="openai"):
    """Генерация текста коммерческого предложения с OpenAI или DeepSeek."""

    prompt = f"""
    Персона:
    Имя: Менеджер по продажам
    Компания: {client_info.get('companyName', '')}
    Юридический адрес: {client_info.get('legalAddress', '')}
    ИНН: {client_info.get('inn', '')}
    Расчетный счет: {client_info.get('bankAccount', '')}
    Название банка: {client_info.get('bankName', '')}
    Название клиента: {client_info.get('clientName', '')}
    Контактное лицо: {client_info.get('contactPerson', '')}
    Название продукта: {client_info.get('productName', '')}
    Тариф: {client_info.get('pricingPlan', '')}
    Количество лицензий: {client_info.get('quantity', '')}
    
    Текст шаблона: {template_text}
    Данные о продуктах: {product_data_text}
    
    Выбранные продукты: {", ".join(selected_products)}
    
    Пожалуйста, создайте убедительный текст предложения.
    
    Учебное задание:
    Представьте, что вы готовите коммерческое предложение для клиента, который ищет лучшее предложение для своей компании. Включите в текст ключевые преимущества, уникальные предложения и возможные скидки. Текст должен быть профессиональным, лаконичным и убедительным.
    
    ===
    
    Начните текст предложения ниже:
    """

    logger.info("📌 Начало генерации коммерческого предложения.")
    logger.debug(f"📄 Сгенерированный prompt:\n{prompt}")

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
        else:
            raise ValueError("❌ Неподдерживаемый API: используйте 'openai' или 'deepseek'.")

        return response.choices[0].message.content.strip()

    except openai.OpenAIError as e:
        logger.error(f"⚠ Ошибка при генерации текста: {str(e)}")
        raise RuntimeError(f"Ошибка генерации: {str(e)}")

    except Exception as e:
        logger.error(f"❌ Непредвиденная ошибка: {str(e)}")
        raise RuntimeError(f"Ошибка генерации текста: {str(e)}")
