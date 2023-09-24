const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
const ejs = require("ejs");
app.set("view engine","ejs");
const request = require("request");
app.use(express.static("public"));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});
const api_key = "27c87b210e0b94def67285cd7b9cb382";
app.post("/search",function(req,res)
{
    var location = req.body.loc;
    console.log(location);
    var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${api_key}`;
    request({url:URL},function(error,response)
    {
        if(error)
        {
            res.send("Incorrect URL");
        }
        else{
            var info = JSON.parse(response.body);
            console.log(info);
            var cod = info.cod;
            if(cod=="404")
            {
                res.send("city not found");
            }
            else{
            var temp = info.list[0].main.temp + "°C";
            // var maxtemp = info.list[0].main.temp_max + "°C";
            // var mintemp = info.list[0].main.temp_min + "°C";
            var feels = info.list[0].main.feels_like + "°C";
            var weathertp = info.list[0].weather[0].main;
            var humidity = info.list[0].main.humidity + "%";
            var description = info.list[0].weather[0].description;
            
            // var mintemp1 = info.list[6].main.temp_min + "°C";
            // var maxtemp1 = info.list[6].main.temp_max + "°C";
            var temp1 = info.list[8].main.temp+"°C";
            var humidity1 = info.list[8].main.humidity + "%";
            var weathertp1 = info.list[8].weather[0].main;
            
            var temp2 = info.list[16].main.temp+"°C";
            var humidity2 = info.list[16].main.humidity + "%";
            var weathertp2 = info.list[16].weather[0].main;

            res.render("data.ejs", {place:location,currtemp:temp, feels:feels, humidity:humidity, weathertype:weathertp, description:description, currtemp1:temp1, humidity1:humidity1, weathertype1:weathertp1, currtemp2:temp2, humidity2:humidity2, weathertype2:weathertp2})
            }
            
        }
    });
});

app.listen(process.env.PORT||3000);