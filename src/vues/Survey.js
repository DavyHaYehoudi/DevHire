import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/style/colors";
import Loader from "../components/Loader";
import { SurveyContext } from "../utils/context";
import { useTheme } from "../utils/style/theme";

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
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
  background-color: ${({ theme }) =>
    theme === "light" ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
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
  const { theme } = useTheme();
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
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading && <Loader />}
      <QuestionContent theme={theme}>{data[questionNumber]} </QuestionContent>
      {answers && (
        <ReplyWrapper>
          <ReplyBox
            onClick={() => saveAnswers({ [questionNumber]: true })}
            isSelected={answers[questionNumber] === true}
            theme={theme}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            onClick={() => saveAnswers({ [questionNumber]: false })}
            isSelected={answers[questionNumber] === false}
            theme={theme}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}
      <LinkWrapper theme={theme}>
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
