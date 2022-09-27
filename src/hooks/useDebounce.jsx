import {useState, useEffect} from 'react';

const useDebounce = (value, delay)=>{
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value);
        }, delay);

        return()=>{
            //value값이나 delay값이 바뀔 때 호출해준다.
            clearTimeout(handler);
        }
    },[value, delay])

    return debounceValue;
}

export default useDebounce;