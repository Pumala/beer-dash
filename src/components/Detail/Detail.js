import React, { useState, useEffect } from 'react';
import './Detail.scss';
import * as CONSTANTS from '../../constants';
import Loading from '../Loading/Loading';
import Header from '../Header/Header';
import axios from 'axios';

const Detail = ({ match : { params : { beerId } }}) => {

    const [beer, setBeer] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchBeerDetail = async () => {

            const url = `${CONSTANTS.SANDBOX_API}/beers?ids=${beerId}&key=${process.env.REACT_APP_BREWERY_API_KEY}`;

            try {

                const res = await axios(url);
                setBeer(res.data.data[0]);
                setIsLoading(false);

            } catch (error) {
                setError(error.errorMessage);
                setIsLoading(false);
            }

        }
        fetchBeerDetail();
    }, [beerId])

    if (isLoading) {
        return (
            <div className="loading-container">
                <Loading />
            </div>
        )
    }
    if (error) {
        return (
            <div className="error">
                {error}
            </div>
        )
    }
    if (!isLoading) {
        return (
            <section className="Detail">
                <Header
                    className="header"
                />
                <div className="Detail-wrapper">
                    <div>
                        <h1 className="Detail-heading">
                            {beer.name}
                        </h1>
                        <div className="Detail-content">
                            <div className="Detail-item">
                                <h4 className="Detail-title">ABV</h4>
                                <span className="Detail-value">{beer.abv ? beer.abv : 'N/A'}</span>
                            </div>
                            <div className="Detail-item">
                                <h4 className="Detail-title">Style</h4>
                                <span className="Detail-value">{beer.style ? beer.style.name : 'N/A'}</span>
                            </div>
                            <div className="Detail-item">
                                <h4 className="Detail-title">Created Date</h4>
                                <span className="Detail-value">{beer.style ? beer.style.createDate : 'N/A'}</span>
                            </div>
                            <div className="Detail-item">
                                <h4 className="Detail-title">Description</h4>
                                <span className="Detail-value">{beer.style ? beer.style.description : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Detail;