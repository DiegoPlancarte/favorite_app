import { useState } from 'react';

const useUpdate = ( url, props, redirectTo ) => {

  const [ state, setState ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const updateData = (data)=> {
    setIsLoading(true)
    fetch(`/${url}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.token
      },
      method: 'PUT'
    })
    .then((response)=>{
      if(response.status === 200){
          setIsLoading(false)
          return(response.json())
        }
    })
    .then((data) => {
      setState(data);
      props.history.push(`/${redirectTo}`)
    })
    .catch((err) => {
      setIsLoading(true)
      if(err) {
        setError(err)
      }
    })
  }

  return [
    updateData, 
    isLoading,
    error
  ]
};

export default useUpdate;