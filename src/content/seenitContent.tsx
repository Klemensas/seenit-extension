import { getStorageValue, updateStorage } from '../common/storage';
import { getTokenPayload } from '../utils/helpers';

console.log('start token update');
getStorageValue('token', 'user')
  .then(({ token, user }) => {
    console.log('start extension sync');
    if (typeof token !== 'string') return;

    const storedToken = localStorage.getItem('seenit-web-token');
    const storedTokenPayload = getTokenPayload(storedToken);

    console.log('token sync', storedTokenPayload);
    // Keep web token if  it still has a longer than 15min lifetime
    if (storedTokenPayload?.exp > Date.now() + 900000) return;

    console.log('set token from extension');
    localStorage.setItem('seenit-web-token', token);
    localStorage.setItem('seenit-web-userData', JSON.stringify(user) as any);
  })
  .then(() => {
    document.dispatchEvent(new CustomEvent('seenit-extension-sync'));
  });

document.addEventListener('seenit-login', () => {
  // TODO: user might be already logged, are we sure we want to override?
  const token = localStorage.getItem('seenit-web-token');
  const user = localStorage.getItem('seenit-web-userData');

  updateStorage({
    token,
    user,
  });
});
