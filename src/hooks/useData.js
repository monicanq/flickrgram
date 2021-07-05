import { useEffect } from "react/cjs/react.development";

const useData = () => {

    useEffect(()=>{
        if (data /*&& page > previousPage */&& tag === preTag){
            setList([...list, ...data.photos.photo]);
            // previousPage += 1;
        }
        if (data /*&& page > previousPage*/ && tag !== preTag){
            setList([...data.photos.photo]);
            // previousPage += 1;
        }
        setPreTag(tag);

    });

    return null;
}
 
export default useData;



