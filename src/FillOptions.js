import React, { useState, useEffect } from 'react'

const URL = 'http://api.coinlayer.com/api/live?access_key='
const API_KEY = '3989b4326f8c70270c0cffb35bb39761'



export default function FillOptions() {
    const [currencyOptions, setCurrencyOptions] = useState([])

    useEffect(() => {
        fetch(URL + API_KEY)
        .then(res => res.json())
        .then(data => {
        setCurrencyOptions([...Object.keys(data.rates)])
        })
    }, [])

    return (
        currencyOptions.map(option => {
            return <option key={option} value={option}>{option}</option>
        })
    )
}
