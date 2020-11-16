import { useState } from 'react';

const useForm = ( submitFunc, data ) => {
  
  const [ state, setState ] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setState(state => ({...state, [event.target.name]: event.target.value}));
  }
  
  const handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }
    `${submitFunc}`
  }

  return [
    state,
    handleInputChange,
    handleSubmit
  ]
}

export default useForm;