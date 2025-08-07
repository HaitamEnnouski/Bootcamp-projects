const fs = require("fs").promises;
const http = require("http");

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


// Main
async function main() {
    try {
        const cities = await readCitiesFromFile("input.txt"); // read cities from input.txt
        const cityName = selectRandomCity(cities); // select a random city
        const temperature = await fetchWeather(cityName);// fetch the weather for the selected city
        // Create HTTP server
        const server = http.createServer((req, res) => {
            if (req.url === '/weather') {
                res.statusCode = 200; // respond with 200 "OK"
                res.setHeader('Content-Type', 'text/plain'); // set content type to plain text
                res.end(`Temperature in ${cityName} is ${temperature}°C\n`); // send the temperature as response
            } else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        });
        const port = 3000;
        // Start server
        server.listen(port, () => {
            console.log(`✅ Server running at http://localhost:${port}/weather`);
        });
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

main();
