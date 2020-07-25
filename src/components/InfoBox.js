import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import './infoBox.css'
import { formatNumber } from '../utils/';

const InfoBox = ({ title, cases, total, changeCasesType, type }) => {
    return (
        <Card className='infoBox' onClick={() => changeCasesType(type)}>
            <CardContent>
                <Typography className='infoBox__title' color='textSecondary'>
                    {title}
                </Typography>
                <h3 className={type === 'recovered' ? `infoBox__cases infoBox__cases-green` : `infoBox__cases`}>
                    {formatNumber(cases)}{' '}<span className='infobox__span'>today</span>
                </h3>
                <Typography className='infoBox__total' color='textSecondary'>
                    {formatNumber(total)}{' '} total
                </Typography>
            </CardContent>
        </Card>
    );
};
InfoBox.propTypes = {
    title: PropTypes.string,
    current: PropTypes.number,
    total: PropTypes.number,
};

export default InfoBox;