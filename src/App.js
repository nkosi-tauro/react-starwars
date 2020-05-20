import React, {useState} from 'react';


const App = props => {
  const [state, setState] = useState({
    selectedCharacter: 1,
    side : "light",
    destroyed: false
  });

  const sidehandler = side => {
    setState(
      { ...state,side: side }
    )
  }

  const charSelectHandler = event => {
    const charId = event.target.value;
    setState({...state,selectedCharacter: charId})
  }

  const destructionHandler = () => {
    setState(
      { ...state,destroyed : true }
    )
  }

  let content = (
    <React.Fragment>
      <CharPicker
        side={state.side}
        selectedChar={state.selectedCharacter}
        onCharSelect={state.charSelectHandler}
      />
      <Character selectedChar={state.selectedCharacter}/>
      <button onClick={sidehandler.bind(this,"light")}>Light Side</button>
      <button onClick={sidehandler.bind(this,"dark")}>Dark Side</button>
      {state.side === "dark" && (
        <button onClick={destructionHandler}>Destroy!</button>
      )}
    </React.Fragment>
  );

  if (state.destroyed){
    content= (<h1>Total Destruction</h1>)
  }

  return content;

};

export default App;
