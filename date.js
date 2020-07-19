exports.getDate =       //getDate; // no () bcz we are not calling the function here
 function() {   // using anonymous function

  let today = new Date();

  let options ={
    weekday : "long",
    day : "numeric",
    month: "long"
  }

  return today.toLocaleDateString("en-US", options);

}

exports.getDay = function(){ // modume.exports = exportss

  let today = new Date();

  let options ={
    weekday : "long"
  }

  return today.toLocaleDateString("en-US", options);

}
