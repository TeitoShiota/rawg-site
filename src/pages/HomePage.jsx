import { useEffect, useState } from "react";
import { useApiHandler } from '../services/APIHandler'

export default function HomePage() {

    const [ initData, getNextPage, games, loading, error ] = useApiHandler();

    // const getData = async () => {
    //     const response = await apiHandler({path: '/games'});
    //     setData(response.results);
    // }

    useEffect(() => {
        initData({path: '/games'});
        console.log(games);
        

    }, [games]);

    if (loading !== false) { return <p>Loading...</p> }
    if (error) { return <p>There was an error loading the data. <br/> {error.message} </p> }
    
    return (
        <>
            <h1>Home Page</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <h2>{game.name}</h2>
                        <p>{game.description_raw}</p>
                        <img src={game.background_image} alt={game.name} />
                    </li>
                ))}
            </ul>

        </>
    );
}