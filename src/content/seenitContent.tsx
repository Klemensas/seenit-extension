import { getStorageValue, updateStorage } from '../common/storage';
import { getTokenPayload } from '../utils/helpers';

getStorageValue('token', 'user')
  .then(({ token, user }) => {
    if (typeof token !== 'string') return;

    const storedToken = localStorage.getItem('seenit-web-token');
    const storedTokenPayload = getTokenPayload(storedToken);

    // Keep web token if  it still has a longer than 15min lifetime
    if (storedTokenPayload?.exp > Date.now() + 900000) return;

    localStorage.setItem('seenit-web-token', token);
    localStorage.setItem('seenit-web-userData', JSON.stringify(user) as any);
  })
  .then(() => {
    document.dispatchEvent(new CustomEvent('seenit-extension-sync'));
  });

document.addEventListener('seenit-login', () => {
  // TODO: user might be already logged, are we sure we want to override?
  const token = localStorage.getItem('seenit-web-token');
  const userJson = localStorage.getItem('seenit-web-userData');
  const user = userJson ? JSON.parse(userJson) : null;

  updateStorage({
    token,
    user,
  });
});
