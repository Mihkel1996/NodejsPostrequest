const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
//send files from public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    // list id cdc0929964
    // api key 26fd4ceab232a9e56c490845f66ed682-us4

    // build up an object of data to be posted to the server

    let data = {
        members: [
            {email_address: email,
            status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    //Prepare data for POST request
    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/cdc0929964",
        method: "POST",
        headers: {
            "Authorization": "whateverString 26fd4ceab232a9e56c490845f66ed682-us4"
        },
        //body: jsonData
    }


    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname+"/failure.html");
        } else {
            if(response.statusCode === 200) {
                console.log(response.statusCode);
                res.sendFile(__dirname + "/success.html");
            } else {
                console.log(response.statusCode);
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

    console.log(firstName, lastName, email);
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})