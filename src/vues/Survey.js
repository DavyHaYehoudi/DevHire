import { Link, useParams } from "react-router-dom";

const Survey = () => {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const prevQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;

  const nextQuestionNumber = questionNumberInt + 1;
  return (
    <div>
      <h1>Questionnaire 🧮</h1>
      <p>Voici le numéro de la question : {questionNumber} </p>
      <Link to={`/survey/${prevQuestionNumber}`}>Précédant</Link>
      {nextQuestionNumber === 10 ? (
        <Link to="/results">Résultats</Link>
      ) : (
        <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
      )}
    </div>
  );
};

export default Survey;
