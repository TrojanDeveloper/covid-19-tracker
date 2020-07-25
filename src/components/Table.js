import React from 'react';
import PropTypes from 'prop-types';
import './table.css'
import { Typography } from '@material-ui/core';
const Table = ({ countries }) => {
    return (
        <div className='table'>
            <Typography variant="h5">
                Live cases by countries
          </Typography>
            <table >
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>{cases}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    countries: PropTypes.array
};

export default Table;