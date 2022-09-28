import { useEffect } from "react";

const useOnClickOutside = (ref, handler)=>{

    useEffect(()=>{
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return; 
            }
            handler(event);
        }
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return()=>{
            //컴포넌트 언마운트 시에 리스너 이벤트를 없애주는 코드
            document.addEventListener("mousedown", listener)
            document.addEventListener("touchstart", listener)
        }
    },[ref, handler])
}

export default useOnClickOutside;