import { useState } from 'react';

const useForm = ( props ) => {
  
  const [ state, setState ] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setState(state=>({...state, user_id: props.current_user.id }))
    setState(state => ({...state, [event.target.name]: event.target.value}));
  }
  
  const handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }
    postData(projects)
  }

  return [
    state,
    handleInputChange
  ]
}

export default useForm;