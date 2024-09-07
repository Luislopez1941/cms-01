import ConfigurationAPIs from './configurationAPIs';

const APIs = {
    login: async ( data: any, customPath?: string) => {
      const path = customPath || 'login';
      return ConfigurationAPIs.post(path, data);
    },

    getUsersGeneral: async ( data: any, customPath?: string) => {
      const path = customPath || 'usuario_get';
      return ConfigurationAPIs.post(path, data);
    },

  // Administradores 
  createAdministrator: async (data: any, customPath?: string) => {
    const path = customPath || 'user/create';
    const token = data.token;
    delete data.token;
    const headers = {
      Authorization: token,
    };
    return ConfigurationAPIs.post(path, data, { headers });
  },

  
  // Administradores
  getUsers: async (data: any, customPath?: string) => {
    const path = customPath || `user/${data.filtro}`;
    const config = {
      headers: {
        Authorization: data.token,
      },
      params: { ...data }, 
    };
  
    return ConfigurationAPIs.get(path, config);
  },

  // Administradores
  updateStatus: async (id: any, data: any, token: any, customPath?: string) => {
    const path = customPath || `user/setState/${id}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...data }, 
    };
  
    return ConfigurationAPIs.put(path, data, config);
  },

  // Administradores
  updateAdministrator: async (id: any, data: any, token: any, customPath?: string) => {
    const path = customPath || `user/updateUser/${id}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...data }, 
    };
  
    return ConfigurationAPIs.put(path, data, config);
  },
  


  ///////////////////////////////////////////////////////// Sub categorias ////////////////////////////////////////////////////////
  createSubCategories: async (data: any, token: string, customPath?: string) => {
    const path = customPath || 'category/create';
    const headers = {
      Authorization: token,
    };
    return ConfigurationAPIs.post(path, data, { headers });
  },

    
  // Administradores
  getCategories: async (classification: any, token: any, customPath?: string) => {
    const path = customPath || `category/get/${classification}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...classification }, 
    };
  
    return ConfigurationAPIs.get(path, config);
  },

    // Administradores
    updateStatusCategory: async (id: any, data: any, token: any, customPath?: string) => {
      const path = customPath || `category/state/${id}`;
      const config = {
        headers: {
          Authorization: token,
        },
        params: { ...data }, 
      };
    
      return ConfigurationAPIs.put(path, data, config);
    },
  


 
}




export default APIs;



