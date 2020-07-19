const express =  require('express');
const bodyParser = require("body-parser");
const date =  require(__dirname + "/date.js")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items = ["Buy groceries", "Clean the fridge", "Finish the leftovers"];
let workItems = [];
app.get("/", function (req, res) {

  let day = date.getDay();
  res.render("list",{
    listTitle: day, newItem: items
  });// render a file called list and pass that file a value of kindOfDay and the value is going to equal to whatever is the value of our current letiable which is day.

  });

app.post("/", function(req, res) {
  let item = req.body.addItems;

  if(req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

  });

app.get("/work", function(req,res) {
  res.render("list", { listTitle: "Work List" , newItem: workItems});
});

app.post("/work", function(req, res) {
  let item = req.body.addItems;
  workItem.push(item);
  res.redirect("/work");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is up");
  });

  // var currentDay = today.getDay();
  // var day = "";
//to print all the days, if you have more than 5 statements use switch case
// switch (currentDay) {
//   case 0:
//     day = "Sunday";
//     break;
//     case 1:
//       day = "Monday";
//       break;
//     case 2:
//       day = "Tuesday";
//       break;
//     case 3:
//       day = "Wednesday";
//       break;
//     case 4:
//       day = "Thursday";
//       break;
//     case 5:
//       day = "Friday";
//       break;
//     case 6:
//       day = "Saturday";
//       break;
//
//     default:
//     console.log("Error: current day is " + currentDay);
// }



  // if(currentDay===6 || currentDay===0){
  //   day = "Weekend";
  // } else{
  //   day = "Weekday";
  // }

  // <% if (kindOfDay === "Saturday" || kindOfDay === "Sunday") {%>
  //   <!-- <h1 style = "color:purple"> <%= kindOfDay %> ToDo List</h1> -->
  // <%} else {%>
  //   <!-- <h1 style = "color:blue"> <%= kindOfDay %> ToDo List</h1> -->
  // <%}%>
