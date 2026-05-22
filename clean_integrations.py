import os
import re

integrations_str = "PDV, Delivery, Avaliações, Redes sociais, ERP (Enterprise)"

replacements = {
    # Replace integration lists
    r"PDV, iFood, Rappi, ERP": integrations_str,
    r"PDV, delivery e ERP": integrations_str,
    r"iFood, PDV": integrations_str,
    r"PDV e delivery": integrations_str,
    r"sistemas legados": "sistemas antigos",
    r"API de integração customizada": "integração sob medida",
    r"normaliza dados": "padroniza os dados",
    # Pain points language simplification
    r"anomalias": "problemas operacionais",
    r"ruptura de estoque": "falta de produtos (ruptura)",
    r"reconciliar dados": "juntar dados manualmente",
    r"inconsistências": "furos nos dados"
}

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            for old, new in replacements.items():
                content = re.sub(old, new, content, flags=re.IGNORECASE)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Processed {path}')
