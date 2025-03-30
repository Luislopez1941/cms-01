import React, { useState } from 'react'
import './styles/Variations.css'
import baseColors from './json/baseColors.json'
import sizes from './json//sizes.json'

const Variations: React.FC = () => {

  const [updateAdministrator] = useState<any>()
  const [administratorUpdate] = useState<any>()

  const [color, setColor] = useState('#e8eaed');



  const [selectColors, setSelectColors] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<any>(null);

  const openSelectColors = () => {
    setSelectColors(!selectColors);
  };


  const handleColorsChange = (color: any) => {
    setSelectedColors(color)
    setSelectColors(false);
  };



  const [selectSizes, setSelectSizes] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<any>(null);

  const openSelectSizes = () => {
    setSelectSizes(!selectSizes);
  };


  const handleSizesChange = (size: any) => {
    setSelectedSizes(size)
    setSelectSizes(false);
  };

  const [variations, setVariation] = useState<any>([])

  const addVariation = () => {
    let data = {
      hxd: color,
      sku: '',
      size: selectedSizes,
      color: selectedColors,
    }
    setVariation([...variations, data])

  }

  const deleteVariations = (_: any, i: number) => {
    let filterDelete = variations.filter((_: any, index: number) => i !== index)
    setVariation(filterDelete)
  }


  return (
    <div className='variations-modal__general'>
      <div className='variations-modal__general_container'>
        <div className='row__one'>
          <h3>Nuevo producto</h3>
          <p>Datos generales del nuevo producto</p>
        </div>
        <div className='row__two'>
          <div>
            <label className="label__general">Color</label>
            <div
              className={`color__palette ${updateAdministrator == undefined ? '' : 'disabled'}`}
            >
              <svg onClick={() => document.getElementById('colorInput')?.click()} xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 -960 960 960" fill="#e8eaed">
                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80ZM260-440q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Z" />
              </svg>
              <input
                id="colorInput"
                className="hidden-input"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ display: 'none' }}
                disabled={administratorUpdate !== undefined}
              />
            </div>

          </div>

          <div>
            <div className='select__container'>
              <label className='label__general'>Color base</label>
              <div className='select-btn__general'>
                <div className={`select-btn ${selectColors ? 'active' : ''}`} onClick={openSelectColors}>
                  <div className='select__container_title'>
                    <p>{selectedColors ? baseColors.find((s: { id: number }) => s.id == selectedColors.id)?.name : 'Selecciona'}</p>
                  </div>
                  <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </div>
                <div className={`content ${selectColors ? 'active' : ''}`}>
                  <ul className={`options ${selectColors ? 'active' : ''}`} style={{ opacity: selectColors ? '1' : '0' }}>
                    {baseColors?.map((color: any) => (
                      <li key={color.id} onClick={() => handleColorsChange(color)}>
                        {color.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div>
            <div className='select__container'>
              <label className='label__general'>Talla</label>
              <div className='select-btn__general'>
                <div className={`select-btn ${selectSizes ? 'active' : ''}`} onClick={openSelectSizes}>
                  <div className='select__container_title'>
                    <p>{selectedSizes ? sizes.find((s: { id: number }) => s.id == selectedSizes.id)?.name : 'Selecciona'}</p>
                  </div>
                  <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </div>
                <div className={`content ${selectSizes ? 'active' : ''}`}>
                  <ul className={`options ${selectSizes ? 'active' : ''}`} style={{ opacity: selectSizes ? '1' : '0' }}>
                    {sizes?.map((gender: any) => (
                      <li key={gender.id} onClick={() => handleSizesChange(gender)}>
                        {gender.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='btn'>
            <button className='btn__general-primary' type='button' onClick={addVariation}>Agregar</button>
          </div>
        </div>
        <div className='row__three'>
          {variations.map((x: any, index: number) => (
            <div className='variation' key={index}>
              <div className='item'>
                <div className='container_color'>
                  <div className="color__box" style={{ backgroundColor: x.hxd }}>
                  </div>
                  <div>
                    <p>{x.color?.name}</p>
                    <small>Color base</small>
                  </div>
                </div>
              </div>
              <div className='item'>
                <div>
                  {x.size?.name}
                  <p>Talla</p>
                </div>
              </div>
              <div>
                <button className='btn__general-danger' onClick={() => deleteVariations(x, index)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Variations
