        // Scroll-reveal chat box
        (function () {
            const container = document.getElementById('chatRevealContainer');
            const section = document.getElementById('chat-reveal-section');
            const cards = document.querySelectorAll('.visum-chat-card');
            if (!container || !section) return;

            function update() {
                const rect = section.getBoundingClientRect();
                const windowH = window.innerHeight;

                // progress = 0 at top, 1 at bottom of sticky section
                // rect.top is 0 when sticky starts, and goes negative up to -(rect.height - windowH)
                const scrollableDistance = rect.height - windowH;
                let rawProgress = -rect.top / scrollableDistance;
                const progress = Math.max(0, Math.min(1, rawProgress));

                // Image expands from 60% width / 60vh to 100% width / 100vh
                const widthPercent = 60 + (progress * 40);
                const heightVh = 60 + (progress * 40);
                const borderRadius = 24 - (progress * 24);

                container.style.width = `${widthPercent}%`;
                container.style.height = `${heightVh}vh`;
                container.style.borderRadius = `${borderRadius}px`;

                // Fade in cards based on progress
                cards.forEach((card, index) => {
                    // Stagger the reveal of cards
                    const startProgress = 0.2 + (index * 0.15);
                    const endProgress = startProgress + 0.2;
                    
                    if (progress >= startProgress) {
                        const cardProgress = Math.min(1, (progress - startProgress) / (endProgress - startProgress));
                        const translateY = 30 - (cardProgress * 30);
                        card.style.opacity = cardProgress;
                        card.style.transform = `translateY(${translateY}px)`;
                    } else {
                        card.style.opacity = 0;
                        card.style.transform = `translateY(30px)`;
                    }
                });
            }

            window.addEventListener('scroll', update, { passive: true });
            update();
        })();
