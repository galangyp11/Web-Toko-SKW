import ItemToko from "./ItemToko";
import InputItem from "./InputItem";
import EditItem from "./EditItem"
import { useEffect, useState } from "react";

const PageItemToko = () => {
    const [pageItem ,setPageItem] = useState()

    useEffect(()=>{
        setPageItem(<ItemToko setPageItem={setPageItem}/>)
    },[])

    return ( 
        <div className="page-item-toko container-fluid">
            {pageItem}
        </div>
     );
}
 
export default PageItemToko;