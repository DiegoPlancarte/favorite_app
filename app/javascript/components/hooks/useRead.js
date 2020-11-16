import { useState, useEffect } from 'react';

const useRead = ( url ) => {
  
  const [ state, setState ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)
      fetch(`/${url}`)
        .then((response)=>{
          if(response.status === 200){
              return(response.json())
            }
        })
        .then((data) => {
          setState(data);
          setIsLoading(false)
        })
        .catch((err) => {
          if(err) {
            setIsLoading(true)
            setError(err)
          }
        })
    }
    fetchData()
  }, []);

  return [
    state,
    setState,
    isLoading,
    error
  ]
};

export default useRead;