import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css';

function InfoBox({title,value,active,onClick,date}) {
    return (
        <Card onClick={onClick} className={`infobox ${active && 'infobox--selected'}`}>
            <CardContent>
                <Typography color="textSecondary" varient = "overline"className="infobox__title">{title}</Typography>
                <h1 className="infobox_value">{value}</h1>
        <Typography style={{marginTop:10}}color="textSecondary" varient="subtitle2">{date}</Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
