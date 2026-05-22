import os
import re

integrations_full = "PDV, Delivery, Avaliações, Redes sociais, ERP (Enterprise)"

replacements_all_files = {
    # Mega Menu
    "Conecte PDV, delivery e ERPs": f"Conecte {integrations_full}",
}

replacements_product_pages = {
    # produto-chat.html
    "PDV, delivery e ERP.": f"{integrations_full}.",
    "PDV, delivery (iFood, Rappi), estoque, ERP e avaliações.": f"{integrations_full}.",
    "Sem SQL, sem campos de filtro.": "Sem planilhas difíceis, sem relatórios complicados.",
    "identificar uma anomalia": "identificar um problema",
    "memória de contexto operacional": "memória da sua operação",
    "Benchmark interno": "Comparação entre lojas",
    "Quanto mais integrations ativas": "Quanto mais integrações ativas",
    
    # produto-gestao.html (educated guesses, will refine if I check them)
    "Governança Corporativa": "Controle e Padronização",
    "matriz de permissões": "controle de acessos",
    "compliance": "padrões",
    "anomalias": "problemas",
    "DRE": "resultados financeiros",

    # produto-insightsealertas.html
    "Machine Learning": "Inteligência",
    "Inteligência Artificial": "IA",
    "algoritmos de inteligência artificial": "IA",
    "modelos preditivos": "previsões inteligentes",
    "análise heurística": "análise automática",
    "dashboard analítico": "painel de resultados",

    # produto-integracoes.html
    "APIs RESTful": "sistemas integrados",
    "webhooks em tempo real": "sincronização imediata",
    "arquitetura de microsserviços": "estrutura flexível",
    "pipelines de dados": "fluxo de informações",

    # produto-paineis.html
    "BI Tradicional": "Planilhas manuais",
    "Business Intelligence": "Análise de dados",
    "ETL": "processamento de dados",
    "cubos OLAP": "tabelas complexas",

    # produto-tarefas.html
    "workflows": "fluxos de trabalho",
    "SLA de atendimento": "tempo de resposta",
    "kanban boards": "quadro de tarefas",
}

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Apply global replacements
            for old, new in replacements_all_files.items():
                content = content.replace(old, new)
                
            # Apply product-specific replacements
            if file.startswith('produto-') or file == 'ajuda.html' or file == 'index.html':
                for old, new in replacements_product_pages.items():
                    # case-insensitive-ish replacement for complex terms
                    pattern = re.compile(re.escape(old), re.IGNORECASE)
                    content = pattern.sub(new, content)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Processed complex terms in {path}')
