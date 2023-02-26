import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnLogin () {
        return $('.HPHeaderLogin');
    }

    get inputUsername () {
        return $('#ctl00_MainContent_LoginControl1_TextBoxEmail');
    }

    get inputPassword () {
        return $('#ctl00_MainContent_LoginControl1_TextBoxPassword');
    }

    get inputCheckRememberMe () {
        return $('#ctl00_MainContent_LoginControl1_CbRemember');
    }

    get btnSubmit () {
        return $('#ctl00_MainContent_LoginControl1_ButtonLogin');
    }

    /**
     * Login to the todo.ly application
     * @param {string} username The username to login
     * @param {string} password The password to login
     */
    async login (username, password) {
        await this.btnLogin.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

export default new LoginPage();
