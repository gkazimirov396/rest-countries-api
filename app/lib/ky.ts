import kyStandard from 'ky';

const BASE_URL = 'https://restcountries.com/v3.1';

const prepareAuthHeaders = (request: Request) => {
  const token = localStorage.getItem('token');

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

export default kyStandard.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [prepareAuthHeaders],
  },
});
