const oneAndLefties = (one, p, numbers) => [one, numbers.slice(0, p)]

const findMax = (acc, n) => n > acc ? n : acc

const diffOneAndNumbers = ([one, numbers]) =>
  numbers.filter(n => one > n).map(n => one - n).reduce(findMax, -1)

const maxDiff = numbers =>
  numbers.map(oneAndLefties).map(diffOneAndNumbers).reduce(findMax, -1)

function maxDiffOriginal (arr) {
    // return Array[integer, Array[interger]] number & the list of left wing
    function lefties(num, p, ar) { return [num, ar.slice(0, p)] }

    function findMax(acc, n) { return n > acc ? n : acc }

    // returns Array[integer] diffs
    function diffNumArray([num, ar]) {
        const smallers = ar.filter(function (n) { return num > n })

        // console.log(num, arr, smallers)
        if (smallers.length <= 0) return -1;

        return smallers
            .map(function (n) { return num - n })
            .reduce(findMax, 0)
    }

    const diffs = arr.map(lefties).map(diffNumArray)

    if (diffs.every(function (n) { return n === -1 })) return -1

    return diffs.reduce(findMax, 0)
}
