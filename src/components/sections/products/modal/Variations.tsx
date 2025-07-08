import React, { useState } from 'react';
import './styles/Variations.css';
import baseColors from './json/baseColors.json';
import sizes from './json/sizes.json';
import { useDispatch, useSelector } from 'react-redux';
import { addVariation, removeVariation } from '../../../../redux/state/Product';
import { Variation } from '../../../../redux/state/Product';

const Variations: React.FC = () => {
  const dispatch = useDispatch();

  const variations = useSelector((state: any) => state.product.variations);

  const [selectedColors, setSelectedColors] = useState<string>(''); // solo string color name
  const [selectColors, setSelectColors] = useState<boolean>(false);

  const [selectedSizes, setSelectedSizes] = useState<string>(''); // solo string size name
  const [selectSizes, setSelectSizes] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(1);

  // Opcional: product_id, lo debes obtener del contexto o props
  const productId = 123; // Cambia esto según tu lógica

  const openSelectColors = () => setSelectColors(!selectColors);
  const openSelectSizes = () => setSelectSizes(!selectSizes);

  const handleColorsChange = (color: string) => {
    setSelectedColors(color);
    setSelectColors(false);
  };

  const handleSizesChange = (size: string) => {
    setSelectedSizes(size);
    setSelectSizes(false);
  };

  const handleAddVariation = () => {
    if (!selectedColors || !selectedSizes) {
      alert('Selecciona color y talla');
      return;
    }
    if (quantity <= 0) {
      alert('Cantidad debe ser mayor a cero');
      return;
    }

    const variation: any = {
      color: selectedColors,
      size: selectedSizes,
      quantity,
      product_id: productId,
    };

    dispatch(addVariation(variation));

    // Limpiar inputs
    setSelectedColors('');
    setSelectedSizes('');
    setQuantity(1);
  };

  const handleDeleteVariation = (index: number) => {
    dispatch(removeVariation(index));
  };

  return (
    <div className="variations-modal__general">
      <div className="variations-modal__general_container">
        <div className="row__one">
          <h3>Nuevo producto</h3>
          <p>Datos generales del nuevo producto</p>
        </div>

        <div className="row__two">
          {/* Base color select */}
          <div>
            <div className="select__container">
              <label className="label__general">Color base</label>
              <div className="select-btn__general">
                <div
                  className={`select-btn ${selectColors ? 'active' : ''}`}
                  onClick={openSelectColors}
                >
                  <div className="select__container_title">
                    <p>{selectedColors || 'Selecciona'}</p>
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
                <div className={`content ${selectColors ? 'active' : ''}`}>
                  <ul
                    className={`options ${selectColors ? 'active' : ''}`}
                    style={{ opacity: selectColors ? '1' : '0' }}
                  >
                    {baseColors.map((color) => (
                      <li
                        key={color.id}
                        onClick={() => handleColorsChange(color.name)}
                      >
                        {color.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Size select */}
          <div>
            <div className="select__container">
              <label className="label__general">Talla</label>
              <div className="select-btn__general">
                <div
                  className={`select-btn ${selectSizes ? 'active' : ''}`}
                  onClick={openSelectSizes}
                >
                  <div className="select__container_title">
                    <p>{selectedSizes || 'Selecciona'}</p>
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
                <div className={`content ${selectSizes ? 'active' : ''}`}>
                  <ul
                    className={`options ${selectSizes ? 'active' : ''}`}
                    style={{ opacity: selectSizes ? '1' : '0' }}
                  >
                    {sizes.map((size) => (
                      <li
                        key={size.id}
                        onClick={() => handleSizesChange(size.name)}
                      >
                        {size.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="label__general">Cantidad</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="input-quantity"
            />
          </div>

          <div className="btn">
            <button
              className="btn__general-primary"
              type="button"
              onClick={handleAddVariation}
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="row__three">
          {variations.map((v: any, index: any) => (
            <div className="variation" key={index}>
              <div className="item">
                <div className="container_color">
                  <div
                    className="color__box"
                    style={{ backgroundColor: baseColors.find((c: any) => c.name === v.color)?.hex || '#ccc' }}
                  ></div>
                  <div>
                    <p>{v.color}</p>
                    <small>Color base</small>
                  </div>
                </div>
              </div>
              <div className="item">
                <div>
                  {v.size}
                  <p>Talla</p>
                </div>
              </div>
              <div className="item">
                <div>
                  {v.quantity}
                  <p>Cantidad</p>
                </div>
              </div>
              <div>
                <button
                  className="btn__general-danger"
                  onClick={() => handleDeleteVariation(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Variations;
