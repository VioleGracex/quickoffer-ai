import openai

async def generate_proposal_text(client_info, template_text, product_data_text, selected_products):
    # Construct the prompt with the provided information
    prompt = f"""
    Client Information:
    Name: {client_info.get('name', '')}
    Company: {client_info.get('company', '')}
    INN: {client_info.get('inn', '')}
    Discount: {client_info.get('discount', '')}
    Description: {client_info.get('description', '')}
    
    Template Text: {template_text}
    Product Data: {product_data_text}
    
    Selected Products: {", ".join(selected_products)}
    
    Please generate a compelling proposal text.
    """
    
    response = openai.Completion.create(
        engine="davinci-codex",
        prompt=prompt,
        max_tokens=500
    )
    
    return response.choices[0].text.strip()