const express = require("express");
const Joi = require("joi"); //used for validation
const app = express();
const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
};
app.use(cors(corsOption));
//if you want in every domain then
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://fatih:1234@crmfield.5h7vc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const personalCollection = client.db("CRMNode").collection("personal");
  const vehicleCollection = client.db("CRMNode").collection("vehicle");

  const books = [
    { title: "Harry Potter", id: 1 },
    { title: "Twilight", id: 2 },
    { title: "Lorien Legacies", id: 3 },
  ];
  //#region !! PERSONAL !!
  app.get("/personal", (req, res) => {
    personalCollection.find({}).toArray(function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    });
  });
  app.get("/personal/get/:id", (req, res) => {
    const personal = personalCollection.findOne({ id: req.params.id });

    if (!personal)
      res
        .status(404)
        .send(
          '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
        );
    res.status(200).send(personal);
  });
  app.post("/personal/create", async (req, res) => {
    const { error } = validatePersonal(req.body);
    debugger;
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const result = personalCollection.insertOne(req.body);
    res.send(result);
  });
  app.delete("/personal/delete/:id", (req, res) => {
    const query = { _id: req.params.id };
    const result = personalCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      res.status(200).send("Successfully deleted one document.");
    } else {
      res
        .status(400)
        .send("No documents matched the query. Deleted 0 documents.");
    }
    res.send(result);
  });

  app.put("/personal/update/:id", (req, res) => {
    const filter = { _id: req.params.id };
    // update the value of the 'z' field to 42
    const updateDocument = {
      //    $set: {
      //       z: 42,
      //    },
      $set: req.body,
    };

    res.send(updatePersonal(filter, updateDocument));
  });

  const updatePersonal = async (filter, updateDocument) => {
    const result = await personalCollection.updateOne(filter, updateDocument);
    return result;
  };
  //#endregion

  //#region !! Vehicle !!

  app.get("/vehicle", (req, res) => {
    vehicle.find({}).toArray(function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    });
  });
  app.get("/vehicle/get/:id", (req, res) => {
    const vehicle = vehicleCollection.findOne({ id: req.params.id });

    if (!vehicle)
      res
        .status(404)
        .send(
          '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
        );
    res.status(200).send(vehicle);
  });
  app.post("/vehicle/create", async (req, res) => {
    const { error } = validateVehicle(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const result = vehicleCollection.insertOne(req.body);
    res.send(result);
  });
  app.delete("/vehicle/delete/:id", (req, res) => {
    const query = { _id: req.params.id };
    const result = vehicleCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      res.status(200).send("Successfully deleted one document.");
    } else {
      res
        .status(400)
        .send("No documents matched the query. Deleted 0 documents.");
    }
    res.send(result);
  });

  app.put("/vehicle/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    // update the value of the 'z' field to 42
    const updateDocument = {
      //    $set: {
      //       z: 42,
      //    },
      $set: req.body,
    };
    const result = await personalCollection.updateOne(filter, updateDocument);
    res.send(result);
  });

  //READ Request Handlers
  app.get("/", (req, res) => {
    res.send("Welcome to Edurekas REST API with Node.js Tutorial!!");
  });

  app.get("/api/books", (req, res) => {
    res.send(books);
  });

  app.get("/api/books/:id", (req, res) => {
    const book = books.find((c) => c.id === parseInt(req.params.id));

    if (!book)
      res
        .status(404)
        .send(
          '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
        );
    res.send(book);
  });

  //CREATE Request Handler
  app.post("/api/books", (req, res) => {
    const { error } = validateBook(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const book = {
      id: books.length + 1,
      title: req.body.title,
    };
    books.push(book);
    res.send(book);
  });

  //UPDATE Request Handler
  app.put("/api/books/:id", (req, res) => {
    const book = books.find((c) => c.id === parseInt(req.params.id));
    if (!book)
      res
        .status(404)
        .send(
          '<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>'
        );

    const { error } = validateBook(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    book.title = req.body.title;
    res.send(book);
  });

  //DELETE Request Handler
  app.delete("/api/books/:id", (req, res) => {
    const book = books.find((c) => c.id === parseInt(req.params.id));
    if (!book)
      res
        .status(404)
        .send(
          '<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>'
        );

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(book);
  });

  function validatePersonal(personal) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      surname: Joi.string().min(3).required(),
      address: Joi.string().min(10).required(),
      //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      postalCode: Joi.number().min(5).required(),
      city: Joi.string().min(3).required(),
      clothSize: Joi.string().min(3).required(),
      shoeSize: Joi.string().min(3).required(),
      education: Joi.array()
        .items(Joi.string())
        .valid(...["Hauptschule", "Realschule", "Abitur", "Uni"]),
      languageCertificate: Joi.string()
        .valid(...["Z1", "Z2", "Z3", "Z4"])
        .required(),
      driverLicense: Joi.array()
        .items(Joi.string())
        .valid(...["Klasse A", "Klasse B", "Klasse C", "Klasse D", "Klasse E"]),
      inventory: Joi.array()
        .items(Joi.string())
        .valid(...["Handy", "Laptop", "Firmenwagen"]),
      vehicleId: Joi.number(),
    });

    return true;
  }
  function validateVehicle(vehicle) {
    const schema = Joi.object({
      price: Joi.number().min(3).required(),
      priceCurrency: Joi.number().min(3).required(),
      inquiryType: Joi.string().min(3).required(),
      timeBegin: Joi.date().required(),
      //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      timeEnd: Joi.date().required(),
      monthlyPrice: Joi.string().min(3).required(),
      lastPay: Joi.string().min(3).required(),
      TUVdate: Joi.date().required(),
      lastInspection: Joi.date().required(),
      nextInspection: Joi.date().required(),
      tires: Joi.string(),
      kilometers: Joi.number(),
    });

    return true;
  }
});
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
