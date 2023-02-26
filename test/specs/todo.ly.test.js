import LoginPage from '../pageobjects/login.page.js';
import HomePage from '../pageobjects/home.page.js';
import allureReporter from '@wdio/allure-reporter';
import { config } from '../../wdio.conf.js';

const generateRandomString = () => Date.now().toString()

describe('Todo.ly', () => {

    before(() => LoginPage.open());
    let context = new Object();

    it('should verify title, url, and elements', async () => {
        allureReporter.addFeature('VerifyLoginPage');
        allureReporter.addSeverity('critical');

        await expect(browser).toHaveTitle('Todo.ly Simple Todo List');
        await expect(browser).toHaveUrl('https://todo.ly/');
        await expect(LoginPage.btnLogin).toBeDisplayed();
    });

    it('should login with valid credentials', async () => {
        allureReporter.addFeature('Login');

        console.log("Logging in..");
        await LoginPage.login(config.user, config.key);

        await expect(HomePage.btnLogout).toBeExisting();
        await expect(HomePage.divProjectTitle).toHaveText("Inbox");
    });

    it('should create a new project and delete it', async () => {
        allureReporter.addSeverity('critical');
        
        console.log("Creating 1º project..");
        const projectName = generateRandomString();
        await HomePage.createProject(projectName, true);

        await expect(HomePage.getBtnProjectContext(projectName).toBeDisplayed());

        console.log("Deleting 1º project..");
        await HomePage.deleteProject(projectName);
    });

    it('should create multiple projects', async () => {

        console.log("Creating multiple projects")
        for (let i = 1; i <= 3; i++) {
            let tempProj = generateRandomString();
            await HomePage.createProject(tempProj);
            context[`MultiProject${i}`] = tempProj;
        }
    });

    it('should verify the creation of multiple projects', async () => {

        for (let i = 1; i <= 3; i++)
            await expect(HomePage.getProjectTd(context[`MultiProject${i}`])).toBeDisplayed();
    });

    it('should add items to a project', async () => {

        console.log("Creating items..");
        await HomePage.waitForRequest();
        await HomePage.getProjectTd(context.MultiProject1).click();
        
        for(let i = 0; i < 7; i++) {
            let tempItem = generateRandomString();
            await HomePage.createItem(tempItem);
            context[`MultiItem${i}`] = tempItem;
        }
    });

    it('should verify the creation of items', async () => {
        
        for(let i = 0; i < 7; i++)
            await expect(HomePage.getItemDiv(context[`MultiItem${i}`])).toBeDisplayed();
    });

    it('should mark the items as done and delete them', async () => {
        allureReporter.addSeverity('normal');   

        console.log("Marking items as done and deleting them..");
        await HomePage.btnAddNewItem.waitForEnabled();
        await HomePage.checkboxTodoItem.forEach(el => el.click());

        await HomePage.waitForRequest();
        
        await HomePage.btnShowDoneItems.click();
        await HomePage.btnDeleteAllItems.click();
        await HomePage.acceptAlert();
    });

    it('should delete all created projects', async () => {
      
        console.log("Deleting all created projects..");
        for(let i = 1; i <= 3; i++) {
            await HomePage.deleteProject(context[`MultiProject${i}`]);
            await HomePage.waitForRequest();
        }
    });

    it('should clear the recycle bin', async () => {
        
        console.log("Clearing recycle bin..");
        await HomePage.btnRecycleBin.waitForClickable();
        await HomePage.btnRecycleBin.moveTo();
        await HomePage.btnRecycleBinContext.click();
        await HomePage.btnEmptyRecycleBin.click();
    });

    it('should verify recycle bin is empty', async () => {
        
        await expect(HomePage.infoMessageText).toHaveText("Recycle Bin has been Emptied.");
    });

    it('should logout from the app', async () => {
        
        console.log("Logging out..");
        await HomePage.waitForRequest();
        await HomePage.btnLogout.click();
        await LoginPage.btnLogin.waitForDisplayed();
    });

    it('should verify logout', async () => {

        await expect(browser).toHaveTitle('Todo.ly Simple Todo List');
        await expect(browser).toHaveUrl('https://todo.ly/');
        await expect(LoginPage.btnLogin).toBeDisplayed();
    });
})
