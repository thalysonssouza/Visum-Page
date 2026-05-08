import os

html_files = [
    "ajuda.html", "blog-post.html", "blog.html", "case-liveops.html", "cases.html",
    "historia.html", "index.html", "planos.html", "produto-chat.html", "produto-gestao.html",
    "produto-integracoes.html", "produto-paineis.html", "produto-tarefas.html", "comecar.html"
]

target_block = """                <div class="footer-logo-side">
                    <img src="assets/logo-visum.svg" alt="Visum" class="footer-visum-logo">
                    <h3><img src="assets/logo-trusted%202.svg" alt="Trusted"> Um produto Trusted</h3>
                </div>"""

replacement_block = """                <div class="footer-logo-side">
                    <img src="assets/logo-visum.svg" alt="Visum" class="footer-visum-logo">
                    <h3><img src="assets/logo-trusted%202.svg" alt="Trusted"> Um produto Trusted</h3>
                    <div class="newsletter-widget">
                        <h4 style="font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-main); margin-bottom: 0.75rem;">Assine nossa Newsletter</h4>
                        <form class="newsletter-form" onsubmit="event.preventDefault(); var msg = this.querySelector('.newsletter-message'); msg.textContent = 'Inscrição confirmada com sucesso!'; msg.classList.add('success'); this.reset();">
                            <div class="newsletter-input-group">
                                <input type="email" placeholder="Seu melhor e-mail" required>
                                <button type="submit" class="newsletter-btn" aria-label="Assinar">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                </button>
                            </div>
                            <div class="newsletter-message"></div>
                        </form>
                    </div>
                </div>"""

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We might have differences in spacing, so if exact match fails we can just try finding the h3
        if target_block in content:
            new_content = content.replace(target_block, replacement_block)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file} exactly")
        else:
            # Fallback block replacement
            start_marker = '<img src="assets/logo-visum.svg" alt="Visum" class="footer-visum-logo">'
            end_marker = '<h3><img src="assets/logo-trusted%202.svg" alt="Trusted"> Um produto Trusted</h3>'
            if start_marker in content and end_marker in content:
                # find the end of the h3
                idx = content.find(end_marker)
                if idx != -1:
                    insert_pos = idx + len(end_marker)
                    new_content = content[:insert_pos] + '\n' + """                    <div class="newsletter-widget">
                        <h4 style="font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-main); margin-bottom: 0.75rem;">Assine nossa Newsletter</h4>
                        <form class="newsletter-form" onsubmit="event.preventDefault(); var msg = this.querySelector('.newsletter-message'); msg.textContent = 'Inscrição confirmada com sucesso!'; msg.classList.add('success'); this.reset();">
                            <div class="newsletter-input-group">
                                <input type="email" placeholder="Seu melhor e-mail" required>
                                <button type="submit" class="newsletter-btn" aria-label="Assinar">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                </button>
                            </div>
                            <div class="newsletter-message"></div>
                        </form>
                    </div>""" + content[insert_pos:]
                    with open(file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {file} with fallback")
            else:
                print(f"Target block not found in {file}")
