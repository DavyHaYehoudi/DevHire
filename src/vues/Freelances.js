import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../utils/style/colors";
import Card from "../components/Card";
import axios from "axios";
import Loader from "../components/Loader";
import { useTheme } from "../utils/style/theme";

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`;
const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Freelances = () => {
  const{theme}=useTheme()
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const fetching = await axios(
        `${process.env.REACT_APP_API_KEY}/freelances`
      );
      setData( fetching.data.freelancersList)
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
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading && 
      <LoaderWrapper>
      <Loader theme={theme}/>
      </LoaderWrapper>
      }
      <CardsContainer>
        {data.map((profile, i) => (
          <Card
            key={`${profile.name}-${i}`}
            label={profile.jobTitle}
            title={profile.name}
            picture={profile.picture}
          />
        ))}
      </CardsContainer>
    </div>
  );
};

export default Freelances;
