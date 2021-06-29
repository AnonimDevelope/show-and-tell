import React, { useState, memo } from "react";
import * as style from "./SignInModal.module.css";
import { useSelector } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import ResetPassword from "./ResetPassword/ResetPassword";
import { GrClose } from "@react-icons/all-files/gr/GrClose";

const SignInModal = ({ onClose, isVisible }) => {
  const [page, setPage] = useState("SignIn");
  const isLoading = useSelector((state) => state.auth.userLoading);

  let Page = (
    <SignIn
      isLoading={isLoading}
      onClickSignUp={() => setPage("SignUp")}
      onClickResetPassword={() => setPage("Reset")}
    />
  );

  if (page === "Reset")
    Page = (
      <ResetPassword
        isLoading={isLoading}
        onClickSignIn={() => setPage("SignIn")}
      />
    );

  if (page === "SignUp")
    Page = (
      <SignUp isLoading={isLoading} onClickSignIn={() => setPage("SignIn")} />
    );

  if (isVisible) {
    return (
      <div className={style.wrapper}>
        <ClickAwayListener onClickAway={onClose}>
          <div
            style={page === "Reset" ? { maxWidth: 700, maxHeight: 500 } : null}
            className={style.card}
          >
            <GrClose onClick={onClose} className={style.close} size={25} />
            {Page}
          </div>
        </ClickAwayListener>
      </div>
    );
  }

  return null;
};

export default memo(SignInModal);
