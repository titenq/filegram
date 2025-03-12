const getCredentials = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const credentials = btoa(`${username}:${password}`);
  
  return credentials;
};

export default getCredentials;
