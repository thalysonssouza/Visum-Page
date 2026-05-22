import glob
import re

html_files = glob.glob("*.html")
for file in html_files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Remove from header
    content = re.sub(r"<a[^>]*href=[\"']planos\.html[\"'][^>]*>Planos</a>", "", content)
    
    # Remove from footer
    content = re.sub(r"<li>\s*<a[^>]*href=[\"']planos\.html[\"'][^>]*>Planos</a>\s*</li>", "", content)
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Processed {file}")
