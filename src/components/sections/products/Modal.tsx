import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../../../redux/state/modals';
import { General } from './modal/General';
import Variations from './modal/Variations';
import './Modal.css'
import APIs from '../../../services/APIs';
import Swal from 'sweetalert2';

const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const modalState = useSelector((state: any) => state.modals);
    const { title, subcategory, tags, price, images, variations } = useSelector((state: any) => state.product);
    const handleModalChange = (value: any) => {
        dispatch(modal(value)); // Despacha la acción para cambiar el estado del modal
    };


    const hanleSendChange = () => {

    }

    const [mode, setMode] = useState<Boolean>(false)

    const selectType = () => {
        setMode(!mode)
    }

    const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // 👉 previene el comportamiento por defecto

    try {
        const variationsPayload = variations.map((v: any) => ({
            color: v.color,
            size: v.size,
            quantity: v.quantity,
        }));

        const data = {
            name: title,
            price,
            images,
            status: true,
            category: {
                connect: { id: Number(subcategory) },
            },
            variations: {
                create: variationsPayload,
            },
        };

        const response = await APIs.createProduct(data);

        Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            text: 'El producto fue creado exitosamente.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });

    } catch (error) {
        console.error('Error creando producto:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear el producto. Intenta de nuevo.',
        });
    }
};



    const handleClose = () => {

    };



    return (
        <div className={`overlay__products__modal ${modalState === 'products-modal' ? 'active' : ''}`}>
            <div className={`popup__products__modal ${modalState === 'products-modal' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__products__modal" onClick={() => handleModalChange('')}>
                        <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </a>
                    <p className='title__modals'>Producto</p>
                </div>
                <form className='products__modal' onSubmit={hanleSendChange}>
                    <div className='row__one'>
                        <div onClick={selectType}>
                            <p>General</p>
                        </div>
                        <div onClick={selectType}>
                            <p>Variaciones</p>
                        </div>
                    </div>
                    <div className='row__two'>
                        {mode ?
                            <Variations />
                            :
                            <General />
                        }
                    </div>
                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button
                            className="footer-button footer-button-secondary"
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="footer-button footer-button-primary"
                            onClick={handleSave}

                        >
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
