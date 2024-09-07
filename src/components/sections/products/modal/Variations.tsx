import React, { useState } from 'react'
import './styles/Variations.css'

const Variations: React.FC = () => {

  const [updateAdministrator] = useState<any>()
  const [administratorUpdate] = useState<any>()

  const [color] = useState<any>()

  return (
    <div className='variations-modal__general'>
      <div className='variations-modal__general_container'>
        <div className='row__one'>
          <h3>Nuevo producto</h3>
          <p>Datos generales del nuevo producto</p>
        </div>
        <div className='row__two'>
          <div>
            <label className='label__general'>Color</label>
            <input className={`inputs__general ${updateAdministrator == undefined ? '' : 'disabled'}`} disabled={administratorUpdate !== undefined} type="color" value={color} placeholder='Ingresa los apellidos' />
          </div>
          <div>
            <label className='label__general'>Color base</label>
            <input name="surnames" className={`inputs__general ${updateAdministrator == undefined ? '' : 'disabled'}`} disabled={administratorUpdate !== undefined} type="text" value={color} placeholder='Ingresa los apellidos' />
          </div>
          <div>
            <label className='label__general'>Talla</label>
            <input name="surnames" className={`inputs__general ${updateAdministrator == undefined ? '' : 'disabled'}`} disabled={administratorUpdate !== undefined} type="text" value={color} placeholder='Ingresa los apellidos' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Variations
