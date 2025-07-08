import React, { useCallback, useEffect, useState } from 'react';
import APIs from '../../../services/APIs';
import Swal from 'sweetalert2';
import genres from './genres.json';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../../../redux/state/modals';
import { useDropzone } from 'react-dropzone';

import './Modal.css';

const Modal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modals);
  const categoriesUpdate = useSelector((state: any) => state.categories);
  const user = useSelector((state: any) => state.user);
  const [fields, setFields] = useState<any>({
    title: '',
    isChecked: false,
    subCategories: [],
    subCategoryInput: '',
    image: '',
  });

  const [store, setStore] = useState<any>([])

  const fetch = async () => {
    let response: any = await APIs.getStore(user.id)
    console.log('response', response)
    setStore(response.data)
  }

  useEffect(() => {
    fetch()
  }, [modalState])



  const [selectGenres, setSelectGenres] = useState(false);
  const [selectedGender, setSelectedGender] = useState<any>(null);

  const [selectStore, setSelectStore] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  useEffect(() => {
    if (modalState === 'categories-modal-update' && categoriesUpdate) {
      setFields({
        title: categoriesUpdate.title || '',
        isChecked: categoriesUpdate.state || false,
        subCategories: categoriesUpdate.subCategories || [],
        subCategoryInput: '',
        image: '',
      });
      setSelectedGender(categoriesUpdate.gender || null);
    }
  }, [modalState, categoriesUpdate]);

  const token: any = localStorage.getItem('token-eco');

  const handleSendChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = {
      name: fields.title,
      sglu: fields.title, // suponiendo que quieres slug igual al título
      gender: selectedGender.id,
      subCategories: fields.subCategories,
      status: fields.isChecked,
      store_id: selectedStore ? selectedStore.id : null,
      image: fields.image
    };

    try {
      let result: any;
      if (modalState === 'categories-modal') {
        result = await APIs.createCategories(data);
      } else {
        result = await APIs.updateStatusCategory(categoriesUpdate._id, data, token);
      }
      Swal.fire({
        title: result.status === 'success' ? 'Éxito' : 'Advertencia',
        text: result.message,
        icon: result.status === 'success' ? 'success' : 'warning',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error en la operación',
        icon: 'error',
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev: any) => ({ ...prev, isChecked: e.target.checked }));
  };

  const addSubCategory = () => {
    const newSub = fields.subCategoryInput.trim();
    if (!newSub) return;

    setFields((prev: any) => ({
      ...prev,
      subCategories: [...prev.subCategories, newSub],
      subCategoryInput: '',
    }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setFields((prev: any) => ({
        ...prev,
        image: base64Image,  // guarda solo el string base64
      }));
    };

    if (file) reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  return (
    <div
      className={`overlay__categories__modal ${modalState === 'categories-modal' || modalState === 'categories-modal-update' ? 'active' : ''
        }`}
    >
      <div
        className={`popup__categories__modal ${modalState === 'categories-modal' || modalState === 'categories-modal-update' ? 'active' : ''
          }`}
      >
        <div className="header__modal">
          <a href="#" className="btn-cerrar-popup__categories__modal" onClick={() => dispatch(modal(''))}>
            <svg className="svg__close" xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </a>
          <p className="title__modals">Subcategorías</p>
        </div>
        <form className="categories__modal" onSubmit={handleSendChange}>
          <div className="categories__modal_container">
            <div className="row__one">
              <div>
                <label className="label__general">Título</label>
                <input
                  className="inputs__general"
                  type="text"
                  value={fields.title}
                  onChange={e => setFields({ ...fields, title: e.target.value })}
                  placeholder="Ingresa el título"
                />
              </div>

              <div className="select__container">
                <label className="label__general">Género</label>
                <div className="select-btn__general">
                  <div className={`select-btn ${selectGenres ? 'active' : ''}`} onClick={() => setSelectGenres(!selectGenres)}>
                    <div className="select__container_title">
                      <p>{selectedGender ? genres.find((s: any) => s.id === selectedGender.id)?.name : 'Selecciona'}</p>
                    </div>
                    <svg
                      className="chevron__down"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </div>
                  <div className={`content ${selectGenres ? 'active' : ''}`}>
                    <ul className={`options ${selectGenres ? 'active' : ''}`} style={{ opacity: selectGenres ? 1 : 0 }}>
                      {genres.map((gender: any) => (
                        <li
                          key={gender.id}
                          onClick={() => {
                            setSelectedGender(gender);
                            setSelectGenres(false);
                          }}
                        >
                          {gender.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="select__container">
                <label className="label__general">Tienda</label>
                <div className="select-btn__general">
                  <div className={`select-btn ${selectStore ? 'active' : ''}`} onClick={() => setSelectStore(!selectStore)}>
                    <div className="select__container_title">
                      <p>{selectedStore ? selectedStore.name : 'Selecciona'}</p>
                    </div>
                    <svg
                      className="chevron__down"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </div>
                  <div className={`content ${selectStore ? 'active' : ''}`}>
                    <ul className={`options ${selectStore ? 'active' : ''}`} style={{ opacity: selectStore ? 1 : 0 }}>
                      {/* Aquí deberías reemplazar con lista real de tiendas */}
                      {store?.map((store: any) => (
                        <li
                          key={store.id}
                          onClick={() => {
                            setSelectedStore(store);
                            setSelectStore(false);
                          }}
                        >
                          {store.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <label className="label__general">Estado</label>
                <label className="switch">
                  <input type="checkbox" checked={fields.isChecked} onChange={handleCheckboxChange} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="row__two">
              <div>
                <label className="label__general">Sub categorías</label>
                <input
                  className="inputs__general"
                  type="text"
                  value={fields.subCategoryInput}
                  onChange={e => setFields({ ...fields, subCategoryInput: e.target.value })}
                  placeholder="Ingresa la subcategoría"
                />
              </div>
              <div>
                <button className="btn__general-purple" type="button" onClick={addSubCategory}>
                  Agregar
                </button>
              </div>

              <div
                {...getRootProps()}
                className="dropzone"
                style={{
                  border: '2px dashed #aaa',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  marginTop: '10px',
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Suelta la imagen aquí...</p>
                ) : (
                  <p>Arrastra una imagen o haz clic para seleccionarla</p>
                )}
              </div>

              {fields.image && (
                <div style={{ marginTop: '20px' }}>
                  <img
                    src={fields.image}
                    alt="Vista previa"
                    style={{ maxWidth: '150px', borderRadius: '10px' }}
                  />
                </div>
              )}

            </div>

            <div className="row__three">
              {fields.subCategories.map((subCat: string, index: number) => (
                <div className="item" key={index}>
                  <p className="category__item">{subCat}</p>
                </div>
              ))}
            </div>
            <div>
              <button className="btn__general-purple" type="submit">
                {modalState === 'categories-modal' ? 'Crear subcategoría' : 'Actualizar subcategoría'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;