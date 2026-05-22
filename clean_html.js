const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                processFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove emojis
            // Match typical emojis
            const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu;
            content = content.replace(emojiRegex, '');

            // Remove travessões (— and –)
            content = content.replace(/\s?[—–]\s?/g, ' ');

            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Processed: ${fullPath}`);
        }
    }
}

processFiles(__dirname);
