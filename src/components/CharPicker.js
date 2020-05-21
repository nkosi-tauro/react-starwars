import React, {useState, useEffect} from 'react';
import './CharPicker.css'


const CharPicker = (props) => {

    const [loadedChars, setloadedChars] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=> {
        setIsLoading(true);
        fetch('https://swapi.dev/api/people')
        .then(data => {
            if (!data.ok){
                throw new Error ("Failed to fetch")
            }
            return data;
        })
        .then(charData=> {
            const selectedCharacters = charData.results.slice(0,5);
            setIsLoading(false);
            setloadedChars(
                selectedCharacters.map((char, index)=> ({
                name: char.name,
                id: index + 1
            })))
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
        })
        

    }, []);


    let content = <p>Loading characters...</p>

    if(
        !isLoading &&
        loadedChars &&
        loadedChars.length > 0
    ){
        content = (
            <select
                onChange={props.onCharSelect}
                value={props.selectedChar}
                className={props.side}
            >
                {loadedChars.map(char =>(
                   <option key={char.id} value={char.id}>
                       {char.name}
                   </option> 
                ))}
            </select>
        )
    } else if (
        !isLoading &&
        (!loadedChars || loadedChars.length === 0)
    ){
        content = <p> No Data Available</p>
    }

    return content;

}


export default CharPicker;