import React, { useEffect, useState } from 'react';
import APIs from '../../../../services/APIs';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../redux/state/modals';
import Swal from 'sweetalert2';
import './Modal.css';
import { updateStore } from '../../../../redux/state/Store';

const Modal = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const modalState = useSelector((state: any) => state.modals);

  const administratorUpdate = useSelector((state: any) => state.administrator);
  
  const token: any = localStorage.getItem('token-eco');

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
    dispatch(updateStore('reset'));
    setData({
      name: '',
      surnames: '',
      email: '',
      password: '',
      rol: '',
    });

  };
  
  useEffect(() => {
    if(administratorUpdate) {
      setData({
        name: administratorUpdate.name,
        surnames: administratorUpdate.surnames,
        email: administratorUpdate.email,
        rol: administratorUpdate.rol,
        token: token
      });
    }
  }, [administratorUpdate])


  // Estado inicial para los campos del formulario
  const [data, setData] = useState<any>({
    name: '',
    email: '',
    phone: '',
    user_id: user.id
    // token: token
  });

  // Función para actualizar el estado de `data`
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [creating, setCreating] = useState<boolean>(false);

  const createStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);

   if(administratorUpdate) {

    try {
      const result: any = await APIs.updateAdministrator(administratorUpdate.id, {email: data.email, rol: data.rol }, token);
      Swal.fire({
        title: result.status === 'warning' ? 'Advertencia' : 'Éxito',
        text: result.message,
        icon: result.status === 'warning' ? 'warning' : 'success'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el administrador',
        icon: 'error'
      });
    }
   } else {
    try {
      const result: any = await APIs.createStore(data);
      Swal.fire({
        title: result.status === 'warning' ? 'Advertencia' : 'Éxito',
        text: result.message,
        icon: result.status === 'warning' ? 'warning' : 'success'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el administrador',
        icon: 'error'
      });
    }
   }

    setCreating(false);
  };



  return (
    <div className={`overlay__modal_administrator ${modalState === 'store-modal' ? 'active' : ''}`}>
      <div className={`popup__modal_administrator ${modalState === 'store-modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__modal_administrator" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Precios</p>
        </div>
        <form className='administrator-modal' onSubmit={createStore}>
          <div className='administrator-modal_container'>
            <div className='row__one'>
              <div>
                <label className='label__general'>Nombre de la tienda</label>
                <input name="name" className={`inputs__general ${administratorUpdate == null ? '' : 'disabled'}`}  type="text" value={data.name} onChange={handleChange} placeholder='Ingresa el nombre' />
              </div>
              <div>
                <label className='label__general'>Email</label>
                <input name="email" className="inputs__general" type="email" value={data.email} onChange={handleChange} placeholder='Ingresa el email' />
              </div>
                <div>
                <label className='label__general'>Numero telefonico</label>
                <input name="phone" className={`inputs__general ${administratorUpdate == null ? '' : 'disabled'}`}  type="text" value={data.phone} onChange={handleChange} placeholder='Numero celular' />
              </div>
            </div>
          </div>
          <div className='btn__create-administrator_container'>
            <button type="submit" className="btn__general-purple" disabled={creating}>
              {creating ? (
                <>
                  {administratorUpdate == undefined ? 'Creando tienda' : 'Actualizando tienda'}
                  <span className="loader_btn"></span>
                </>
              ) : (
                <p>{administratorUpdate == undefined ? 'Crear tienda' : 'Actualizar tienda'}</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
