import "./App.css";
import Quiz from "./component/Quiz";
import { jsQuiz } from "./constant/quiz";
function App() {
  return (
    <>
      <Quiz questions={jsQuiz} />
    </>
  );
}

export default App;
