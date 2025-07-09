import React, { useRef, KeyboardEvent, useState, useEffect } from "react";
import "./styles/General.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  resetProduct,
  addTag,
  removeTag,
  addImages,
  removeImage,
  clearImages,
} from "../../../../redux/state/Product";
import APIs from "../../../../services/APIs";

// Helper para convertir archivos a base64
function readFilesAsBase64(files: File[]): Promise<string[]> {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

export function General() {
  const dispatch = useDispatch();
  const { title, price, subcategory, tags, images } = useSelector(
    (state: any) => state.product
  );

  const [categories, setCategories] = useState<any>([]);

  const fetch = async () => {
    let store_id = 1;
    try {
      let result: any = await APIs.getCategories(store_id);
      setCategories(result.data);
    } catch (error) {
      // Manejo de error si quieres
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const tagInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProduct({ title: e.target.value }));
  };

   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProduct({ price: Number(e.target.value) }));
  };


  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateProduct({ subcategory: e.target.value }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = tagInputRef.current?.value.trim() || "";
    if (e.key === "Enter" && value !== "") {
      e.preventDefault();
      dispatch(addTag(value));
      tagInputRef.current!.value = "";
    }
    if (e.key === "Backspace" && value === "" && tags.length > 0) {
      dispatch(removeTag(tags.length - 1));
    }
  };

  const handleRemoveTag = (index: number) => {
    dispatch(removeTag(index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length === 0) return;

    readFilesAsBase64(files).then((base64Images) => {
      dispatch(addImages(base64Images));
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length === 0) return;

    readFilesAsBase64(files).then((base64Images) => {
      dispatch(addImages(base64Images));
    });
  };

  const handleRemoveImage = (index: number) => {
    dispatch(removeImage(index));
  };

  const handleClearImages = () => {
    dispatch(clearImages());
  };

  const handleClose = () => {
    dispatch(resetProduct());
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Controla la visibilidad de la modal
  const open = true; // Cambia según tu lógica

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 className="modal-title">Nuevo Producto</h2>
            <p className="modal-subtitle">Datos generales del nuevo producto</p>
          </div>
          <button className="modal-close-button" onClick={handleClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="product-form-container">
            {/* Form Fields Section */}
            <div className="form-fields-section">
              {/* Title Input */}
              <div className="form-field">
                <label className="field-label">Título</label>
                <input
                  type="text"
                  className="field-input"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Ingresa el título del producto"
                />
              </div>

              {/* Subcategory Select */}
              <div className="form-field">
                <label className="field-label">Subcategoría</label>
                <select
                  className="field-select"
                  value={subcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="">Selecciona una subcategoría</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
               <div className="form-field">
                <label className="field-label">Precio</label>
                <input
                  type="number"
                  className="field-input"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Ingresa el título del producto"
                />
              </div>

              {/* Tags Input */}
              <div className="form-field">
                <label className="field-label">Etiquetas</label>
                <div className="tags-input-container">
                  {tags.map((tag: string, index: number) => (
                    <span key={index} className="tag-item">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="tag-remove-button"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="tags-input"
                    ref={tagInputRef}
                    onKeyDown={handleTagKeyDown}
                    placeholder={
                      tags.length === 0 ? "Escribe y presiona Enter" : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="images-section">
              <div className="images-section-header">
                <label className="images-section-label">
                  Imágenes del Producto
                </label>
                <p className="images-section-description">
                  Agrega las imágenes que representen mejor tu producto
                </p>
              </div>

              {/* Upload Area */}
              <div
                className="image-upload-area"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="upload-area-content">
                  <div className="upload-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7,10 12,15 17,10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div className="upload-text">
                    <h4>Arrastra imágenes aquí o haz click para seleccionar</h4>
                    <p>Soporta JPG, PNG, GIF hasta 10MB cada una</p>
                  </div>
                  <button type="button" className="upload-button">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Seleccionar Archivos
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              {/* Selected Images */}
              {images.length > 0 && (
                <div className="selected-images-container">
                  <div className="selected-images-header">
                    <span className="selected-images-title">
                      Imágenes seleccionadas ({images.length})
                    </span>
                    <button
                      type="button"
                      className="clear-images-button"
                      onClick={handleClearImages}
                    >
                      Limpiar todo
                    </button>
                  </div>

                  <div className="images-grid">
                    {images.map((image: string, index: number) => (
                      <div key={index} className="image-item">
                        <div className="image-preview">
                          <img
                            src={image}
                            alt={`Imagen ${index}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="image-remove-button"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
