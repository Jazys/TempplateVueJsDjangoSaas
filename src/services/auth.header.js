export default function authHeader() {
  let user = localStorage.getItem('user');

  if (user != null)
    user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; 
  } else {
    return {};
  }
}