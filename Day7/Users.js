async function fetchUserData() {
    try{
        const data = await fetch("https://dummyjson.com/users"); // Fetch user data from the API
        const result = await data.json(); // Parse the JSON response
        return result.users;

    }
    catch(err){
        console.error("Error fetching user data: ", err);
    }
}

const users = fetchUserData();

const processUserData = (users) => {
    let filterdUsers = users.filter(user => user.gender !== "male"); 
    const formattedUsers = filterdUsers.map(({ firstName, lastName, age }) => 
        `Name: ${firstName} ${lastName}, Age: ${age}`
    );
    return formattedUsers;
}

function summarizeAge (users){
    let filterdUsers = users.filter(user => user.gender === "male"); 
    let totalAge = filterdUsers.reduce((sum, user) => sum + user.age, 0);
    return totalAge;
}

async function main () {
    const users = await fetchUserData();
    const processedUsers = processUserData(users);
    console.log("Processed Users: ", processedUsers);
    const total =summarizeAge(users);
    console.log("Total Age of Male Active Users: ", total);
}


main();