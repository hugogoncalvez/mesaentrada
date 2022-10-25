import { useState } from "react"


export const useForm = () => {
  const [values, setValues] = useState({})
 
  const reset = () => {
    setValues({});
  }

  const handleInputChange = (e) => {
    const nombre = e.target.name
    const valor = e.target.value
    setValues({
      ...values,
      [nombre]: valor
    })
  }

  return [values, handleInputChange, reset, setValues]
}
