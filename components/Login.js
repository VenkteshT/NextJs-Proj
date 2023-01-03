import React, { useState } from "react";
import style from "../styles/loginpage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import hide from "../public/hide.png";
import unhide from "../public/unhide.png";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/store";
export default function Login(props) {
  const dispatch = useDispatch();
  //// subuscribing to store and accessing the user data ////

  const user = useSelector((state) => state.user.userData.users);

  //// state for check user exist or not///

  const [validateUser, updateUser] = useState({
    userExist: true,
    details_matching: true,
  });

  ////      //////

  const router = useRouter();

  //// state for taking user data ////

  const [userData, updateUserData] = useState({
    name: "",
    password: "",
  });

  ///// Setting states for Password visible and hide ////////

  const [password_hide_icon, updatePasswrodHideIcon] = useState(true);
  const [textType, setTextType] = useState("password");

  ///// Password visible and hide handling function ///////

  function togglePasswordIcon() {
    updatePasswrodHideIcon((privious) => !privious);
    if (password_hide_icon) setTextType("text");
    else setTextType("password");
  }

  ///// Login Handling Function /////

  function handleLogin(e) {
    // preventing from page refresh //
    e.preventDefault();
    const userExist = user.find((user) => user.name === userData.name);
    if (userExist) {
      if (
        userExist.name === userData.name &&
        userExist.pass === userData.password
      ) {
        dispatch(userActions.updateUser({ isExist: true }));
        dispatch(userActions.updateCurrentUser({ name: userData.name }));
        router.push("/Tasks");
      } else {
        dispatch(userActions.updateUser({ isExist: false }));
        updateUser((prev) => {
          return {
            ...prev,
            details_matching: false,
          };
        });
      }
    } else {
      updateUser((prev) => {
        return {
          ...prev,
          userExist: false,
        };
      });
    }
  }

  //// input handling function ///

  function handleUserInput(e) {
    const { name, value } = e.target;
    updateUserData((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
    updateUser({
      userExist: true,
      details_matching: true,
    });
  }

  /////    main function              ///////

  return (
    <form className={`${style.login_page_container}`} onSubmit={handleLogin}>
      <h3 className={style.greetings}> Welcome !</h3>
      <div className={style.signin_title}>
        <span className={style.main_title}> Sign in to </span>
        <span className={style.sub_title}> loren ipsum is simply </span>
      </div>
      <div className={style.inputs}>
        {!validateUser.details_matching && (
          <span className={style.msg}>
            {" "}
            username or password dosent match !!{" "}
          </span>
        )}
        {!validateUser.userExist && (
          <span className={style.msg}> user dosen't exist please signup !</span>
        )}
        <div className={style.name_input_div}>
          <span className={style.username_span}> User Name </span>
          <input
            type="text"
            className={style.username}
            placeholder="Enter your Username"
            name="name"
            onChange={handleUserInput}
          />
        </div>
        <div className={style.password_input_div}>
          <span className={style.password_span}> Password </span>
          <input
            name="password"
            type={textType}
            className={style.password}
            placeholder="Enter your Password"
            onChange={handleUserInput}
          />
          <Image
            className={style.hide_icon}
            src={password_hide_icon ? hide : unhide}
            width={20}
            height={20}
            onClick={togglePasswordIcon}
            alt="icon"
          />
        </div>
        <div className={style.others}>
          <div className={style.checkbox_div}>
            <input type={`checkbox`} />
            <span>Remember me</span>
          </div>
          <span className={style.forgot_password}>Forgot Password?</span>
        </div>
      </div>
      <button className={style.login_btn}>Login</button>
      <div className={style.register_option}>
        <span style={{ opacity: ".7", fontWeight: "400" }}>
          Do you have account?
        </span>
        <span
          className={style.register_span}
          onClick={() => router.push("/SignUp")}
        >
          Register
        </span>
      </div>
    </form>
  );
}
