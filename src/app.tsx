import axios from 'axios'
import { CloudRain } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WeatherData } from './app/models/weatherModel'

interface WeatherProps {
  data?: WeatherData | null
  loading: boolean
  error: boolean
}

export function App() {
  const [weather, setWeather] = useState<WeatherProps>({
    loading: false,
    error: false,
  })

  const currentDate = new Date()
  const currentDateFormat = `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(currentDate.getDate())} ${pad(currentDate.getHours())}:${pad(currentDate.getMinutes())}`

  function pad(n: any) {
    return n < 10 ? '0' + n : n
  }

  useEffect(() => {
    const handleWeather = async () => {
      setWeather({ ...weather, loading: true })

      const url = 'http://api.weatherapi.com/v1/forecast.json'
      const apiKey = 'e2ac9e6881a945e3aa9191050240507 '

      try {
        const res = await axios.get(url, {
          params: {
            q: 'São Paulo',
            days: 7,
            lang: 'pt',
            key: apiKey,
          },
        })

        console.log('res', res)
        setWeather({ data: res.data, loading: false, error: false })
      } catch (err) {
        console.log('error', err)
        setWeather({ data: null, loading: false, error: false })
      }
    }

    handleWeather()
  }, [])

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-between p-4 text-center">
      <h1 className="text-2xl leading-relaxed tracking-tight">
        {weather.data?.location.region}
      </h1>

      <section className="flex flex-1 flex-col items-center justify-center gap-12">
        <div className="h-24 w-24 rounded-3xl shadow-cold">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-bl from-cyan-500 to-blue-500 shadow-box">
            <h3 className="indent-2 text-4xl font-semibold leading-snug tracking-wider">
              {Math.round(weather.data?.current.temp_c ?? 0)}
              <sup>o</sup>
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 text-base leading-relaxed tracking-wide">
          <h4 className="capitalize">{weather.data?.current.condition.text}</h4>

          <div className="flex items-center justify-center gap-4">
            <p>
              Min:{' '}
              {Math.round(
                weather.data?.forecast.forecastday[0].day.mintemp_c ?? 0,
              )}
              <sup>o</sup>
            </p>

            <p>
              Max:{' '}
              {Math.round(
                weather.data?.forecast.forecastday[0].day.maxtemp_c ?? 0,
              )}
              <sup>o</sup>
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-start gap-2">
        <div className="grid w-full grid-cols-6 items-center gap-4 border-y-2 border-gray-700 py-6">
          {weather.data?.forecast.forecastday[0].hour
            .filter((h) => currentDateFormat <= h.time)
            .slice(0, 6)
            .map((hour, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 text-sm leading-snug tracking-wider"
              >
                <p>{hour.time.split(' ')[1]}</p>
                <CloudRain size={16} />
                <p>
                  {Math.round(hour.temp_c)}
                  <sup>o</sup>
                </p>
              </div>
            ))}
        </div>

        <div className="w-full">
          <ul className="flex w-full flex-col items-start justify-start">
            {weather.data?.forecast.forecastday.slice(0, 5).map((day, i) => (
              <li
                key={i}
                className="flex w-full items-center justify-between py-4 text-sm leading-snug tracking-wider"
              >
                <span className="inline-block min-w-28">{day.date}</span>

                <span className="flex flex-1 items-center justify-center">
                  {/* <CloudRain size={16} /> */}
                  <img
                    src={day.day.condition.icon}
                    className="h-6 w-6 object-contain"
                    alt=""
                  />
                </span>

                <div className="inline-flex items-center justify-end gap-8">
                  <span>
                    {Math.round(day.day.maxtemp_c)}
                    <sup>o</sup>
                  </span>

                  <span className="text-gray-400">
                    {Math.round(day.day.mintemp_c)}
                    <sup>o</sup>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
