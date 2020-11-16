import { useState } from 'react';

const useUpdate = ( url, props, redirectTo ) => {

  const [ state, setState ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const deleteData = ()=> {
    setIsLoading(true)
    return fetch(`/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.token
      },
      method: 'DELETE'
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
    deleteData, 
    isLoading,
    error
  ]
};

export default useUpdate;