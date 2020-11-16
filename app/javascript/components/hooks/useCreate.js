import { useState } from 'react';

const useCreate = ( url, props, redirectTo ) => {

  const [ state, setState ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const createData = (data)=> {
    setIsLoading(true)
    fetch(`/${url}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.token
      },
      method: 'POST'
    })
    .then((response)=>{
      if(response.status === 200){
          setIsLoading(false)
          return(response.json())
        }
    })
    .then((data) => {
      setState(data);
      if (`${redirectTo}` === 'refresh') {
        window.location.reload(false)
      }
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
    createData,
    isLoading,
    error, 
  ]
};

export default useCreate;