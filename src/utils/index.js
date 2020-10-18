export const getRedirectTo = (type, header) => {
  let url = '';
  if (type === 'dashen') {
    url = '/dashen'
  } else {
    url = '/laoban'
  }
  if (!header) {
    url += 'info'
  }
  return url;
}

export default {
  getRedirectTo,
}