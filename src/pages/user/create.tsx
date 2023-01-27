import React from "react";
import { useAppDispatch } from "../../app/hooks";

const CreateUserPage = () => {
  const dispatch = useAppDispatch();

  // here on submit we need to dispatch createUser thunk method from userSlice

  

  return <div>CreateUserPage</div>;
};

export default CreateUserPage;
