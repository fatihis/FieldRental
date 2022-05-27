const hey = {
  name: "Hans",
  surname: "Tiedelmann",
  address: "Frankfurter Strasse 21, ",
  //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  postalCode: 63263,
  city: "Neu-Isenburg",
  clothSize: "XL",
  shoeSize: "42",
  education: ["Hauptschule", "Realschule", "Abitur", "Uni"],
  languageCertificate: ["Z1", "Z2", "Z3", "Z4"],
  driverLisence: ["Klasse A", "Klasse B", "Klasse C", "Klasse D", "Klasse E"],
  inventory: ["Handy", "Laptop", "Firmenwagen"],
  vehicleId: 0,
};

/*
- dont show cate (lets say cate is the current user… check that with name only since we dont have actual accounts)
- show only active unicorns
- dont show black unicorns
- show the favorite fruit of the unicorns
- if a unicorn’s name is doge, add following to that unicorn:
  muchWow: true,
  suchFat: true,
  lovesCate: false
- Sort the results by age, oldest unicorn first
- Console log the final result. No need to print anything.
*/

const unicorns = [
  {
    name: "bob",
    age: "30",
    color: "red",
    favoriteFruitId: 1,
    active: true,
  },
  {
    name: "john",
    age: "20",
    color: "blue",
    favoriteFruitId: 2,
    active: false,
  },
  {
    name: "jane",
    age: "25",
    color: "black",
    favoriteFruitId: 1,
    active: true,
  },
  {
    name: "doge",
    age: "21",
    color: "yellow",
    active: true,
  },
  {
    name: "cate",
    age: "33",
    color: "white",
    favoriteFruitId: 1,
    active: true,
  },
];

const fruits = [
  {
    id: 1,
    name: "apple",
  },
  {
    id: 2,
    name: "watermelon",
  },
];
const activeUser = "cate";
const desiredUnicorns = unicorns
  .filter((unicorn) => {
    if (unicorn.name === "doge") {
      Object.assign(unicorn, {
        muchWow: true,
        suchFat: false,
        lovesCate: false,
      });
    }

    if (unicorn.hasOwnProperty("favoriteFruitId")) {
      Object.assign(unicorn, {
        favoriteFruit: fruits.find(({ id }) => id === unicorn.favoriteFruitId)
          .name,
      });
    }

    return (
      unicorn.active === true &&
      unicorn.color !== "black" &&
      unicorn.name !== activeUser
    );
  })
  .sort((a, b) => {
    return b.age - a.age;
  });

console.log(desiredUnicorns);
