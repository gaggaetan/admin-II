const { chromium } = require('playwright');
const fs = require('fs');

async function pause() {
    return new Promise(resolve => setTimeout(resolve, 300000)); // 30 seconds pause
}

async function saveHtml(url, filename) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        try{await page.goto(url, { waitUntil: 'networkidle' , timeout: 30000 });} catch (error){} // Wait until the network is idle

        let html = await page.content();

        // Remove line 4 (index 3) by splitting the string into lines, removing the fourth line, then joining the lines back
        const lines = html.split('\n');
        lines.splice(1, 1);
        html = lines.join('\n');

        // Save the modified HTML to a file
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

// Define the function to refresh every 5 minutes
async function refresh() {
    while (true) {
        await main(); // Call main function
        await pause(); // Pause for 5 minutes
    }
}

// Start the refresh loop
refresh();

