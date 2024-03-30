import { useState, useEffect } from 'react';
import Search from '../search';

const Weather = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=5589d1b3758ae9a36a798611b202aba6`);
            const data = await response.json();
            setLoading(false);
            console.log(data)
            if (data) {
                if (data.cod === "404") {

                    alert("city not exist")
                }
                else {

                    setWeatherData(data);

                }

            }

        }
        catch (error) {
            setLoading(false);
        }
    }
    console.log(loading)
    function handleSearch() {
        fetchWeatherData(search);
    }

    useEffect(() => {
        fetchWeatherData('Lahore');
    }, []);

    console.log(weatherData);

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    return (
        <>
            <div>
                <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
                {loading ?
                    <div>Loading...</div>
                    :
                    <>
                        <div className='city-name'>
                            <h2>
                                {weatherData?.name},
                                <span>{weatherData?.sys?.country}</span>
                            </h2>
                        </div>
                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className='temp'>
                            <div>
                                {weatherData?.main?.temp}
                            </div>
                        </div>
                        <p className='description'>
                            {
                                weatherData && weatherData.weather && weatherData.weather[0]
                                    ? weatherData?.weather[0].description
                                    : ''

                            }

                        </p>
                        <div className='weather-info'>
                            <div className='column'>
                                <div>
                                    <p className='wind'>{weatherData?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                            <div className='column'>
                                <div>

                                    <p className='humidity'>{weatherData?.main?.humidity}</p>
                                    <p>humidity</p>
                                </div>
                            </div>

                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default Weather;
