import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { modal } from '../../../redux/state/modals';
import Modal from './Modal';
import './Products.css'
import APIs from '../../../services/APIs';
import { useSelector } from 'react-redux';

const Products: React.FC = () => {
    const dispatch = useDispatch()
    const baseUrl = useSelector((state: any) => state.server.baseUrl);
    const [products, setProducts] = useState<any>([])

    const fetch = async () => {

        let category_id = 2
        try {
            let result: any = await APIs.getProducts(category_id)
            setProducts(result.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch()
    }, [])

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
                <div className='table__products' >
                    <div>
                        {products ? (
                            <div className='table__numbers'>
                                <p className='text'>Total de Ordenes</p>
                                <div className='quantities_tables'>{products.length}</div>
                            </div>
                        ) : (
                            <p className='text'>No hay empresas</p>
                        )}
                    </div>
                    <div className='table__head'>
                        <div className='thead'>
                            <div className='th'>
                                <p className=''>Nombre</p>
                            </div>
                            <div className='th'>
                                <p className=''>Genero</p>
                            </div>
                            <div className='th'>
                                <p className=''>Email</p>
                            </div>
                            <div className='th'>
                                <p className=''>Estado</p>
                            </div>
                            <div className='th'>

                            </div>
                            <div className='th'>

                            </div>
                        </div>
                    </div>
                    {products?.length > 0 ? (
                        <div className='table__body'>
                            {products?.map((item: any, index: any) => (
                                <div className='tbody__container' key={index}>
                                    <div className='tbody'>
                                        <div className='td'>
                                            <p></p>
                                            {item.title}
                                            <p>{item.createdAt}</p>
                                        </div>
                                        <div className='td'>
                                            {item.gender.name}
                                        </div>

                                        <div className='td'>
                                            {/* {item.state == true ?
                                                <div className='activated-status' onClick={() => updateStatus(item)}>
                                                    <p>Activo</p>
                                                </div>
                                                :
                                                <div className='idle-status' onClick={() => updateStatus(item)}>
                                                    <p>Inactivo</p>
                                                </div>
                                            } */}
                                        </div>
                                        <div className='td'>
                                            <img src={`${baseUrl}${item.image}`} alt="Imagen de la categoría" style={{ maxWidth: '150px', borderRadius: '8px' }} />
                                        </div>
                                        <div className='td'>
                                            <button className='btn__general-purple' type='button' onClick={() => updateModalCategories(item)}>Editar</button>
                                        </div>
                                        {/* <div className='td'>
                                <button className='btn__general-danger' type='button'>Eliminar</button>
                            </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text'>No hay máximos y mínimos que mostrar</p>
                    )}
                </div>
            </div>
            <Modal />
        </div>
    )
}

export default Products
