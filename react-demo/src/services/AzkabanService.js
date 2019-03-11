export class AzkabanService {
  static categories = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Sites' },
    { id: 2, name: 'Apps' },
    { id: 3, name: 'Notes' },
    { id: 4, name: 'Other' }
  ];

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
}
