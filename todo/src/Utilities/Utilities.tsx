
interface Todo {
    id: number
    tittel: string,
    opprettelse: string,
    frist: string,
    kategori: Kategori
    utfort: boolean
  }
  
  interface TodoI {
    todo: Todo
    children?: React.ReactNode
  }

  interface TodoValidation {
    id?: string
    tittel?: string,
    opprettelse?: string,
    frist?: string,
    kategori?: string
    utfort?: string
  }
  
  interface Kategori {
    id: number,
    tittel: string
  }

  const kategoriDefault = {id: 0, tittel: ""};
  const todoDefault = {id: 0, tittel: "", frist: "", opprettelse: "", kategori: kategoriDefault, utfort: false};

export type {Todo, TodoI, TodoValidation, Kategori};
export {todoDefault, kategoriDefault};