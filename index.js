require('chromedriver')
const { Builder, By, Key } = require('selenium-webdriver');
const fs = require('fs');

const frontPageLogo = 'div.logofix > div.logofront';
const searchIcon = '#menu-apunavi-1 > li.astm-search-menu.astm-search-menu.is-menu.is-dropdown.menu-item > a';
const searchBox = '#menu-apunavi-1 > li.astm-search-menu.astm-search-menu.is-menu.is-dropdown.menu-item > form > label > input';
const programInfo = '#content > div:nth-child(7) > div > div > a';

(async function example(){
    // open a new browser window 
    let driver = await new Builder()
        .forBrowser('chrome').build();

    try {
        await driver.get('https://www.bc.fi');

        const title = await driver.getTitle();
        console.log(title);

        /* driver.findElements(By.css(frontPageLogo))
            .then(found => console.log('Element found? %s', !!found.length)); */

        const frontPageLogoFound = await driver.findElements(By.css(frontPageLogo));
        console.log('Found element: ' + Boolean(frontPageLogoFound.length));

        const searchIconFound = await driver.findElements(By.css(searchIcon));
        console.log('Found search Icon: ' + Boolean(searchIconFound.length));

        await driver.sleep(1000);
        await searchIconFound[0].click();
        await driver.sleep(1500);

        const searchBoxFound = await driver.findElements(By.css(searchBox));
        console.log('Found search box: ' + Boolean(searchBoxFound.length));

        await searchBoxFound[0].sendKeys('Margit');
        await driver.sleep(1500);

        await searchBoxFound[0].sendKeys(Key.RETURN);
        await driver.sleep(2000);

        const programInfoFound = await driver.findElements(By.css(programInfo));
        console.log('Found program info box: ' + Boolean(programInfoFound.length));

        /* programInfoFound[0].takeScreenshot(true).then(
            function(image, err) {
                require('fs').writeFile('out.png', image, 'base64', function(err) {
                    console.log(err);
                });
            }
        ); */
        
        const now = new Date();
        const screenShot = await programInfoFound[0].takeScreenshot(true);
        fs.writeFile('screenshot-' 
            + now.getMilliseconds() 
            + '.png', 
            screenShot, 
            'base64', 
            err => {
                console.log(err);
            });
    }

    catch (e) {
        console.log(e.message)
    }

    finally {
        await driver.sleep(2000); 
        await driver.quit(); 
    }
})();