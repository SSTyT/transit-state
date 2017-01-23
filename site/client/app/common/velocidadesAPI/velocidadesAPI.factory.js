import config from '../config.js';

const corredorAPI = ($resource) => {
  /*
    /velocidades/:year/:month/:day/?corredores&hour		GET 	Trae todas las velocidades para un dia y hora especificada, 
    															listar corredores a filtrar separados por ';'
  */
  const actions = {
    getDay: { method: 'GET', url: `${config.baseUrl}/velocidades/:year/:month/:day`, isArray: true },
    getMonth: { method: 'GET', url: `${config.baseUrl}/velocidades/:year/:month`, isArray: true },
    getYear: { method: 'GET', url: `${config.baseUrl}/velocidades/:year`, isArray: true },
  }

  return $resource(config.baseUrl, {}, actions, {});
}

export default ['$resource', corredorAPI];
