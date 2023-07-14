import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/style/colors";
import Loader from "../components/Loader";

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

const Survey = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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

  console.log("datasss", data);

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isLoading && <Loader />}
      <QuestionContent>{data[questionNumber]} </QuestionContent>
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
