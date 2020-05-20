import React, {useState} from 'react';

import CharPicker from './components/CharPicker';
import Character from "./components/Character";


const App = props => {
  const [destroyed, setDestroyed] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("1");
  const [chosenSide, setChosenSide] = useState("light");

  const sidehandler = side => {
    setChosenSide(side)
  }

  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId)
  }

  const destructionHandler = () => {
    setDestroyed(true)
  }

  let content = (
    <React.Fragment>
      <CharPicker
        side={chosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={state.charSelectHandler}
      />
      <Character selectedChar={selectedCharacter}/>
      <button onClick={sidehandler.bind(this,"light")}>Light Side</button>
      <button onClick={sidehandler.bind(this,"dark")}>Dark Side</button>
      {chosenSide === "dark" && (
        <button onClick={destructionHandler}>Destroy!</button>
      )}
    </React.Fragment>
  );

  if (destroyed){
    content= (<h1>Total Destruction</h1>)
  }

  return content;

};

export default App;
