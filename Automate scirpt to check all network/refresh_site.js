const { chromium } = require('playwright');
const fs = require('fs');

async function pause() {
    return new Promise(resolve => setTimeout(resolve, 300000));
}

async function saveHtml(url, filename) {

    const browser = await chromium.launch();
    console.log("start html browse");
    const page = await browser.newPage();

    try {
        try{await page.goto(url, { waitUntil: 'networkidle' , timeout: 30000 });} catch (error){}

        let html = await page.content();

        const lines = html.split('\n');
        lines.splice(1, 1);
        html = lines.join('\n');

        fs.writeFileSync(filename, html);
        console.log(`HTML saved to ${filename}`);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }
}

async function main() {
    const url = 'http://54.37.12.151:5000/refrech-site';
    const filename = 'templates/index.html';
    await saveHtml(url, filename);
}

async function refresh() {
    while (true) {
        await main();
        await pause();
    }
}

// Start the refresh loop
refresh();

