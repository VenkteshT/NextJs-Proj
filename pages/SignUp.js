import React, { useState } from "react";
import style from "../styles/signup.module.css";
import hide from "../public/hide.png";
import unhide from "../public/unhide.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { userActions } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
export default function SignUp() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user.userData);
  const router = useRouter();

  ///// state for successfull signup handling ///

  const [isSignUpSuccessful, updateSignUpStatus] = useState(false);

  ////// setting states for Password Visible and hide ///////

  const [password_icon, updatePassword] = useState({
    icon_visible: true,
    textType: "password",
  });
  const [conform_password_icon, updateConformPassword] = useState({
    icon_visible: true,
    textType: "password",
  });

  /////          /////

  const [validateUserInfo, updateUserInfo] = useState({
    userExist: false,
    emailExist: false,
    passwordMatches: true,
  });

  ///// state for use input /////

  const [userData, updateUserData] = useState({
    email: "",
    name: "",
    pass: "",
    c_pass: "",
  });

  ///// password visible and hide handling functions //////

  function password_icon_toggler() {
    updatePassword((p) => {
      return {
        ...p,
        icon_visible: !p.icon_visible,
      };
    });
    if (!password_icon.icon_visible) {
      updatePassword((p) => {
        return {
          ...p,
          textType: "password",
        };
      });
    } else {
      updatePassword((p) => {
        return {
          ...p,
          textType: "text",
        };
      });
    }
  }

  //                                    //

  function conform_password_icon_toggler() {
    updateConformPassword((p) => {
      return {
        ...p,
        icon_visible: !p.icon_visible,
      };
    });
    if (!conform_password_icon.icon_visible) {
      updateConformPassword((p) => {
        return {
          ...p,
          textType: "password",
        };
      });
    } else {
      updateConformPassword((p) => {
        return {
          ...p,
          textType: "text",
        };
      });
    }
  }

  ///// Handle user input change ///

  function userInputHandler(e) {
    updateUserInfo({
      userExist: false,
      emailExist: false,
      passwordMatches: true,
    });
    const { value, name } = e.target;
    updateUserData((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  }

  ////   signup handling function  /////

  function handleRegister(e) {
    // preventing from refreshing //

    e.preventDefault();

    /// check if userName already exist and update the state////

    const isUserExist = store.users.find((user) => user.name === userData.name);
    const isEmailExist = store.users.find(
      (user) => user.email === userData.email
    );
    if (isEmailExist) {
      updateUserInfo((prev) => {
        return {
          ...prev,
          emailExist: true,
        };
      });
      updateSignUpStatus(false);
    }
    if (isUserExist) {
      updateUserInfo((prev) => {
        return {
          ...prev,
          userExist: true,
        };
      });
      updateSignUpStatus(false);
    } else {
      if (userData.pass === userData.c_pass) {
        /// update the password matches state

        updateUserInfo((prev) => {
          return {
            ...prev,
            passwordMatches: true,
          };
        });

        dispatch(userActions.userSignUp({ ...userData }));
        updateUserData({
          email: "",
          name: "",
          pass: "",
          c_pass: "",
        });
        updateSignUpStatus(true);
      } else {
        updateUserInfo((prev) => {
          return {
            ...prev,
            passwordMatches: false,
          };
        });
      }
    }

    if (validateUserInfo.userExist) console.log("user alreay exist");
    if (!validateUserInfo.passwordMatches) console.log("password dosent match");
  }
  /////                               //////

  function handle_login() {
    router.push("/");
  }

  //// main function ////

  return (
    <form
      className={`${style.signup_page_container}`}
      onSubmit={handleRegister}
    >
      <h3 className={style.greetings}> Welcome !</h3>
      <div className={style.signup_title}>
        <span className={style.main_title}> Sign Up to </span>
        <span className={style.sub_title}> loren ipsum is simply </span>
      </div>
      <div className={style.inputs}>
        <div className={style.email_input_div}>
          <span className={style.email_span}> email </span>
          <input
            type="text"
            className={style.email}
            placeholder="Enter your email"
            name="email"
            onChange={userInputHandler}
            value={userData.email}
          />
          <span className={style.msg}>
            {validateUserInfo.emailExist && " email already exist"}
          </span>
        </div>
        <div className={style.name_input_div}>
          <span className={style.username_span}> User Name </span>
          <input
            type="text"
            className={style.username}
            placeholder="Enter your Username"
            name="name"
            onChange={userInputHandler}
            value={userData.name}
          />
          <span className={style.msg}>
            {validateUserInfo.userExist && " username already exist"}
          </span>
        </div>
        <div className={style.password_input_div}>
          <span className={style.password_span}> Password </span>
          <input
            type={password_icon.textType}
            className={style.password}
            placeholder="Enter your Password"
            name="pass"
            onChange={userInputHandler}
            value={userData.pass}
          />
          <Image
            className={style.hide_icon_1}
            src={password_icon.icon_visible ? hide : unhide}
            width={20}
            height={20}
            onClick={password_icon_toggler}
            alt="icon"
          />
        </div>
        <div className={style.conform_password_input_div}>
          <span className={style.conform_password_span}>conform Password </span>
          <input
            type={conform_password_icon.textType}
            className={style.conform_password}
            placeholder="conform your Password"
            name="c_pass"
            onChange={userInputHandler}
            value={userData.c_pass}
          />
          <Image
            className={style.hide_icon_2}
            src={conform_password_icon.icon_visible ? hide : unhide}
            width={20}
            height={20}
            onClick={conform_password_icon_toggler}
            alt="icon"
          />
          {!validateUserInfo.passwordMatches && (
            <span className={style.msg_3}>password dosen't Match </span>
          )}
          {isSignUpSuccessful && (
            <span className={style.msg_4}>
              {" "}
              Signup Successful. go to logIn page{" "}
            </span>
          )}
        </div>
      </div>
      <button className={style.register_btn}>Register</button>
      <div className={style.login_option}>
        <span style={{ opacity: ".7", fontWeight: "400" }}>
          already have account?
        </span>
        <span className={style.login_span} onClick={handle_login}>
          Login
        </span>
      </div>
    </form>
  );
}
