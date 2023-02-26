import { config } from "../../wdio.conf.js"

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    */
    open () {
        return browser.url(config.baseUrl);
    }

    /**
    * Accepts an alert
    */
    async acceptAlert () {
        const isAlertOpen = await browser.isAlertOpen();
        isAlertOpen && await browser.acceptAlert();
    }

    async refresh () {
        await browser.refresh();
    }
}
