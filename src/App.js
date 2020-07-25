import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent, Typography } from '@material-ui/core'
import InfoBox from './components/InfoBox';
import './App.css';
import Map from './components/Map';
import Table from './components/Table';
import { sortCountryData } from './utils/sort';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css"

function App() {
  const [counties, setCountries] = useState(['not loaded'])
  const [country, setCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState(null)
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746, lng: -40.4796
  })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState()
  const [casesType, setCasesType] = useState('cases')
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data => {

          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          setCountries(countries)
          setMapCountries(data)
          const sortedCountry = sortCountryData(data)
          setTableData(sortedCountry)
        }
        )
        .then(error => console.log(error))
    }

    getCountriesData()
  }, [])

  useEffect(() => {

    const worldwideData = async () => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then(res => res.json())
        .then(data => {
          setCountry('worldwide')
          setCountryInfo(data)
        })
    }
    worldwideData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    const URL = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(URL)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })

  }

  const changeCasesType = (caseType) => setCasesType(caseType)
  return (
    <div className="app">
      <div className="app__left">
        {/* title  - dropdown */}
        <div className="app__header">
          <h3>Covid 19 tracker</h3>
          <FormControl className="app__dropdown">
            <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {counties.map(
                (country, i) =>
                  <MenuItem key={i} value={country.value} >{country.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        {/* infobox  */}
        <div className="app__stats">
          <InfoBox title='Coronavirus cases' cases={countryInfo.todayCases} total={countryInfo.cases} type='cases' changeCasesType={changeCasesType} />
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} type='recovered' changeCasesType={changeCasesType} />
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} type='deaths' changeCasesType={changeCasesType} />
        </div>

        {/* map */}
        <Map caseType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      </div>
      <Card className="app__right">
        <CardContent>
          {tableData && <Table countries={tableData} />}
          <LineGraph caseType={casesType} />
        </CardContent>
      </Card>
    </div>

  );
}

export default App;
