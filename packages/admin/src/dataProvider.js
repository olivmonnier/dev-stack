import jsonServerProvider from 'ra-data-json-sails';
import fakeDataProvider from 'ra-data-fakerest';
import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('jwtToken');
  options.headers.set('Authorization', `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
}

const dataProvider = (process.env.NODE_ENV === 'production') 
  ? jsonServerProvider('/api', httpClient)
  : fakeDataProvider({
    posts: [
      { id: 0, title: 'First Article', resume: 'Short description for First Article', content: 'Long text for first Article' },
      { id: 1, title: 'Second Article', resume: 'Short description for Second Article', content: 'Long text for Second Article' }
    ],
    users: [
      { id: 0, username: 'admin', password: 'admin' }
    ]
  });

export default dataProvider;