export class AzkabanService {
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
