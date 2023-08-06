import ItemToko from "./Item/ItemToko";
import InputItem from "./Item/InputItem";
import EditItem from "./Item/EditItem";
import { useEffect, useState } from "react";

const PageItemToko = () => {
  const [pageItem, setPageItem] = useState();

  useEffect(() => {
    setPageItem(<ItemToko setPageItem={setPageItem} />);
  }, []);

  return <div className="page-item-toko container-fluid">{pageItem}</div>;
};

export default PageItemToko;
