import { create } from "zustand";

export const useImageViewStore = create((set, get) => ({
    isImageInView: false,
    selectedImageURL: '',

    setImageView: (boolvalue) => {
        set({ isImageInView: boolvalue }); 
    },
    setImageURL: (url) => {
        set({ selectedImageURL: url }); 
    },
}));
