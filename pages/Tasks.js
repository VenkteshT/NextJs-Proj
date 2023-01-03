import React, { useState, useEffect } from "react";
import style from "../styles/task.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

//// Current Date ////
const now = new Date();

/// Random Placeholder messages ///
const PLACEHOLDERS = [
  `Eg. Go to SuperMarket `,
  `Eg. Finish Gardening`,
  `Eg. Go to Fishing`,
  `Eg. Finish my AssignMent`,
];
export default function Tasks() {
  const userExist = useSelector((state) => state.user.userExist);
  const currentUser = useSelector((state) => state.user.userData.currentUser);
  const router = useRouter();
  //// placeholder attribute for storing random message ///.

  const [placeholder, updatePlaceHolder] = useState("");

  //// state for task list ///

  const [tasklist, updatetasklist] = useState([]);

  /// state for current input-entering task ///

  const [task, updatetask] = useState("");

  //// state for checking task limit exided or not? /////

  const [isDailyLimitExided, updateDailyLimit] = useState(false);

  //// Task Adding Handler ////

  function handleAddTask(e) {
    e.preventDefault();
    if (tasklist.length < 5) {
      updatetasklist((p) => [...p, task]);
    } else {
      updateDailyLimit(true);
    }
    updatetask("");
  }

  //// updating input value to current task /////

  function handleUserInput(e) {
    const { value } = e.target;
    updatetask(value);
  }

  //// rendering random placeholder message whenever component render or new task is added ///

  useEffect(() => {
    if (!userExist) router.push("/");
    const n = Math.floor(Math.random() * PLACEHOLDERS.length);
    updatePlaceHolder(PLACEHOLDERS[n]);
  }, [task]);

  ////   logout handling      ////

  function logout() {
    router.push("/");
  }
  return (
    <form
      className={`${style.task_page_container}`}
      onSubmit={handleAddTask}
      onClick={() => updateDailyLimit(false)}
    >
      <h3 className={style.greetings}> Welcome !</h3>
      <div className={style.name_tag}>
        <span className={style.name}> {currentUser} </span>
        <span className={style.greet}> good to see you here :) </span>
      </div>
      <div className={style.task_list}>
        <span className={style.date}> Task for {now.toDateString()} : </span>
        <ul className={style.list}>
          {tasklist.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className={style.show_msg}>
          {isDailyLimitExided ? "Daily Limit Exided !" : null}
        </div>
      </div>

      <div className={style.inputs}>
        <div className={style.task_input_div}>
          <input
            type="text"
            className={style.task}
            placeholder={placeholder}
            onChange={handleUserInput}
            value={task}
          />
        </div>
        <button className={style.addtask_btn}>Add Task</button>
        <div className={style.register_option}>
          <span className={style.logout_span} onClick={logout}>
            Logout
          </span>
        </div>
      </div>
    </form>
  );
}
