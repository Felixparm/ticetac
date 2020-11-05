var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}


mongoose.connect('mongodb+srv://felixparmentier:felixparmentier@cluster0.2qce4.mongodb.net/ticetac?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);


module.exports = mongoose;

