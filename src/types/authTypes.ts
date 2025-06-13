interface RegisterUser { 
  nombre: string,
  email: string,
  password: string,
}

interface LoginUser { 
  email: string,
  password:string
}

interface DataUser { 
  id?: string,
  nombre: string,
  email: string
}

export { RegisterUser, LoginUser, DataUser}