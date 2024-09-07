import React, { useState } from 'react'
import APIs from '../../../services/APIs'
import Swal from 'sweetalert2';
import genres from './genres.json'
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../redux/state/modals';
import './Modal.css'

const Modal = () => {

  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modals);

  const handleModalChange = (value: any) => {
    dispatch(modal(value)); // Despacha la acción para cambiar el estado del modal
  };
    
  const [title, setTitle] = useState<any>()
  const [subCategory, setSubCategory] = useState<any>()
  const [isChecked, setIsChecked] = useState(false);
  const [categories, setCategories] = useState<any>([])

  const token: any = localStorage.getItem('token-eco');

  const hanleSendChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    let data = {
        title,
        sglu: title,
        gender: selectedGender.name,
        subCategories: categories,
        state: isChecked,
    }

    try {
        let result: any  = await APIs.createSubCategories(data, token)
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  
  const [selectGenres, setSelectGenres] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<any>(null);

  const openSelectGenres = () => {
    setSelectGenres(!selectGenres);
  };

  
  const handleGenresChange = (gender: any) => {
    setSelectedGender(gender)
    setSelectGenres(false);
  };




  return (
    <div className={`overlay__categories__modal ${modalState === 'categories-modal' ? 'active' : ''}`}>
      <div className={`popup__categories__modal ${modalState === 'categories-modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__categories__modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Subcategorías</p>
        </div>
        <form className='categories__modal' onSubmit={hanleSendChange}>
          <div className='categories__modal_container'>
              <div className='row__one'>
                <div>
                    <label className='label__general'>Titulo</label>
                    <input name="surnames" className={`inputs__general`}  type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Ingresa el  titulo' />
                </div>
                <div className='select__container'>
                  <label className='label__general'>Genero</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectGenres ? 'active' : ''}`} onClick={openSelectGenres}>
                      <div className='select__container_title'>
                        <p>{selectedGender ? genres.find((s: { id: number }) => s.id == selectedGender.id)?.name : 'Selecciona'}</p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectGenres ? 'active' : ''}`}>
                      <ul className={`options ${selectGenres ? 'active' : ''}`} style={{ opacity: selectGenres ? '1' : '0' }}>
                        {genres?.map((gender: any) => (
                          <li key={gender.id} onClick={() => handleGenresChange(gender)}>
                            {gender.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                    <label className='label__general'>Estado</label>
                    <label className="switch">
                      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                      <span className="slider"></span>
                    </label>
                </div>
              </div>
              <div className='row__two'>
                  <div>
                      <label className='label__general'>Sub categorías</label>
                      <input name="surnames" className={`inputs__general`}  type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} placeholder='Ingresa la sub subcategoría' />
                  </div>
                  <div>
                      <button className='btn__general-purple' type='button' onClick={() => setCategories([...categories, {subCategory: subCategory}])}>Agregar</button>
                  </div>
              </div>
              <div className='row__three'>
                  {categories.map((x: any, index: any) => (
                      <div className='item' key={index}>
                          <p className='category__item'>{x.subCategory}</p>
                      </div>
                  ))}
              </div>
              <div>
                  <button className='btn__general-purple'>Crear subcategoría</button>
              </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
