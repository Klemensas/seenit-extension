/* eslint-disable import/prefer-default-export */

export const closeContent = () => {
  const container = document.getElementById('seenit-container');
  container?.parentNode?.removeChild(container);
};
