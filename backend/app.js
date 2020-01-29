// Importar
const fileSystem = require('fs');
const process = require('process');
// Librería express
const express = require('express');
// Parcear el body de la llamada
const parser = require('body-parser');
// Función para generar hash
const bcrypt = require('bcrypt');
// Obtener un json web token
const jwt = require('jsonwebtoken');
// Obtiene y compara el header de web token
const jwtHeader = require('express-jwt');
// Pone colors en la consola
const colors = require('colors');
// Peticiones
var mongo = require('mongodb');
// Middleware para temas de cors
var cors = require('cors');

// VARIABLES GLOBALES
// Variable para hacer mix con el username (TOKEN)
let jwtClaveRaw = fileSystem.readFileSync('secrets.json');
let jwtClave = JSON.parse(jwtClaveRaw);
let miClave = jwtClave["jwt_key"];

//Cliente de Mongo
var mongoClient = mongo.MongoClient;

//Crear servidor
var app = express();

//Middleware
app.use(cors());
app.use(parser.json());
// Sirve para marcar la diferencia del frontend en el servidor EC2
//app.use(express.static('../frontend'));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// sistema para indicar si utilizamos o no AUTENTIFICACIÓN
if (process.argv[2] != "dev") {
  app.use(jwtHeader({
    secret: miClave
  }).unless({
    path: ['/newinfluencer', '/loginfluencer', "/logincompany", "/newcompany", "/newpassword"]
  }));
}

// Settings port para Heroku
app.set('port', process.env.PORT || 3000);

///////////////////////////////////////////
// AUTENTIFICACIÓN

var secretRaw = fileSystem.readFileSync('secrets.json');
var secrets = JSON.parse(secretRaw);

// Llamada para crear un nuevo password encriptado que podrá ser ejecutado via Postman
app.post('/newpassword', function(req, res) {
	let hash = bcrypt.hashSync(req.body.newPassword, 10);
	var newDocument = {
		"newPassword": hash
	};
	res.send(newDocument);
});

