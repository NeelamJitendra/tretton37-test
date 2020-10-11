var express = require('express');
var router = express.Router();
const request = require('request-promise');

const options ={ 
    url : 'http://api.tretton37.com/ninjas',
    json : true
};

router.get ("/",function(req,res,next){
request (options)
  .then((data) =>{ 
    data.sort((a, b)=>{
      return a.office.toLowerCase().localeCompare( b.office.toLowerCase())
    })
    res.send(data);
  })
	.catch((err) => {
		console.log(err);
	});

})

module.exports = router;