import { useEffect, useState } from "react";
import { useApiHandler } from '../services/APIHandler'

export default function HomePage() {

    const [data, setData] = useState(null);

    const [ apiHandler, loading, error ] = useApiHandler();

    const getData = async () => {
        const response = await apiHandler({path: '/games'});
        setData(response.data);
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) { return <p>Loading...</p> }
    if (error) { return <p>There was an error loading the data.</p> }
    
    return (
        <>
            <h1>Home Page</h1>
            <p>{data}</p>
        </>
    );
}