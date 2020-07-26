//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

// create new database inside mongoDB
mongoose.connect("mongodb+srv://admin-sejal:Test123@cluster0.2d5sr.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true} );
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true} );

const itemsSchema = {
  name : String
};

const Item = mongoose.model("Item", itemsSchema);   // First letter Always capitalised,mongoose will change to lowercase and plural

const item1 = new Item ({
  name : "Welcome to your todolist"
});

const item2 = new Item ({
  name : "Add something to your list"
});

const item3 = new Item ({
  name : "To add click on +"
});

const defaultItems = [item1, item2, item3]

const listSchema = {
  name : String,
  items : [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
  // to avoid printing the same data to the database when you execute it
    if (foundItems.length === 0 ){
      Item.insertMany(defaultItems, function(err){
       if (err){
         console.log(err);
       }else{
         console.log("success");
       }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
    });
  });

  //express or dynamic route parameter

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err){
      if (!foundList){
        //create a new list
        const list = new List({
          name : customListName,
          items : defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }else{
      // show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
  }
  });
    // res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/", function(req, res){

  const itemName = req.body.newItem; // newItem and that will refer to the text that the user entered into the input when they clicked on the
  const listName = req.body.list;
//plus button to add that newItem .we are trying to grab what user is trying to post

  const item = new Item ({
    name : itemName
  });

  if (listName === "Today"){
    item.save(); // newly add item getting saved in DB
    res.redirect("/");  //shows on the page the item we are adding, goes back to home route
  }else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName==="Today"){
    Item.findByIdAndRemove(checkedItemId, function (err) { //if no callback it wont execute the delete, it will only provide find part
      if(!err){
        console.log("successfully deleted");
        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    })
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(3000, function() {
  console.log("Server ha started successfully");
});
