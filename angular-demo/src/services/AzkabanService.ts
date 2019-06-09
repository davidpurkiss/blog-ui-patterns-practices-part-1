/**
 * The Azkaban Service
 *
 * This is a very simple service class for this demo.
 * In practice it's good to have a "service" class for accessing service API's as this provides
 * a layer of abstraction where you can, as an example, swap out your API provider or make other
 * changes without affecting your views much
 *
 * This class uses static methods for simplicities sake and you wouldn't normally do this.
 *
 * The wait method is used to simulate asynchronous calls to an API.
 */
export class AzkabanService {
  /**
   * Categories are hard-coded as their management is outside the scope of this demo.
   */
  static categories = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Sites' },
    { id: 2, name: 'Apps' },
    { id: 3, name: 'Notes' },
    { id: 4, name: 'Other' }
  ];

  /**
   * A list of passwords is kept in memory. When you refresh the page, all the passwords
   * are lost.
   */
  static passwords = [];

  /**
   * signIn simulates signing into the fake API.
   * @param {string} username The username to sign-in with. For this demo it is always 'user'.
   * @param {string} password The password to sign-in-with. For this demo it is always 'password'.
   */
  static signIn(username, password) {
    return AzkabanService.wait(2000).then(
      () =>
        new Promise((resolve, reject) => {
          if (username === 'user' && password === 'pass') {
            resolve();
          } else {
            reject('Your username or password is incorrect.');
          }
        })
    );
  }

  /**
   * wait returns a promise which resolves after the specified time.
   * This is a generally useful method to have in your utilities.
   * @param {number} timeInMilliseconds The time to wait in milliseconds
   */
  static wait(timeInMilliseconds) {
    return new Promise(resolve => setTimeout(resolve, timeInMilliseconds));
  }

  /**
   * getNextPasswordId gets the next password id to use when adding a new password.
   */
  static getNextPasswordId() {
    if (AzkabanService.passwords.length > 0) {
      let ids = AzkabanService.passwords
        .map(password => Number(password.id))
        .map(id => (Number.isNaN(id) ? 0 : id));
      return Math.max(...ids) + 1;
    } else {
      return 1;
    }
  }

  /**
   * Adds a new password to the list of passwords
   * @param {*} password The DTO containing the details of the password
   */
  static addPassword(password) {
    return AzkabanService.wait(1500).then(
      () =>
        new Promise(resolve => {
          password.id = AzkabanService.getNextPasswordId();
          AzkabanService.passwords.push(password);
          resolve();
        })
    );
  }

  /**
   * Updates an existing password in the list of passwords
   * @param {number} id The id of the password to update
   * @param {*} password The DTO containing the details of the password
   */
  static updatePassword(id, password) {
    return AzkabanService.wait(1500).then(
      () =>
        new Promise(resolve => {
          let existingPassword = AzkabanService.passwords.find(
            password => password.id === Number(id)
          );
          let index = AzkabanService.passwords.indexOf(existingPassword);
          AzkabanService.passwords[index] = password;
          resolve();
        })
    );
  }

  /**
   * Gets all the passwords in the password list
   */
  static getPasswords() {
    return AzkabanService.wait(750).then(
      () =>
        new Promise(resolve => {
          resolve(AzkabanService.passwords);
        })
    );
  }

  /**
   * Gets a password from the password list using its id
   * @param {number} id The id of the password to retrieve
   */
  static getPassword(id) {
    return AzkabanService.passwords.find(
      password => password.id === Number(id)
    );
  }

  /**
   * Removes a password from the list using its id
   * @param {number} id The if of the password to delete
   */
  static deletePassword(id) {
    let passwordToDelete = AzkabanService.passwords.find(
      password => password.id === id
    );
    let index = AzkabanService.passwords.indexOf(passwordToDelete);

    AzkabanService.passwords.splice(index, 0);
  }

  /**
   * Generates a unique identifier. RFC4122 version 4 compliant and cryptographic quality (see https://stackoverflow.com/a/2117523).
   */
  static copyToClipboard(value) {
    //Generate a unique id for the copy operation
    const id = AzkabanService.uuid();

    // Create an input element and add it to the DOM
    var tempInputElement = document.createElement('input');
    document.body.appendChild(tempInputElement);

    // Set its ID to the unique id generated
    tempInputElement.setAttribute('id', id);

    // Set the value to copy into the value of the input element
    (document.getElementById(id) as any).value = value;

    // Select and execute the copy command
    tempInputElement.select();
    document.execCommand('copy');

    // Remove the input element as its not needed anymore
    document.body.removeChild(tempInputElement);
  }

  static uuidCount = 0;
  /**
   * Generates a unique identifier. RFC4122 version 4 compliant and cryptographic quality (see https://stackoverflow.com/a/2117523).
   */
  static uuid() {
    // return (any>[1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    //   (
    //     c ^
    //     (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    //   ).toString(16)
    // );

    // For demo only. Use the code above for prod (not working in TypeScript)
    return (this.uuidCount++).toString();
  }
}
