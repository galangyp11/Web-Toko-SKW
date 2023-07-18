import "./profilepembeli.css";
import { useState, useEffect } from "react";
import NavbarProfile from "./NavbarProfile";

import InfoPembeli from "./InfoPembeli";
import HalamanEdit from "../edit/HalamanEdit";

const ProfilePembeli = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="profilepembeli">
      <div className="sticky-top">
        <NavbarProfile isEdit={isEdit} />
      </div>

      <div className="profilepembeli-con container d-flex justify-content-center">
        {!isEdit ? (
          <InfoPembeli setIsEdit={setIsEdit} />
        ) : (
          <HalamanEdit setIsEdit={setIsEdit} />
        )}
      </div>
    </div>
  );
};

export default ProfilePembeli;
