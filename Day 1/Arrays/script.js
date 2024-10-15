const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Sam", last: "Singh", year: 1500, passed: 1947 },
  { first: "Jake", last: "Singh", year: 1500, passed: 1947 },
];

const people = [
  "Beck, Glenn",
  "Becker, Carl",
  "Beckett, Samuel",
  "Beddoes, Mick",
  "Beecher, Henry",
  "Beethoven, Ludwig",
  "Begin, Menachem",
  "Belloc, Hilaire",
  "Bellow, Saul",
  "Benchley, Robert",
  "Benenson, Peter",
  "Ben-Gurion, David",
  "Benjamin, Walter",
  "Benn, Tony",
  "Bennington, Chester",
  "Benson, Leana",
  "Bent, Silas",
  "Bentsen, Lloyd",
  "Berger, Ric",
  "Bergman, Ingmar",
  "Berio, Luciano",
  "Berle, Milton",
  "Berlin, Irving",
  "Berne, Eric",
  "Bernhard, Sandra",
  "Berra, Yogi",
  "Berry, Halle",
  "Berry, Wendell",
  "Bethea, Erin",
  "Bevan, Aneurin",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bierce, Ambrose",
  "Biko, Steve",
  "Billings, Josh",
  "Biondo, Frank",
  "Birrell, Augustine",
  "Black, Elk",
  "Blair, Robert",
  "Blair, Tony",
  "Blake, William",
];

let newArray = inventors.filter((x) => x.year >= 1500 && x.year < 1600); //born in 1500s

newArray = inventors.map((x) => x.first + " " + x.last); // full names

newArray = inventors.sort((x, y) => (x.year > y.year ? -1 : 1)); //sorting based on age

const totalYear = inventors.reduce((total, x) => {
  return (total += x.passed - x.year);
}, 0); //total years invemtors lived

newArray = inventors.sort((x, y) =>
  x.passed - x.year > y.passed - y.year ? -1 : 1
); //sorting based on age

newArray = people.sort((a, b) => {
  let [aFirst, aLast] = a.split(", ");
  let [bFirst, bLast] = b.split(", ");
  return aFirst > bFirst ? 1 : -1;
});

const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
];

let vehicles = data.reduce((obj, item) => {
  if (obj[item]) {
    obj[item]++;
  } else {
    obj[item] = 1;
  }
  return obj;
}, {});

console.table(vehicles);
