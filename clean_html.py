import os
import re

# Comprehensive emoji pattern
emoji_pattern = re.compile(r'[\U0001f300-\U0001f9ff\U0001fa70-\U0001faff\u2600-\u26ff\u2700-\u27bf\U0001f600-\U0001f64f\U0001f680-\U0001f6ff]', re.UNICODE)
dash_pattern = re.compile(r'\s?[—–]\s?')

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove emojis
            content = emoji_pattern.sub('', content)
            
            # Remove travessões
            content = dash_pattern.sub(' ', content)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Processed {path}')
