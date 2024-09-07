import React, { useState } from 'react'
import './styles/General.css'

const General = () => {

    const [updateAdministrator] = useState<any>()

    const [administratorUpdate] = useState<any>()
    
    const [title, setTitle] = useState<any>('')

    const [selectSubCategories, setSelectSubCategories] = useState<boolean>(false);
    const [selectedSubCategory] = useState<any>(null);
  
    const openSelectSubCategory = () => {
        setSelectSubCategories(!selectSubCategories);
    };
  
    const handleSubCategoryChange = (administrator: any) => {
        console.log(administrator)
    };
  

    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    // Función para manejar la tecla "Enter" y agregar etiquetas
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault(); // Previene el comportamiento predeterminado del Enter
            setTags([...tags, inputValue.trim()]);
            setInputValue(''); // Limpia el input
        }
    };

    // Función para eliminar una etiqueta
    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const [subCategories] = useState<any>()

  return (
    <div className='product-modal__general'>
        <div className='product-modal__general_container'>
            <div className='row__one'>
                <h3>Nuevo producto</h3>
                <p>Datos generales del nuevo producto</p>
            </div>
            <div className='row__two'>
                <div>
                    <label className='label__general'>Titulo</label>
                    <input name="title" type="text" className={`inputs__general ${updateAdministrator == undefined ? '' : 'disabled'}`} disabled={administratorUpdate !== undefined}  value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Ingresa los apellidos' />
                </div>
            </div>
            <div className='row__three'>
                <div>
                    <label className='label__general'>Categoria</label>
                    <input name="title" type="text" className={`inputs__general ${updateAdministrator == undefined ? '' : 'disabled'}`} disabled={administratorUpdate !== undefined}  value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Ingresa los apellidos' />
                </div>
                <div className='select__container'>
                    <label className='label__general'>Subcategoria</label>
                    <div className='select-btn__general'>
                        <div className={`select-btn ${selectSubCategories ? 'active' : ''}`} onClick={openSelectSubCategory}>
                            <div className='select__container_title'>
                                <p>{selectedSubCategory ? subCategories.find((s: { id: number }) => s.id === selectedSubCategory.id)?.name : 'Selecciona'}</p>
                            </div>
                            <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                        </div>
                        <div className={`content ${selectSubCategories ? 'active' : ''}`}>
                            <ul className={`options ${selectSubCategories ? 'active' : ''}`} style={{ opacity: selectSubCategories ? '1' : '0' }}>
                            {subCategories?.map((sub: any) => (
                                <li key={sub.id} onClick={() => handleSubCategoryChange(sub)}>
                                {sub.name}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <div className="tag-input-container">
            {tags.map((tag, index) => (
                <div key={index} className="tag">
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(index)}>x</button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe y presiona Enter"
                className="tag-input"
            />
        </div>
            </div>
        </div>
    </div>
  )
}

export default General
