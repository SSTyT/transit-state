import config from '../config.js';

const corredorAPI = ($resource) => {
  /*
    /api/corredor?name	GET 	Lista todos los corredores, filtra por nombre
    /api/corredor/:id	GET     Trae un corredor segun su id
  */
  const actions = {
    get: { method: 'GET', url: `${config.baseUrl}/corredores`, isArray: true },
    getById: { method: 'GET', url: `${config.baseUrl}/corredores/:id`, isArray: false }
  }

  return $resource(config.baseUrl, {}, actions, {});
}

export default ['$resource', corredorAPI];
