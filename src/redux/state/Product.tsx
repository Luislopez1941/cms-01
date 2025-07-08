import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ColorOption {
  id: number;
  name: string;
}

export interface SizeOption {
  id: number;
  name: string;
}

export interface Variation {
  hxd: string;
  sku: string;
  size: SizeOption | null;
  color: ColorOption | null;
}

export interface ProductState {
  title: string;
  subcategory: string;
  tags: string[];
  images: string[]; 
  variations: Variation[];
}

const initialState: ProductState = {
  title: '',
  subcategory: '',
  tags: [],
  images: [],
  variations: [],
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Partial<ProductState>>) => {
      return { ...state, ...action.payload };
    },
    resetProduct: () => initialState,
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<number>) => {
      state.tags.splice(action.payload, 1);
    },
    addImages: (state, action: PayloadAction<string[]>) => {
      state.images.push(...action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1);
    },
    clearImages: (state) => {
      state.images = [];
    },
    addVariation: (state, action: PayloadAction<Variation>) => {
      state.variations.push(action.payload);
    },
    removeVariation: (state, action: PayloadAction<number>) => {
      state.variations.splice(action.payload, 1);
    },
    clearVariations: (state) => {
      state.variations = [];
    },
  },
});

export const {
  updateProduct,
  resetProduct,
  addTag,
  removeTag,
  addImages,
  removeImage,
  clearImages,
  addVariation,
  removeVariation,
  clearVariations,
} = ProductSlice.actions;

export default ProductSlice.reducer;
