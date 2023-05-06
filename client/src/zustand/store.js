import create from 'zustand';

const useJsonDataStore = create((set) => ({
    jsonData: null,
    setJsonData: (data) => set({ jsonData: data })
  }));
  
  export default useJsonDataStore;