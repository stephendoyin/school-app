import { useState } from "react";
import RadioList from "../RadioList";
import { motion } from "framer-motion";

function QuestionFour({ setDisabled, answers, setAnswersIndex, setAnswers }) {
  const [values, setValues] = useState(["Yes", "No"]);

  const setAttitudeFunc = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
    setAnswersIndex((prev) => ({
      ...prev,
      [name]: value === "Yes" ? true : false,
    }));
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
      <h6 style={{ fontSize: "1.5rem" }}> Is fees entered correct ?</h6>

      <div>
        <div className="d-flex flex-wrap">
          {values.map((value, i) => (
            <RadioList
              key={i}
              population={answers.correct_fees}
              setPop={(e) => setAttitudeFunc(e)}
              value={value}
              name={"correct_fees"}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default QuestionFour;
