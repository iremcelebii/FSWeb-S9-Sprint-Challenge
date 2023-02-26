import React from "react";
import { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "(2, 2)";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  const [hata, setHata] = useState("");

  function sonrakiIndex(yon) {
    if (yon == "left") {
      if (index == 0 || index == 3 || index == 6) {
        setIndex(index);
        setHata("Sola gidemezsiniz");
      } else {
        setHata("");
        setIndex(index - 1);
        setSteps(steps + 1);
        if (index == 1) setMessage("(1,1)");
        if (index == 2) setMessage("(2,1)");
        if (index == 4) setMessage("(1,2)");
        if (index == 5) setMessage("(2,2)");
        if (index == 7) setMessage("(1,3)");
        if (index == 8) setMessage("(2,3)");
      }
    }

    if (yon == "right") {
      if (index == 2 || index == 5 || index == 8) {
        setIndex(index);
        setHata("Sağa gidemezsiniz");
      } else {
        setHata("");
        setIndex(index + 1);
        setSteps(steps + 1);
        if (index == 0) setMessage("(2,1)");
        if (index == 1) setMessage("(3,1)");
        if (index == 3) setMessage("(2,2)");
        if (index == 4) setMessage("(3,2)");
        if (index == 6) setMessage("(2,3)");
        if (index == 7) setMessage("(3,3)");
      }
    }
    if (yon == "up") {
      if (index == 0 || index == 1 || index == 2) {
        setIndex(index);
        setHata("Yukarıya gidemezsiniz");
      } else {
        setHata("");
        setIndex(index - 3);
        setSteps(steps + 1);
        if (index == 3) setMessage("(1,1)");
        if (index == 4) setMessage("(2,1)");
        if (index == 5) setMessage("(3,1)");
        if (index == 6) setMessage("(1,2)");
        if (index == 7) setMessage("(2,2)");
        if (index == 8) setMessage("(3,2)");
      }
    }
    if (yon == "down") {
      if (index == 6 || index == 7 || index == 8) {
        setIndex(index);
        setHata("Aşağıya gidemezsiniz");
      } else {
        setHata("");
        setIndex(index + 3);
        setSteps(steps + 1);
        if (index == 0) setMessage("(1,2)");
        if (index == 1) setMessage("(2,2)");
        if (index == 2) setMessage("(3,2)");
        if (index == 3) setMessage("(1,3)");
        if (index == 4) setMessage("(2,3)");
        if (index == 5) setMessage("(3,3)");
      }
    }

    if (yon == "reset") {
      setMessage(initialMessage);
      setEmail(initialEmail);
      setSteps(initialSteps);
      setIndex(initialIndex);
      setHata("");
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    let dataPost = {
      x: message.split("")[1],
      y: message.split("")[3],
      steps: steps,
      email: email,
    };
    axios
      .post("http://localhost:9000/api/result", dataPost)
      .then((res) => {
        console.log("başarılı", res);
        setHata(res.data.message);
        setEmail(initialEmail);
      })
      .catch((err) => {
        console.log("başarısız", err.response);
        setHata(err.response.data.message);
        setEmail(initialEmail);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {message}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{hata}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => sonrakiIndex("left")}>
          SOL
        </button>
        <button id="up" onClick={() => sonrakiIndex("up")}>
          YUKARI
        </button>
        <button id="right" onClick={() => sonrakiIndex("right")}>
          SAĞ
        </button>
        <button id="down" onClick={() => sonrakiIndex("down")}>
          AŞAĞI
        </button>
        <button id="reset" onClick={() => sonrakiIndex("reset")}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
