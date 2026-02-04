const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
    const chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless=new']
    });
    
    const options = {
        port: chrome.port,
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
        preset: 'desktop'
    };
    
    console.log('Running Lighthouse audit...');
    const result = await lighthouse('https://beamacademy.com.au', options);
    
    const report = JSON.parse(result.report);
    
    console.log('\n=== Desktop Lighthouse Results ===\n');
    console.log('Performance:', Math.round(report.categories.performance.score * 100));
    console.log('Accessibility:', Math.round(report.categories.accessibility.score * 100));
    console.log('Best Practices:', Math.round(report.categories['best-practices'].score * 100));
    
    // Core Web Vitals
    const audits = report.audits;
    console.log('\n--- Core Web Vitals ---');
    console.log('LCP:', audits['largest-contentful-paint'].displayValue);
    console.log('CLS:', audits['cumulative-layout-shift'].displayValue);
    console.log('FID:', audits['max-potential-fid'] ? audits['max-potential-fid'].displayValue : 'N/A');
    console.log('Speed Index:', audits['speed-index'].displayValue);
    console.log('FCP:', audits['first-contentful-paint'].displayValue);
    console.log('TBT:', audits['total-blocking-time'].displayValue);
    
    // LCP element
    if (audits['largest-contentful-paint-element']) {
        console.log('\nLCP Element:', audits['largest-contentful-paint-element'].details?.items?.[0]?.node?.snippet || 'N/A');
    }
    
    // Render-blocking resources
    if (audits['render-blocking-resources']) {
        const blocking = audits['render-blocking-resources'];
        console.log('\nRender-blocking resources:', blocking.details?.items?.length || 0);
        if (blocking.details?.items?.length > 0) {
            blocking.details.items.forEach(item => {
                console.log('  -', item.url);
            });
        }
    }
    
    await chrome.kill();
    
    return {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        bestPractices: Math.round(report.categories['best-practices'].score * 100),
        lcp: audits['largest-contentful-paint'].numericValue,
        cls: audits['cumulative-layout-shift'].numericValue,
        fcp: audits['first-contentful-paint'].numericValue,
        tbt: audits['total-blocking-time'].numericValue,
        speedIndex: audits['speed-index'].numericValue
    };
}

runLighthouse().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
