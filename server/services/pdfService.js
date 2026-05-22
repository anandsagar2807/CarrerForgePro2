const puppeteer = require('puppeteer');

exports.generatePDF = async (htmlContent) => {
    let browser;
    try {
        browser = await puppeteer.launch({ 
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Set viewport for better rendering
        await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
        
        // Set content and wait for it to load completely
        await page.setContent(htmlContent, { 
            waitUntil: ['networkidle0', 'domcontentloaded', 'load'] 
        });
        
        // Wait for fonts to load
        await page.evaluateHandle('document.fonts.ready');
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
            displayHeaderFooter: false,
            preferCSSPageSize: true
        });

        return pdfBuffer;
    } catch (error) {
        console.error('PDF Generation Error:', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
};
