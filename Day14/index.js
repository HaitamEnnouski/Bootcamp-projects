const fs = require("fs").promises;

// Read file and parse JSON
async function readCitiesFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Failed to read or parse file: ${err.message}`);
    }
}

// Select random city object
function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const city = cities[randomIndex];
    console.log(`🌍 Selected city: ${city.name}`);
    return city.name;
}

// Fetch weather from wttr.in
async function fetchWeather(cityName) {
    try {
        const response = await fetch(`https://wttr.in/${cityName}?format=j1`);
        if (!response.ok) throw new Error("Bad response from wttr.in");
        const data = await response.json();
        return data.current_condition[0].temp_C;
    } catch (err) {
        throw new Error(`Failed to fetch weather data: ${err.message}`);
    }
}

// Write temperature to file
async function writeWeatherToFile(cityName, temperature) {
    try {
        const content = `Temperature in ${cityName}: ${temperature}°C`;
        await fs.writeFile(`${cityName}.txt`, content, "utf-8");
        console.log(`✅ Weather data written to ${cityName}.txt`);
    } catch (err) {
        throw new Error(`Failed to write file: ${err.message}`);
    }
}

// Main
async function main() {
    try {
        const cities = await readCitiesFromFile("input.txt");
        const cityName = selectRandomCity(cities);
        const temperature = await fetchWeather(cityName);
        await writeWeatherToFile(cityName, temperature);
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

main();
