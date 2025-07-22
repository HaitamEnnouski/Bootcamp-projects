function factorial(n) {
    let f = 1;
    for (i = 1; i <= n; i++) {
        f *= i;
    }
    return f;
}

function nDigits(number) {
    let count = 0;

    if (number === 0) {
        count = 1;
    } else {
        while (number >= 1) {
        number = number / 10;
        count++;
        }
    }
    return count;
}

function numberToDay(number) {
    switch (number) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
        default:
            return "Invalid day number";
    }
}

function maxOfThree(a, b, c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}
function myGrade(score) {
    switch (true) {
        case score > 85:
        return "A";
        case score <= 85 && score > 70:
        return "B";
        case score <= 70 && score > 55:
        return "C";
        case score <= 55 && score > 40:
        return "D";
        case score <= 40 && score > 15:
        return "E";
        case score <= 15:
        return "D";
        default:
        return "Invalid score";
    }
}
function combinator(n, p) {
  return factorial(n) / (factorial(p) * factorial(n - p));
}
function calculator(a, s, b) {
    switch (s) {
        case "+":
        return a + b;
        case "-":
        return a - b;
        case "*":
        return a * b;
        case "/":
        return b !== 0 ? a / b : "Error: Division by zero";
        case "%":
        return a % b;
        case "c":
        return combinator(a, b);
        default:
        return "Error: Invalid operation";
    }
}
