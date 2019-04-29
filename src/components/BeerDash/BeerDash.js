import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import useReactRouter from 'use-react-router';
import './BeerDash.scss'
import * as CONSTANTS from '../../constants';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading';
import axios from 'axios';

const BeerDash = () => {

    const [beers, setBeers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [numberOfPages, setNumberOfPages] = useState(1);

    const [pageNumber, setPageNumber] = useState(1);

    const [error, setError] = useState(null);

    const { history } = useReactRouter();

    useEffect(() => {

        const fetchBeers = async () => {

            const url = `${CONSTANTS.SANDBOX_API}/beers?p=${pageNumber}&key=${process.env.REACT_APP_BREWERY_API_KEY}`;

            const response = await axios(url);

            setBeers(response.data.data);

            setIsLoading(false);

            setNumberOfPages(response.data.numberOfPages);
        }

        fetchBeers();

    }, [pageNumber]);

    const paginationClickHandler = (pageDirection) => {

        let newPageNumber = pageDirection.toLowerCase() === CONSTANTS.NEXT_PAGE ? pageNumber + 1 : pageNumber - 1;

        setPageNumber(newPageNumber);

    }

    if (isLoading) {
        return <div className="loading-container"><Loading /></div>
    } else if (error) {
        return <div className="error">{error}</div>
    } else {
        return (
            <section className="beer-dash">
                <div className="beer-dash-top">
                    <Header />
                    <ul className="column-names">
                        <li className="beer-number">#</li>
                        <li className="beer-name">Name</li>
                        <li className="beer-abv">ABV</li>
                        <li className="beer-style">Style</li>
                        <li className="non-mobile">Created Date</li>
                    </ul>
                </div>
                <div className="table-wrapper">
                    <table className="table">
                        <tbody className="Table-body">
                            {
                                beers.length > 0 && beers[0] && beers.map((beer, idx) => (
                                    <tr
                                        key={beer.id}
                                        onClick={() => history.push(`/beers/${beer.id}`)}
                                    >
                                        <td className="">
                                            <span className="Table-rank">{(idx + 1) + (50 * (pageNumber - 1))}</span>
                                        </td>
                                        <td className="">
                                            {beer.nameDisplay}
                                        </td>
                                        <td className="center">
                                            {beer.abv ? beer.abv : 'N/A'}
                                        </td>
                                        <td className="beer-style">
                                            {beer.style ? beer.style.name : 'N/A'}
                                        </td>
                                        {
                                            <td className="non-mobile">
                                                {beer.style ? beer.style.createDate : 'N/A'}
                                            </td>
                                        }
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
                {
                    pageNumber && <Pagination
                        pageNumber={pageNumber}
                        numberOfPages={numberOfPages}
                        paginationClickHandler={paginationClickHandler}
                    />
                }
            </section>
        );
    }

}

export default BeerDash;
