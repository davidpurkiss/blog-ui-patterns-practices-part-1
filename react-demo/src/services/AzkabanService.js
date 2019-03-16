export class AzkabanService {
  static categories = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Sites' },
    { id: 2, name: 'Apps' },
    { id: 3, name: 'Notes' },
    { id: 4, name: 'Other' }
  ];

  static passwords = [];

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

  static wait(timeInMilliseconds) {
    return new Promise(resolve => setTimeout(resolve, timeInMilliseconds));
  }

  static addPassword(password) {
    AzkabanService.passwords.push(password);
  }

  static updatePassword(id, password) {
    let existingPassword = AzkabanService.passwords.find(
      password => password.id === id
    );
    let index = AzkabanService.passwords.indexOf(existingPassword);
    AzkabanService.passwords[index] = password;
  }
}
