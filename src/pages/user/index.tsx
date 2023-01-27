import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { getAllUsers } from "../../modules/user/redux/userSlice";

const UserListPage = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return <div>UserListPage</div>;
};

export default UserListPage;
