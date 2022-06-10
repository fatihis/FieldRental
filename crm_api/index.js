const express = require("express");
const Joi = require("joi"); //used for validation
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
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

  app.get("/personal/count", (req, res) => {
    const result = personalCollection.countDocuments({});
    result.then((e) => {
      console.log(e);
      if (!e) {
        res.status(404).send("err");
      } else {
        res.write(e.toString());
        res.status(200);
        res.end();
      }
    });
  });

  app.get("/personal/get/:id", (req, res) => {
    personalCollection
      .findOne({
        _id: new ObjectId(req.params["id"]),
      })
      .then((personal) => {
        if (!personal)
          res
            .status(404)
            .send(
              '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
            );
        res.status(200).send(personal);
      });
  });
  app.post("/personal/create", async (req, res) => {
    const { error } = validatePersonal(req.body);
    debugger;
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const result = personalCollection.insertOne(req.body);
    if (req.body.inventory.includes("Firmenwagen")) {
      console.log(req.body.vehicleId, "vehicID");

      const filter = { _id: new ObjectId(req.body.vehicleId) };
      // update the value of the 'z' field to 42
      const updateDocumentOne = {
        $set: { isAssigned: true },
      };
      const updateDocumentTwo = {
        $set: { assignedPersonalId: new ObjectId(result._id) },
      };
      await vehicleCollection.updateOne(filter, updateDocumentOne);
      await vehicleCollection.updateOne(filter, updateDocumentTwo);
    }
    res.send(result);
  });
  app.delete("/personal/delete/:id", (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const result = personalCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      res.status(200).send("Successfully deleted one document.");
    } else {
      res
        .status(400)
        .send("No documents matched the query. Deleted 0 documents.");
    }
  });

  app.put("/personal/update/:id", (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    // update the value of the 'z' field to 42
    req.body.forEach((element) => {
      const updateDocument = {
        $set: element,
      };
      if (element.hasOwnProperty("vehicleId")) {
        const filter = { _id: new ObjectId(element.vehicleId) };
        // update the value of the 'z' field to 42
        const updateDocumentOne = {
          $set: { isAssigned: true },
        };
        const updateDocumentTwo = {
          $set: { assignedPersonalId: new ObjectId(req.params.id) },
        };
        vehicleCollection.updateOne(filter, updateDocumentOne);
        vehicleCollection.updateOne(filter, updateDocumentTwo);
      }
      personalCollection
        .updateOne(filter, updateDocument)
        .then((a) => {})
        .catch((e) => res.send(e));
    });

    res.send("Success");
  });

  const updatePersonal = async (filter, updateDocument) => {
    const result = await personalCollection.updateOne(filter, updateDocument);
    return result;
  };
  //#endregion

  //#region !! Vehicle !!

  app.get("/vehicle", (req, res) => {
    vehicleCollection.find({}).toArray(function (err, result) {
      console.log("as", result);

      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    });
  });
  app.get("/vehicle/get/:id", (req, res) => {
    vehicleCollection
      .findOne({
        _id: new ObjectId(req.params["id"]),
      })
      .then((vehicle) => {
        if (!vehicle)
          res
            .status(404)
            .send(
              '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
            );
        res.status(200).send(vehicle);
      });
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
    const query = { _id: new ObjectId(req.params.id) };
    const result = vehicleCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      res.status(200).send("Successfully deleted one document.");
    } else {
      res
        .status(400)
        .send("No documents matched the query. Deleted 0 documents.");
    }
  });

  app.put("/vehicle/update/:id", async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    // update the value of the 'z' field to 42
    req.body.forEach((element) => {
      const updateDocument = {
        $set: element,
      };

      vehicleCollection
        .updateOne(filter, updateDocument)
        .then((a) => console.log(a))
        .catch((e) => res.send(e));
    });
  });
  app.get("/vehicle/count", (req, res) => {
    const result = vehicleCollection.countDocuments({});
    result.then((e) => {
      if (!e) {
        res.status(404).send("err");
      } else {
        res.write(e.toString());
        res.status(200);
        res.end();
      }
    });
  });
  app.get("/vehicle/nonactivecount", (req, res) => {
    const result = vehicleCollection.countDocuments({ isAssigned: false });
    result.then((e) => {
      if (!e) {
        res.status(404).send("err");
      } else {
        res.write(e.toString());
        res.status(200);
        res.end();
      }
    });
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
