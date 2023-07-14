import { useContext, useEffect, useState } from "react";
import { SurveyContext } from "../utils/context";
import styled from "styled-components";
import colors from "../utils/style/colors";
import { StyledLink } from "../utils/style/Atoms";
import Loader from "../components/Loader";
import axios from "axios";
import { useTheme } from "../utils/style/theme";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === "light" ? colors.backgroundLight : colors.backgroundDark};
`;

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`;

const DescriptionWrapper = styled.div`
  padding: 60px;
`;

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === "light" ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`;

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === "light" ? colors.secondary : "#ffffff")};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function formatFetchParams(answers) {
  const answerNumbers = Object.keys(answers);

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0;
    const separator = isFirstParam ? "" : "&";
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`;
  }, "");
}

function Results() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const { answers } = useContext(SurveyContext);
  const fetchParams = formatFetchParams(answers);
  const getData = async () => {
    try {
      const fetching = await axios(
        `${process.env.REACT_APP_API_KEY}/results?${fetchParams}`
      );
      console.log("fetching", fetching.data.resultsData);
      setData(fetching.data.resultsData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //   const { data, isLoading, error } = useFetch(
  //     `http://localhost:8000/results?${fetchParams}`
  //   )

  //   const resultsData = data?.resultsData;

  return isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        Les compétences dont vous avez besoin :
        {data &&
          data.map((result, index) => (
            <JobTitle
              key={`result-title-${index}-${result.title}`}
              theme={theme}
            >
              {result.title}
              {index === data.length - 1 ? "" : ","}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink $isFullLink to="/freelances">
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {data &&
          data.map((result, index) => (
            <JobDescription
              key={`result-detail-${index}-${result.title}`}
              theme={theme}
            >
              <JobTitle theme={theme}>{result.title}</JobTitle>
              <p>{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  );
}

export default Results;
