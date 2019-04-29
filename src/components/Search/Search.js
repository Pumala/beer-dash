import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as CONSTANTS from '../../constants';
import Loading from '../Loading/Loading';
import useReactRouter from 'use-react-router';
import './Search.scss';
import axios from 'axios';

const Search = () => {

    const { history } = useReactRouter();

    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {

        const fetchQueryParamResults = async () => {
            
            setIsLoading(true);
    
            const url = `${CONSTANTS.SANDBOX_API}/search?q=${searchQuery}&key=${process.env.REACT_APP_BREWERY_API_KEY}`;

            try {
                const res = await axios(url);
    
                setSearchResults(res.data && res.data.data ? res.data.data : []);

                setIsLoading(false);
    
            } catch (err) {

                setError(err);

                setIsLoading(false);
            }
    
        };

        fetchQueryParamResults();

    }, [searchQuery])

    const handleRedirect = beerId => {

        setSearchQuery('');

        setSearchResults([]);

        history.push(`/beers/${beerId}`);

    }

    const onChangeHandler = (e) => {

        e.persist();
        e.preventDefault();
        
        const theSearchQuery = e.target.value;

        if (!theSearchQuery) {

            setSearchQuery(theSearchQuery);
            
            setSearchResults([]);

            return '';
        };

        setSearchQuery(theSearchQuery);
    }

    const renderSearchResults = () => {

        if (!searchQuery) {
            return (
                ''
            )
        }

        if (searchResults.length > 0) {
            return (
                
                <div className="Search-result-container">
                    {
                        searchResults.map(result => (
                            <div 
                                key={result.id}
                                className="Search-result"
                                onClick={() => handleRedirect(result.id)}
                            >
                                {result.name}
                            </div>
                        ))
                    }
                </div>
            );
        }

        if (!isLoading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            );
        }
    }

    return (
        <form className="Search">
            <span className="Search-icon"></span>
            <input 
                className="Search-input" 
                type="text" placeholder="Beer Name" 
                onChange={(e) => onChangeHandler(e)}
                value={searchQuery}
            />
            {
                isLoading && 
                    <div className="Search-loading">
                        <Loading width={'12px'} height={'12px'}  />
                    </div>
                }
            {
                renderSearchResults()
            }
        </form>
    )
};

export default withRouter(Search);