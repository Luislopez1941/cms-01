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





  ///////////////////////////////////////////////////////// Sub categorias ////////////////////////////////////////////////////////
  createCategories: async (data: any, customPath?: string) => {
    const path = customPath || 'categories/create';
    return ConfigurationAPIs.post(path, data);
  },

  getCategories: async (store_id: any) => {
    const path = `categories/get?store_id=${store_id}`;
    return ConfigurationAPIs.get(path);
  },

  ///////////////////////////////////////////////////////// Producto ////////////////////////////////////////////////////////
  createProduct: async (data: any, customPath?: string) => {
    const path = customPath || 'products/create';
    return ConfigurationAPIs.post(path, data);
  },


  getProducts: async (categoryId: number) => {
    const path = `products/category/${categoryId}`;
    return ConfigurationAPIs.get(path);
  },







}




export default APIs;



