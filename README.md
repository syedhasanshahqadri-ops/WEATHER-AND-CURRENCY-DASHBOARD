# SkyRate

A responsive weather, namaz times and currency app that you can install on your phone or computer. Built with plain HTML, CSS and JavaScript. No frameworks, no build tools and no API keys needed.

## Features

- **Weather screen:** search any city (it suggests matches as you type) or use your current location
  - Current temperature, condition, high and low, and feels-like temperature
  - Today's details: humidity, wind, pressure, UV index, rain chance, sunrise and sunset
  - Next 24 hours with a small temperature bar for each hour
  - 7-day forecast with a temperature range bar
  - Background color that changes with the weather
  - °C and °F switch and recent cities
- **Namaz screen:** search any city and see today's prayer times
  - Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha, with Gregorian and Hijri dates
  - Next prayer highlighted with a live countdown (it also knows tomorrow's Fajr)
  - Calculation method and Asr time (Hanafi or Standard) settings
  - **Alarms:** a bell button on every prayer turns its alarm on or off, and **Alarm for all** switches all five at once
  - **Qibla compass:** shows the Qibla bearing for the selected city, and a live compass on phones with a sensor
- **Currency screen:** converter for 150+ currencies, quick amounts and popular rate cards
- **Install as an app:** an Install app button in the top bar and a dismissible banner
- **Offline support:** the app opens offline and shows your last saved weather, prayer times and rates
- **Dark and light theme:** follows your device setting and remembers your choice
- **Fully responsive:** top tabs on desktop, bottom navigation bar on phones

## Namaz alarms

1. Open the **Namaz** screen.
2. Tap the bell on a prayer to switch its alarm on (tap again to switch it off), or press **Alarm for all**.
3. Allow notifications when the browser asks. Tap anywhere on the page once so the browser allows the alarm sound.
4. Press **Test alarm** to check the sound and the ringing screen.

When a prayer time arrives, the alarm rings with a bell sound and vibration (on phones), and a full screen shows which prayer it is, for example **Fajr**, with its time and city. Press **Stop alarm**, or **Snooze 5 min** to be reminded again. The alarm stops by itself after 2 minutes.

Alarms follow the city selected on the Namaz screen, and your choices are remembered on your device.

**Important:** a web app can only ring while it is running. Keep SkyRate open (the installed app or a browser tab) and keep your volume on. If the phone is locked or the app is closed by the system, the alarm may not ring.

## Project structure

```
skyrate/
├── index.html
├── style.css
├── script.js
├── sw.js
├── manifest.webmanifest
├── README.md
└── icons/
    ├── favicon.png
    ├── apple-touch-icon.png
    ├── icon-192.png
    ├── icon-512.png
    └── icon-maskable-512.png
```

## Run locally

1. Unzip the project.
2. Open `index.html` in a browser with an internet connection.

Weather, prayer times and currency data load, but the app can't be installed from a local file. Installing needs a website address (https).

## Deploy on GitHub Pages and install the app

1. Create a new repository, for example `skyrate`.
2. Upload all the files, keeping the `icons` folder.
3. Go to **Settings → Pages**.
4. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
5. Open `https://syedhasanshahqadri-ops.github.io/skyrate/`.
6. Press **Install app**.

## How to install

- **Chrome or Edge (Android, Windows, Mac):** press the **Install app** button, then confirm.
- **iPhone or iPad (Safari):** tap **Share**, then **Add to Home Screen**, then **Add**.
- If no prompt appears, open the browser menu and choose **Install SkyRate** or **Add to Home screen**.

## Data sources

- Weather and city search: [Open-Meteo](https://open-meteo.com/)
- Prayer times: [Aladhan](https://aladhan.com/prayer-times-api)
- Exchange rates: [ExchangeRate-API](https://www.exchangerate-api.com)

All are free to use without a key. The weather refreshes every 10 minutes and the rates every 30 minutes. Prayer times are calculated and can differ by a few minutes from your local mosque, so follow your mosque's timetable if it is different.

## Customize

- **Default city:** change the `city` object (Weather) or `ncity` object (Namaz) in `script.js`.
- **Default currency pair:** change `pair` in the currency section in `script.js`.
- **Popular rates list:** edit the `POP` array in `script.js`.
- **Alarm sound:** the chime is made in the `makeWav` function in `script.js`. Change the `notes` list to change the tune.
- **Snooze length:** change `300000` (5 minutes, in milliseconds) in the `snooze` function in `script.js`.
- **Colors and fonts:** change the variables at the top of `style.css`.
- **App name, colors and icons:** edit `manifest.webmanifest` and replace the files in `icons/`.
- **After updating the files on GitHub:** change `V='skyrate-v3'` in `sw.js` to a new name, such as `skyrate-v4`. Installed apps then update themselves.

## Tech

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript
- Progressive Web App: web manifest and service worker
- Google Fonts: Sora and DM Sans

## Author

Syed Hasan Shah, Full Stack Web Developer · Graphic Designer · Video Editor
