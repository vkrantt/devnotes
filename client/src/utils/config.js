export const BASE_URL= 'http://localhost:3030/api'

export const toastConfig = {
    duration: 2000,
    style: {
        border: '1px solid var(--theme)',
        padding: '16px',
        borderRadius : '0px',
        color: 'var(--theme)',
      },
      iconTheme: {
        primary: 'var(--theme)',
        secondary: '#fff',
      },
}

export const storageService = {
  get: (id)=>{
    localStorage.getItem(id)
  },
  set: (id, data)=>{
    localStorage.setItem(id, JSON.stringify(data))
  },
  remove: (id)=>{
    localStorage.removeItem(id)
  },
  clearAll: ()=>{
    localStorage.clear();
  }
}