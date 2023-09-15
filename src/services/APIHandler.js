import { useState } from 'react';
import axios from 'axios';

const rawgAPI = axios.create({
    baseURL: 'https://api.rawg.io/api',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    params: { key: '64be55ab7ca3444fa2b80754b9ee90c4' }
});

class DataType {
    constructor(data, path, count, pagesLoaded, nextPage, prevPage) {
        {
            this.path = path;
            this.count = count;
            this.pagesLoaded = pagesLoaded;
            this.nextPage = nextPage;
            this.prevPage = prevPage;
            this.data = [{ ...data }];
        }
    }
}


export function useApiHandler() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function initData({ initPath = '/games' }){
        if ( data ) { return; }
        try {
            setLoading(true);
            const response = await rawgAPI.get(initPath);
            const data = new DataType(
                initPath,
                response.data.results,
                response.data.count,
                1,
                response.data.next,
                response.data.previous
            );
            console.log(response.data.results);
            setData(response.data.results);
            console.log(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };


    async function apiHandler({path, page = 1}){
        try {
            setLoading(true);
            const response = await rawgAPI.get(path);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    function updateData(newData){
        setData(
            {
                data: [...data, newData],
                pagesLoaded: data.pagesLoaded + 1,
                nextPage: data.nextPage,
                prevPage: data.prevPage
            }
        );
    }



    async function getNextPage(){
        try {
            setLoading(true);
            console.log( 'Getting Next page:' + data);
            const response = await rawgAPI.get(data.nextPage)
                .then(response => response.data);
            updateData(response.results);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    }

    return [ initData, getNextPage, data, loading, error];
}