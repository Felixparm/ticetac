var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

 var userModel = require('../model/users')

 var journeyModel = require('../model/journey')


// --------------------- BDD -----------------------------------------------------
var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

/* GET home page. */

router.get('/login', function(req, res, next) {


  res.render('login', { title: 'Express' });
});



router.get('/', function(req, res, next) {


  res.render('login', { title: 'Express' });
});
router.post('/sign-up',async function (req,res, next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.username,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
    res.redirect('/index')
  } else {
    res.redirect('/')
  }

})

router.post('/sign-in', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if(searchUser!= null){
    req.session.user = {
      name: searchUser.username,
      id: searchUser._id
    }
    res.redirect('/index')
  } else {
    res.redirect('/')
  }

  
})


router.get('/index', function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.post('/voyage', async function(req, res, next) {
  var dataVoyage = await journeyModel.find({departure:req.body.depart, arrival:req.body.arriver, date:new Date(req.body.date)})  
  console.log(dataVoyage);
res.render('voyage',{dataVoyage:dataVoyage});
});

router.get('/panier', function(req, res, next) {
   
  if(req.session.basketVoyage==undefined)
  {
    req.session.basketVoyage=[];
  }
 
  req.session.basketVoyage.push(
    {
      depart: req.query.depart,
      arriver:req.query.arriver,
      date:req.query.date,
      time:req.query.time,
      price:req.query.price

    }
  )
  console.log(req.session.basketVoyage);
  
  res.render('panier', { basketVoyage:req.session.basketVoyage });
  });

  router.get('/trips',function (req,res,next){
  
  
    if(req.session.basketVoyage){
  
  req.session.lasttrip=req.session.basketVoyage[req.session.basketVoyage.length-1];
  console.log('the last trip:'+req.session.lasttrip.depart); }
  else
  {
    req.session.lasttrip=[];
  }
  res.render('trips',{lasttrip:req.session.lasttrip}) 
  })
// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});




module.exports = router;