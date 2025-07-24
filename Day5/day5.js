let user = {
    firstname: "John",
    lastname: "Doe",
    age: 30,
};
user.fullname = user.firstname + " " + user.lastname;

class Persone {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    compareAge(otherPerson) {
        if (this.age > otherPerson.age) {
            return `${this.name} is older than ${otherPerson.name}`;
        } else if (this.age < otherPerson.age) {
            return `${this.name} is younger than ${otherPerson.name}`;
        } else {
            return `${this.name} and ${otherPerson.name} are the same age`;
        }
    }
}
p1 = new Persone("John", 30);
p2 = new Persone("Doe", 25);
p3 = new Persone("Lily", 30);

console.log(p1.compareAge(p2)); // "John is older than Doe"
console.log(p2.compareAge(p1)); // "Doe is younger than John"
console.log(p1.compareAge(p3)); // "John and Lily are the same age"

//takes an array of numbers and returns the most occurred number
function mostOccurredNumber(arr) {
    let count = {};
    let maxCount = 0; // To keep track of the maximum count
    let mostOccurred = null; // To store the most occurred number

    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        // If the number is not in the count object, initialize it
        if(count[num] === undefined) {
            count[num] = 1;
        }
        // If the number is already in the count object, increment its count
        else {
            count[num]++;
        }
        // Check if the current number's count is greater than the maxCount
        if (count[num] > maxCount) {
            maxCount = count[num];
            mostOccurred = num;
        }
    }

    return mostOccurred;
}
console.log(mostOccurredNumber([2, 2, 2, 5, 3, 2, 4, 3, 3])); // Output: 2
