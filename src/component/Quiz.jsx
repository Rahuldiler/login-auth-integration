import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/quiz.css";
const Quiz = () => {
  const URL =
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
 const navigate = useNavigate();
  const [que, setQue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queValue, setQueValue] = useState();
  const [correct, setCorrect] = useState(0);
  const [page, setPage] = useState(0);
  //   eslint-disable-next-line

  useEffect(() => {
    const handleQuestion = async () => {
      setLoading(true);
      const res = await axios.get(URL);
      try {
        setQue(res?.data?.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    handleQuestion();
  }, []);

  const correctAns = que[0]?.correct_answer
    ?.toLocaleLowerCase()
    ?.includes(queValue?.toLocaleLowerCase());

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < 9) {
      setPage(page + 1);
    } else if (correctAns === true) {
      setCorrect(correct + 1);
    }else {
        navigate("/result",{state:{correct}});
      }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section className="quiz_wrapper">
          <div className="quiz_que">
            <div className="d-flex align-items-center">
              <h6 className="mr-3">Question :</h6>
              <p className="mb-0">{que[page]?.question}</p>
            </div>
            <div className="option_wrapper">
              <p>Option :</p>
              {que[page]?.incorrect_answers.map((index, id) => {
                return (
                  <label htmlFor={index} key={id}>
                    <input
                      type="radio"
                      value={index}
                      name="answer"
                      id={index}
                      onChange={(e) => setQueValue(e.target.value)}
                    />
                    {index}
                  </label>
                );
              })}
              <label htmlFor={que[page]?.correct_answer}>
                <input
                  type="radio"
                  value={que[page]?.correct_answer}
                  name="answer"
                  id={que[page]?.correct_answer}
                  onChange={(e) => setQueValue(e.target.value)}
                />
                {que[page]?.correct_answer}
              </label>
              <div className="w-100 d-flex justify-content-between mt-3">
                <button className="btn btn-danger" type="button" onClick={handlePrev}>
                  Prev
                </button>
                <button className="btn btn-success" type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Quiz;