//Conexión a Mongo
// mongoClient ejecuta la función que engloba todo el código de las llamadas
mongoClient.connect(secrets['atlasUrl'], {
  useNewUrlParser: true
  // Aquí comienza la ejecución de las llamadas una vez realizada la conexión (callback)
}, function(err, mongoConnection) {
  if (err) {
    throw err;
  }
  console.log("Conectado a Mongo");
  var db = mongoConnection.db('primeroinfluyo');
  console.log('Database abierta');

  // Llamada POST para crear un nuevo influencer
  app.post('/newinfluencer', function(req, res) {
    db.collection('Influencers').find({
      // Es una query especial de MongoDB para indicar si existo un valor U otro
      $or: [{userMail:req.body.userMail}, {userInstagram:req.body.userInstagram}]
    }).toArray(function(err, result) {
      console.log(result);
      // Comprobamos si el usuario ya existe en el array que se obtiene con result
      if (result.length >= 1) {
        res.send({
          "message": "el Mail y/o cuenta de Instagram enviado ya existe"
        });
      } else {
        var newRandomID = mongo.ObjectId();
        let hash = bcrypt.hashSync(req.body.userPassword, 10);
        var newDocument = {
          "_id": newRandomID,
          "userName": req.body.userName,
          "userPassword": hash,
          "userMail": req.body.userMail,
          "userInstagram": req.body.userInstagram
        }
        db.collection('Influencers').insertOne(newDocument, function(err, result) {
          if (err) {
            throw err;
          }
          res.send(newDocument);
        });
      }
    })
  });

  // Llamada POST para acceder como influencer
  app.post('/loginfluencer', function(req, res) {
    console.log(`Ha accedido el usuario ${req.body.userInstagram}`.yellow);
    db.collection('Influencers').find({
      "userInstagram": req.body.userInstagram
    }).toArray(function(err, result) {
      console.log(result);

      if (result.length == 0) {
        res.send({
          "wrong": "Wrong user"
        })
      } else {
        let passwordExist = false;
        if (bcrypt.compareSync(req.body.userPassword, result[0]["userPassword"])) {
          passwordExist = true;
        }
        if (passwordExist == true) {
          let token = jwt.sign({
            userInstagram: req.body.userInstagram
          }, miClave);
          res.send({
            "_id": result[0]["_id"],
            "token": token
          });
        } else {
          res.send({
            "wrong": "Wrong password"
          })
        }
      }
    })
  })

  //Llamada GET para visualizar un único influencer
  //let influencerPassDB;
  // EVITAR EL USO DE VARIABLES GLOBALES
  app.get('/influencer/:id', function(req, res) {
    db.collection('Influencers').find({
      "_id": mongo.ObjectId(req.params.id)
    }).toArray(function(err, result) {
      // influencerPassDB lo utilizamos para pasar el pasword si no es modificado en el frontend
      //influencerPassDB = result[0]["userPassword"];
      if (err) {
        throw err;
      }
      res.send(result[0]);
    });
  });

  // Llamada PUT para editar y completar el perfil de los influencers
  app.put('/influencer', function(req, res) {
    db.collection('Influencers').find({
      "userInstagram": req.body.userInstagram
    }).toArray(function(err, result) {
      // Comprobamos si tiene o uno un password para modificarlo
      if (req.body.userPassword != "") {
        let hash = bcrypt.hashSync(req.body.userPassword, 10);
        var newDocument = {
          $set: {
            "userName": req.body.userName,
            "userMail": req.body.userMail,
            "userPassword": hash,
            "userInstagram": req.body.userInstagram,
            "userStreet": req.body.userStreet,
            "userCity": req.body.userCity,
            "userZipcode": req.body.userZipcode,
            "userPhone": req.body.userPhone,
            "userBirthday": req.body.userBirthday,
            "userSex": req.body.userSex,
            "userFashion": req.body.userFashion,
            "userFitness": req.body.userFitness,
            "userFoodie": req.body.userFoodie,
            "userLifestyle": req.body.userLifestyle,
            "userBeauty": req.body.userBeauty
          }
        }
      } else {
        var newDocument = {
          // El $set devuelve solo los datos que envías, pero no modifica ni borra nada
          $set: {
            "userName": req.body.userName,
            "userMail": req.body.userMail,
            "userInstagram": req.body.userInstagram,
            "userStreet": req.body.userStreet,
            "userCity": req.body.userCity,
            "userZipcode": req.body.userZipcode,
            "userPhone": req.body.userPhone,
            "userBirthday": req.body.userBirthday,
            "userSex": req.body.userSex,
            "userFashion": req.body.userFashion,
            "userFitness": req.body.userFitness,
            "userFoodie": req.body.userFoodie,
            "userLifestyle": req.body.userLifestyle,
            "userBeauty": req.body.userBeauty
          }
        }
      }
      console.log(result);
      db.collection('Influencers').updateOne({
        // El id al estar en el body, lo llamamos desde el body
        "_id": mongo.ObjectId(req.body._id)
      }, newDocument, function(err, result) {
        if (err) {
          throw err;
        }
        newDocument["$set"]["_id"] = req.body._id;
        res.send(newDocument["$set"]);
      });
    })
  });

  // Llamada DELETE para borrar a un influencers
  app.delete('/influencer/:id', function(req, res) {
    db.collection('Influencers').deleteOne({
      "_id": mongo.ObjectId(req.params.id)
    }, function(err, result) {
      if (err) {
        throw err;
      }
      res.send({
        'message': "influencer deleted"
      });
    });
  });

  // Llamada POST para crear una nueva empresa
  app.post('/newcompany', function(req, res) {
    console.log(`Se ha registrado la empresa ${req.body.companyName}`.yellow);
    db.collection('companies').find({
      "companyMail": req.body.companyMail
    }).toArray(function(err, result) {
      // Comprobamos si el usuario ya existe en el array que se obtiene con result
      if (result.length >= 1) {
        res.send({
          "message": "El mail enviado ya existe"
        });
      } else {
        var newRandomID = mongo.ObjectId();
        let hash = bcrypt.hashSync(req.body.companyPassword, 10);
        var newDocument = {
          "_id": newRandomID,
          "companyName": req.body.companyName,
          "companyPassword": hash,
          "companyMail": req.body.companyMail,
          "companyInstagram": req.body.companyInstagram,
          "companyStreet": req.body.companyStreet,
          "companyCity": req.body.companyCity,
          "companyZipcode": req.body.companyZipcode,
          "companyPhone": req.body.companyPhone,
          "companyContact": req.body.companyContact,
          "companyFashion": req.body.companyFashion,
          "companyFitness": req.body.companyFitness,
          "companyFoodie": req.body.companyFoodie,
          "companyLifestyle": req.body.companyLifestyle,
          "companyBeauty": req.body.companyBeauty,
          "companyOther": req.body.companyOther
        }
        db.collection('companies').insertOne(newDocument, function(err, result) {
          if (err) {
            throw err;
          }
          res.send(newDocument);
        });
      }
    })
  });

  // Llamada POST para acceder como empresa
  app.post('/logincompany', function(req, res) {
    console.log(`Ha accedido el usuario ${req.body.companyName}`.yellow);
    db.collection('companies').find({
      "companyMail": req.body.companyMail
    }).toArray(function(err, result) {
      console.log(result);

      if (result.length == 0) {
        res.send({
          "wrong": "Wrong user"
        })
      } else {
        let passwordExist = false;
        if (bcrypt.compareSync(req.body.companyPassword, result[0]["companyPassword"])) {
          passwordExist = true;
        }
        if (passwordExist == true) {
          let token = jwt.sign({
            companyMail: req.body.companyMail
          }, miClave);
          res.send({
            "_id": result[0]["_id"],
            "token": token,
            "authCampaign": result[0]["companyMail"]
          });
        } else {
          res.send({
            "wrong": "Wrong password"
          })
        }
      }
    })
  })

  //Llamada GET para visualizar una única empresa
  app.get('/company/:id', function(req, res) {
    db.collection('companies').find({
      "_id": mongo.ObjectId(req.params.id)
    }).toArray(function(err, result) {
console.log(result);
      // influencerPassDB lo utilizamos para pasar el pasword si no es modificado en el frontend
      if (err) {
        throw err;
      }
      res.send(result[0]);
    });
  });

  // Llamada PUT para editar y completar el perfil de los influencers
  app.put('/company', function(req, res) {
    db.collection('companies').find({
      "companyMail": req.body.companyMail
    }).toArray(function(err, result) {
      // Comprobamos si tiene o uno un password para modificarlo
      if (req.body.companyPassword != "") {
        let hash = bcrypt.hashSync(req.body.companyPassword, 10);
        var newDocument = {
          $set: {
            "companyName": req.body.companyName,
            "companyPassword": hash,
            "companyMail": req.body.companyMail,
            "companyInstagram": req.body.companyInstagram,
            "companyStreet": req.body.companyStreet,
            "companyCity": req.body.companyCity,
            "companyZipcode": req.body.companyZipcode,
            "companyPhone": req.body.companyPhone,
            "companyContact": req.body.companyContact,
            "companyFashion": req.body.companyFashion,
            "companyFitness": req.body.companyFitness,
            "companyFoodie": req.body.companyFoodie,
            "companyLifestyle": req.body.companyLifestyle,
            "companyBeauty": req.body.companyBeauty,
            "companyOther": req.body.companyOther
          }
        }
      } else {
        var newDocument = {
          $set: {
            "companyName": req.body.companyName,
            "companyMail": req.body.companyMail,
            "companyInstagram": req.body.companyInstagram,
            "companyStreet": req.body.companyStreet,
            "companyCity": req.body.companyCity,
            "companyZipcode": req.body.companyZipcode,
            "companyPhone": req.body.companyPhone,
            "companyContact": req.body.companyContact,
            "companyFashion": req.body.companyFashion,
            "companyFitness": req.body.companyFitness,
            "companyFoodie": req.body.companyFoodie,
            "companyLifestyle": req.body.companyLifestyle,
            "companyBeauty": req.body.companyBeauty,
            "companyOther": req.body.companyOther
          }
        }
      }
      console.log(result);
      db.collection('companies').updateOne({
        // El id al estar en el body, lo llamamos desde el body
        "_id": mongo.ObjectId(req.body._id)
      }, newDocument, function(err, result) {
        if (err) {
          throw err;
        }
        newDocument["$set"]["_id"] = req.body._id;
        res.send(newDocument["$set"]);
      });
    })
  });

  // Llamada DELETE para borrar a una empresa
  app.delete('/company/:id', function(req, res) {
    db.collection('companies').deleteOne({
      "_id": mongo.ObjectId(req.params.id)
    }, function(err, result) {
      if (err) {
        throw err;
      }
      res.send({
        'message': "Company deleted"
      });
    });
  });

  /////////////////////////////////////
  //REGISTRO CAMPAÑAS Y OFERTAS

  // Llamada POST para crear una nueva campaña de influencers
  app.post('/newcampaign', function(req, res) {
    var newRandomID = mongo.ObjectId();
    var newDocument = {
      "_id": newRandomID,
      "campaignTitle": req.body.campaignTitle,
      "campaignImg": req.body.campaignImg,
      "campaignDes": req.body.campaignDes,
      "campaignStreet": req.body.campaignStreet,
      "campaignCity": req.body.campaignCity,
      "campaignZipcode": req.body.campaignZipcode,
      "campaignUrl": req.body.campaignUrl,
      "campaignDate": req.body.campaignDate,
      "campaignConfig": req.body.campaignConfig,
      "campaignFashion": req.body.campaignFashion,
      "campaignFitness": req.body.campaignFitness,
      "campaignFoodie": req.body.campaignFoodie,
      "campaignLifestyle": req.body.campaignLifestyle,
      "campaignBeauty": req.body.campaignBeauty,
      "campaignActive": req.body.campaignActive,
      "campaignBrand": req.body.campaignBrand
    }
    db.collection('campaigns').insertOne(newDocument, function(err, result) {
      if (err) {
        throw err;
      }
      res.send(newDocument);
    });
  });

  //Llamada GET para visualizar todas las campañas
  app.get('/allcampaigns', function(req, res) {
    db.collection('campaigns').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      // reverse() ayuda a invertir el orden de publicación de las campañas, mostrar la más reciente.
      res.send(result.reverse());
      console.log(result);
    });
  });

  //Llamada GET para visualizar una única campaña
  app.get('/campaign/:id', function(req, res) {
    db.collection('campaigns').find({
      "_id": mongo.ObjectId(req.params.id)
    }).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.send(result[0]);
    });
  });

  // Llamada PUT para editar una campaña especificada por el ID
  app.put('/editcampaign', function(req, res) {
    var newDocument = {
      $set: {
        "campaignTitle": req.body.campaignTitle,
        "campaignImg": req.body.campaignImg,
        "campaignDes": req.body.campaignDes,
        "campaignStreet": req.body.campaignStreet,
        "campaignCity": req.body.campaignCity,
        "campaignZipcode": req.body.campaignZipcode,
        "campaignUrl": req.body.campaignUrl,
        "campaignDate": req.body.campaignDate,
        "campaignConfig": req.body.campaignConfig,
        "campaignFashion": req.body.campaignFashion,
        "campiagnFitness": req.body.campaignFitness,
        "campaignFoodie": req.body.campaignFoodie,
        "campaignLifestyle": req.body.campaignLifestyle,
        "campaignBeauty": req.body.campaignBeauty,
        "campaignActive": req.body.campaignActive
      }
    }
    db.collection('campaigns').updateOne({
      "_id": mongo.ObjectId(req.body._id)
    }, newDocument, function(err, result) {
      if (err) {
        throw err;
      }
      newDocument["$set"]["_id"] = req.body._id;
      res.send(newDocument["$set"]);
    });
  });

  // Llamada DELETE para borrar a una campaña especificada por el ID
  app.delete('/campaign/:id', function(req, res) {
    db.collection('campaigns').deleteOne({
      "_id": mongo.ObjectId(req.params.id)
    }, function(err, result) {
      if (err) {
        throw err;
      }
      res.send({
        'message': "Campaign deleted"
      });
    });
  });

  // Llamada POST para crear una nueva oferta/promo
  app.post('/newoffer', function(req, res) {
    var newRandomID = mongo.ObjectId();
    var newDocument = {
      "_id": newRandomID,
      "offerName": req.body.offerName,
      "offerImg": req.body.offerImg,
      "offerDisc": req.body.offerDisc,
      "offerDes": req.body.offerDes,
      "offerStreet": req.body.offerStreet,
      "offerCity": req.body.offerCity,
      "offerZipcode": req.body.offerZipcode,
      "offerUrl": req.body.offerUrl,
      "offerDate": req.body.offerDate,
      "offerFashion": req.body.offerFashion,
      "offerFitness": req.body.offerFitness,
      "offerFoodie": req.body.offerFoodie,
      "offerLifestyle": req.body.offerLifestyle,
      "offerBeauty": req.body.offerBeauty,
      "offerActive": req.body.offerActive
    }
    db.collection('offers').insertOne(newDocument, function(err, result) {
      if (err) {
        throw err;
      }
      res.send(newDocument);
    });
  });

  //Llamada GET para visualizar todas las ofertas
  app.get('/alloffers', function(req, res) {
    db.collection('offers').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  // Llamada PUT para editar una oferta especificada por el ID
  app.put('/editoffer', function(req, res) {
    var newDocument = {
      $set: {
        "offerName": req.body.offerName,
        "offerImg": req.body.offerImg,
        "offerDisc": req.body.offerDisc,
        "offerDes": req.body.offerDes,
        "offerStreet": req.body.offerStreet,
        "offerCity": req.body.offerCity,
        "offerZipcode": req.body.offerZipcode,
        "offerUrl": req.body.offerUrl,
        "offerDate": req.body.offerDate,
        "offerFashion": req.body.offerFashion,
        "offerFitness": req.body.offerFitness,
        "offerFoodie": req.body.offerFoodie,
        "offerLifestyle": req.body.offerLifestyle,
        "offerBeauty": req.body.offerBeauty,
        "offerActive": req.body.offerActive
      }
    }
    db.collection('offers').updateOne({
      "_id": mongo.ObjectId(req.body._id)
    }, newDocument, function(err, result) {
      if (err) {
        throw err;
      }
      newDocument["$set"]["_id"] = req.body._id;
      res.send(newDocument["$set"]);
    });
  });

  // Llamada DELETE para borrar a una oferta especificada por el ID
  app.delete('/offer/:id', function(req, res) {
    db.collection('offers').deleteOne({
      "_id": mongo.ObjectId(req.params.id)
    }, function(err, result) {
      if (err) {
        throw err;
      }
      res.send({
        'message': "Offer deleted"
      });
    });
  });

  //Pongo el server a escuchar para Heroku
  app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });

  //Pongo el server a escuchar
  /*console.log("Escuchando en puerto 3000!");
  app.listen(3000);*/
  // Cerramos la function de ejecución de llamadas
});