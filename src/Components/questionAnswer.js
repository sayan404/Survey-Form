
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import questionsData from "../Utils/questionsData";
import React, { useEffect, useState } from "react";
import "./questionAnswer.css";
const QuestionAnswer = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submissionConfirm, setSubmissionConfirm] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  const [tempSubmit, setTempSubmit] = useState(false);
  // let setTempSubmit = false
  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: questionsData[currentQuestionIndex].id,
        answer,
      },
    ]);

    if (currentQuestionIndex + 1 < questionsData.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setConfirmationOpen(true);
    }
  };
  const handleConfirmationClose = (confirmed) => {
    if (!confirmed) {
      setConfirmationOpen(false);
      setCurrentQuestionIndex(0);
    }
  };

  useEffect(() => {
    if (submissionConfirm) {
      localStorage.setItem("dataKey", JSON.stringify(answers));
      setAnswers([]);
      setTextAnswer("");
      setCurrentQuestionIndex(0);
      setConfirmationOpen(false);
      setSubmissionConfirm(false);
    }
  }, [submissionConfirm]);
  const onClickHandler = () => {
    setCurrentQuestionIndex(0);
    setShowQuestions(true);
    setSubmissionConfirm(false);
  };
  const onCongoHandler = () => {
    setTempSubmit(true);
    setTimeout(() => {
      setSubmissionConfirm(true);
      setConfirmationOpen(true);
      setTempSubmit(false);
      setShowQuestions(false);
    }, 5000);
  };
  return (
    <>
      {!showQuestions ? (
        <Box>
          <div variant="h4" gutterBottom className="typoStyle">
            <p>Welcome to our Survey!</p>
            <Button
              variant="contained"
              color="primary"
              onClick={onClickHandler}
            >
              Start
            </Button>
          </div>
        </Box>
      ) : (
        <Box className="containerClass">
          {currentQuestionIndex < questionsData.length ? (
            <>
              <div >
                <p className="typo-1">
                  Question {currentQuestionIndex + 1}/{questionsData.length}
                </p>
              </div>
              <div>
                <p className="typo-2">
                  {questionsData[currentQuestionIndex].question}
                </p>
              </div>
              {questionsData[currentQuestionIndex].type === "rating" && (
                <div className="buttons-1">
                  {questionsData[currentQuestionIndex].ratingRange.map(
                    (rating) => (
                      <Button
                        key={rating}
                        variant="contained"
                        style={{
                          backgroundColor: "#24a0ed",
                          color: "white",
                          margin: "5px",
                        }}
                        onClick={() => handleAnswer(rating)}
                      >
                        {rating}
                      </Button>
                    )
                  )}
                </div>
              )}
              {questionsData[currentQuestionIndex].type === "text" && (
                <div className="buttons-1">
                  <input
                    type="text"
                    value={textAnswer}
                    className="input-1"
                    onChange={(e) => setTextAnswer(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      color: "white",
                      margin: "5px",
                    }}
                    onClick={() => handleAnswer(textAnswer)}
                  >
                    SUBMIT
                  </Button>
                </div>
              )}
              <div className="buttons-2">
                <Button
                  style={{
                    color: "white",
                    margin: "5px",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleAnswer(null)}
                >
                  Skip
                </Button>
                {currentQuestionIndex > 0 && (
                  <Button
                    style={{
                      color: "white",
                      margin: "5px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
                    }
                  >
                    PREVIOUS
                  </Button>
                )}
                {currentQuestionIndex < questionsData.length - 1 && (
                  <Button
                    style={{
                      margin: "5px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
                    }
                  >
                    NEXT
                  </Button>
                )}
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Confirmation Dialog */}

          <Dialog
            open={confirmationOpen}
            onClose={() => handleConfirmationClose(false)}
          >
            {!submissionConfirm ? (
              <>
                <DialogTitle>Submit Survey</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to submit the survey? Once submitted,
                    you cannot change your answers.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => handleConfirmationClose(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={onCongoHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </>
            ) : (
              <></>
            )}
            {tempSubmit ? (
              <>
                <Dialog
                  open={confirmationOpen}
                  onClose={() => handleConfirmationClose(false)}
                >
                  <DialogContent
                    style={{
                      height: "200px",
                      width: "550px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DialogContentText>
                      Thank you for your time and participation 🎉
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <></>
            )}
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default QuestionAnswer;
