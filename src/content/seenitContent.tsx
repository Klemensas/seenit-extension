import { updateStorage } from '../common/storage';

document.addEventListener('seenit-login', (event) => {
  // TODO: user might be already logged, are we sure we want to override?
  const token = JSON.parse(localStorage.getItem('seenit-web-token'));
  updateStorage({
    token,
  });

  chrome.runtime.sendMessage({ loggedIn: true });
});
