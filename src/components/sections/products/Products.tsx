import React from 'react'
import { useDispatch } from 'react-redux'
import { modal } from '../../../redux/state/modals';
import Modal from './Modal';
import './Products.css'

const Products: React.FC = () => {
    const dispatch = useDispatch()


    const handleModalChange = (value: any) => {
        dispatch(modal(value)); // Despacha la acción para cambiar el estado del modal
    };
    return (
        <div className='products'>
            <div className='products__container'>
                <div className='row__one'>
                    <div className=''>
                        <button className='btn__general-purple' onClick={() => handleModalChange('products-modal')}>Crear producto</button>
                    </div>
                </div>
            </div>
            <Modal />
        </div>
    )
}

export default Products
