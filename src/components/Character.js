import React, { useState, useEffect } from 'react';
import Summary from './Summary';



const Character = props => {

    const [loadedCharacter, setLoadedCharacter] = useState({})
    const [isLoading, setIsLoading] = useState(false)



    const fetchData = () => {
        setIsLoading(true)
        fetch("https://swapi.dev/api/people/" + props.selectedChar)
            .then(data => {
                if (!data.ok) {
                    throw new Error("Failed to fetch Person")
                }
                return data.json();
            })
            .then(charData => {
                console.log(charData)
                const loadedCharacter = {
                    id: props.selectedChar,
                    name: charData.name,
                    height: charData.height,
                    colors: {
                        hair: charData.hair_color,
                        skin: charData.skin_color
                    },
                    gender: charData.gender,
                    movieCount: charData.films.length
                };
                console.log(loadedCharacter)
                setIsLoading(false)
                setLoadedCharacter(loadedCharacter)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [props.selectedChar])

    let content = <p>Loading Character...</p>

    if (!isLoading && loadedCharacter.id) {
        content = (
            <Summary
                name={loadedCharacter.name}
                gender={loadedCharacter.gender}
                height={loadedCharacter.height}
                hairColor={loadedCharacter.colors.hair}
                skinColor={loadedCharacter.colors.skin}
                movieCount={loadedCharacter.movieCount}
            />
        )
    } else if (!isLoading && !loadedCharacter.id) {
        content = <p> Failed to fetch character</p>
    }

    return content;
}



export default React.memo(Character);