import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get imgLoader () {
        return $('#LoaderImg');
    }

    get btnAddNewProject () {
        return $("//td[@class='ProjItemContent' and text()='Add New Project']");
    }

    get inputAddNewProject () {
        return $('#NewProjNameInput');
    }

    get btnAddNewProjectName () {
        return $('#NewProjNameButton');
    }

    get btnCurrentSelectedProject () {
        return $('.ProjectSelected');
    }

    get btnProjectEdit () {
        return $("//ul[@id='projectContextMenu']/li[@class='edit']/a");
    }

    get inputProjectEdit () {
        return $("(//div[@id='ProjectEditDiv'])[1]/input");
    }

    get btnProjectEditSave () {
        return $("(//div[@id='ProjectEditDiv'])[1]/img[@id='ItemEditSubmit']");
    }

    get btnProjectEditCancel () {
        return $("(//div[@id='ProjectEditDiv'])[1]/img[@id='ItemEditCancel']");
    }

    get btnProjectDelete () {
        return $('#ProjShareMenuDel');
    }

    get inputAddNewItem () {
        return $('#NewItemContentInput');
    }

    get btnAddNewItem () {
        return $ ('#NewItemAddButton');
    }

    get checkboxTodoItem () {
        return $$("//ul[@id='mainItemList']//input[@id='ItemCheckBox']");
    }

    get checkboxDoneItem () {
        return $$("//ul[@id='mainDoneItemList']//input[@id='ItemCheckBox']");
    }

    get btnDeleteAllItems () {
        return $('#DoneItemsDeleteLink');
    }

    get btnShowDoneItems () {
        return $("//a[contains(text(), 'Done Items')]");
    }

    get divProjectTitle () {
        return $('#CurrentProjectTitle');
    }

    get btnRecycleBin () {
        return $("//div[@id='ItemId_-3']");
    }

    get btnRecycleBinContext () {
        return $("//div[@id='ItemId_-3']//img");
    }

    get btnEmptyRecycleBin () {
        return $("//ul[@id='recycleContextMenu']//a");
    }

    get btnLogout () {
        return $('#ctl00_HeaderTopControl1_LinkButtonLogout');
    }

    get infoMessageText () {
        return $("#InfoMessageText");
    }
    
    getBtnProjectContext (projectName) {
        return $(`//td[text()='${projectName}']/ancestor::table[@class='ProjItemTable']//img[@title='Options']`);
    }

    getProjectTd (projectName) {
        return $(`//div[@id='ProjectListPlaceHolder']//td[text()='${projectName}']`);
    }

    getItemDiv (itemName) {
        return $(`//div[@class='ItemContentDiv' and text()='${itemName}']`)
    }

    /**
     * Creates a new project in Todo.ly
     * @param {string} projectName The name of the project to be created
     * @param {bool} firstTime Whether to click on the new project button or not
     */
    async createProject (projectName, firstTime = false) {
        if(firstTime) {
            await this.btnAddNewProject.waitForClickable();
            await this.btnAddNewProject.click();
        }

        await this.btnAddNewProjectName.waitForEnabled();
        await this.inputAddNewProject.clearValue();
        await this.inputAddNewProject.setValue(projectName);
        await this.btnAddNewProjectName.click();
    }

    /**
     * Deletes a given project in todo.ly
     * @param {string} projectName The name of the project to be deleted
     */
    async deleteProject (projectName) {
        await this.getProjectTd(projectName).waitForClickable();
        await this.getProjectTd(projectName).moveTo();
        await this.getBtnProjectContext(projectName).click();
        await this.btnProjectDelete.click();
        await this.acceptAlert();
    }

    /**
     * Creates a new item for the project in todo.ly
     * @param {string} itemName The name of the item to be created
     */
    async createItem (itemName) {
        await this.btnAddNewItem.waitForEnabled();
        await this.inputAddNewItem.clearValue();
        await this.inputAddNewItem.setValue(itemName);
        await this.btnAddNewItem.click();
    }

    /**
     * Waits for a request to finish in todo.ly
     */
    async waitForRequest () {
        await this.imgLoader.waitForDisplayed({ timeout: 5000, reverse: true});
    }
}

export default new HomePage();
