import ConfigurationAPIs from './configurationAPIs';

const APIs = {
  login: async (data: any, customPath?: string) => {
    const path = customPath || 'auth/login';
    return ConfigurationAPIs.post(path, data);
  },

  getUsersGeneral: async (data: any, customPath?: string) => {
    const path = customPath || 'usuario_get';
    return ConfigurationAPIs.post(path, data);
  },








  createStore: async (data: any, customPath?: string) => {
    console.log(data)
    const path = customPath || 'store/create';
    // const token = data.token;
    // delete data.token;
    // const headers = {
    //   Authorization: token,
    // };
    return ConfigurationAPIs.post(path, data);
  },

  getStore: async (userId: number, customPath?: string) => {
    const path = customPath || `store/get?userId=${userId}`;
    return ConfigurationAPIs.get(path);
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

  // Administradores
  searchUser: async (data: any, customPath?: string) => {
    const path = customPath || `user/searchUser/${data.email}`;
    const config = {
      headers: {
        Authorization: data.token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.get(path, config);
  },




  ///////////////////////////////////////////////////////// Sub categorias ////////////////////////////////////////////////////////
  createCategories: async (data: any, customPath?: string) => {
    const path = customPath || 'categories/create';
    return ConfigurationAPIs.post(path, data);
  },

  getCategories: async (store_id: any) => {
    const path = `categories/get?store_id=${store_id}`;
    return ConfigurationAPIs.get(path);
  },

  // Administradores
  updateStatusCategory: async (id: any, data: any, customPath?: string) => {
    const path = customPath || `category/state/${id}`;
    return ConfigurationAPIs.put(path, data);
  },

   ///////////////////////////////////////////////////////// Producto ////////////////////////////////////////////////////////
  createProduct: async (data: any, customPath?: string) => {
    const path = customPath || 'products/create';
    return ConfigurationAPIs.post(path, data);
  },







}




export default APIs;



