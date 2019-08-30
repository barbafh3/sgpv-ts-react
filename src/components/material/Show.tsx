import React, { useEffect } from "react";
import { clearMaterial } from "../../store/material/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import history from "../../history";

const MaterialShow: React.FC = () => {
  const dispatch = useDispatch();
  const material = useSelector((state: AppState) => state.materials.material);

  useEffect(() => {
    if (!material) {
      history.push("/");
    }
    return () => {
      dispatch(clearMaterial());
    };
  }, [dispatch, material]);

  return <div>Show</div>;
};

export default MaterialShow;
