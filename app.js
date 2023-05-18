const express = require("express")
const https = require("https")
const app = express();
const bodyParser=require("body-parser");
const { log } = require("console");
app.use(bodyParser.urlencoded({extended: true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

const query=req.body.cityName;
const appid="446911ac7fa80d718a2ead0ab2746670";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+appid
https.get(url,function(response){
    if(response.statusCode!=200){
        res.sendFile(__dirname+"/failure.html")
    }
    else{
        response.on("data",function (data) {
            const weatherdata=JSON.parse(data)
            const temp=weatherdata.main.temp;
            const description=weatherdata.weather[0].description
            const icon=weatherdata.weather[0].icon
            const imageurl="https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather in "+ query +" is "+description+".</p>");
            res.write("<h1>The temprature in "+ query +" is " + temp + " Celcius .</h1>");
            res.write("</br>")
            res.write("<img src="+ imageurl +" >")
            res.send();
        })
    }

})

    
})

app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen("3000", function (req, res) {
    console.log("Server started on port 3000");
})