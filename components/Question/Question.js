import { useState, useEffect } from "react";
import RadioList from "../RadioList";
import { motion } from "framer-motion";

function Question({ setDisabled, answers, setAnswers, setAnswersIndex }) {
  const [values, setValues] = useState([
    "A term",
    "More than 1-2 session",
    "3+ sessions",
  ]);

  const setDuratn = (e, i) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
    setAnswersIndex((prev) => ({ ...prev, [name]: i + 1 }));
    setDisabled(false);
  };

  const content = {
    hidden: {
      opacity: 0,
      y: 0,
      x: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: 0,
        duration: 0.9,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={content}>
      <h6 className="d-inline-block question" style={{ fontSize: "1.5rem" }}>
        How long has this parent and child been registered?
      </h6>

      <div>
        <div className="d-flex flex-wrap">
          {values.map((value, i) => (
            <RadioList
              key={i}
              population={answers?.sessions_paid}
              setPop={(e) => setDuratn(e, i)}
              value={value}
              name={"sessions_paid"}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Question;
