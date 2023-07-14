import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/style/colors";
import Loader from "../components/Loader";
import { SurveyContext } from "../utils/context";

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
  margin: 30px;
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`;
const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : "none"};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`;
const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Survey = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { answers, saveAnswers } = useContext(SurveyContext);
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const prevQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;

  const nextQuestionNumber = questionNumberInt + 1;

  const getData = async () => {
    try {
      const fetching = await axios(`${process.env.REACT_APP_API_KEY}/survey`);
      setData(fetching.data.surveyData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isLoading && <Loader />}
      <QuestionContent>{data[questionNumber]} </QuestionContent>
      {answers && (
        <ReplyWrapper>
          <ReplyBox
            onClick={() => saveAnswers({ [questionNumber]: true })}
            isSelected={answers[questionNumber] === true}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            onClick={() => saveAnswers({ [questionNumber]: false })}
            isSelected={answers[questionNumber] === false}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédant</Link>
        {nextQuestionNumber === 10 ? (
          <Link to="/results">Résultats</Link>
        ) : (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
};

export default Survey;
