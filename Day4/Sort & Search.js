// 1. Bubble Sort
function bubbleSort(arr) {
    let array = [...arr]; // copy to avoid mutating input
    let n = array.length; // length of the array
    // Traverse through all array elements
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) { 
            if (array[j] > array[j + 1]) {
                // Swap if the element found is greater than the next element
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

// 2. Selection Sort
// Selects the smallest element from the unsorted part and moves it to the front.
function selectionSort(arr) {
    let array = [...arr];
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}

// 3. Insertion Sort
// Builds the sorted array one element at a time by inserting into the correct position.
function insertionSort(arr) {
    let array = [...arr];
    let n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}

// 4. Linear Search
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return null;
}

// 5. Binary Search (assumes arr is sorted ascending)
function binarySearch(arr, target) {
    let left = 0
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return null;
}

// ------------------- Testing -------------------

const sampleArray = [64, 25, 12, 22, 11];

console.log("Bubble Sort:", bubbleSort(sampleArray));
console.log("Selection Sort:", selectionSort(sampleArray));
console.log("Insertion Sort:", insertionSort(sampleArray));

const sortedArray = insertionSort(sampleArray);

console.log("Linear Search for 22:", linearSearch(sampleArray, 22));
console.log("Linear Search for 100:", linearSearch(sampleArray, 100));

console.log("Binary Search for 22:", binarySearch(sortedArray, 22));
console.log("Binary Search for 100:", binarySearch(sortedArray, 100));
