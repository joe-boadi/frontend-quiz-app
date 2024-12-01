import { useEffect, useState } from "react";

  const usePersistedState = (key:string,value:unknown) => {
    const [state, setState] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : value;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);
  
    return [state, setState] as const;
  }



export  {usePersistedState};