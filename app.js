const express=require('express');
const bodyParser = require('body-parser');
const https=require('https');
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
    const city=req.body.City;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=e6a35037dfb3907e67001c25e6cb750f&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);
 
        response.on("data",function(data){
         const weatherData = JSON.parse(data);//here data is in hexadecimal and JSON.parse(data) convert data into JSON format and to print it in string format could be done using JSON.stringify(object) where object is any javascript object
         const temp = weatherData.main.temp;
         const weatherDiscription = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon
         const imgUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
         // res.write("<h3>Today's weather discription is "+weatherDiscription+"</h3>");// we can use multiple res.write()
         // res.write("<img src=" + imgUrl+">");
         // res.write("<h1> The temprature in London is "+temp+"</h1>");// we can only have one res.send()
         res.send("<h3>Today's weather discription is "+weatherDiscription+"</h3>" + "<img src=" + imgUrl+">" + "<h1> The temprature in "+city+" is "+temp+"</h1>");
         // console.log(temp);
         // console.log(weatherDiscription); 
        })
     })
})

// app.get("/",function(req,res){
    
//     // https.get(url,function(response){
//     //    console.log(response.statusCode);

//     //    response.on("data",function(data){
//     //     const weatherData = JSON.parse(data);//here data is in hexadecimal and JSON.parse(data) convert data into JSON format and to print it in string format could be done using JSON.stringify(object) where object is any javascript object
//     //     const temp = weatherData.main.temp;
//     //     const weatherDiscription = weatherData.weather[0].description;
//     //     const icon = weatherData.weather[0].icon
//     //     const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
//     //     // res.write("<h3>Today's weather discription is "+weatherDiscription+"</h3>");// we can use multiple res.write()
//     //     // res.write("<img src=" + imgUrl+">");
//     //     // res.write("<h1> The temprature in London is "+temp+"</h1>");// we can only have one res.send()
//     //     res.send("<h3>Today's weather discription is "+weatherDiscription+"</h3>" + "<img src=" + imgUrl+">" + "<h1> The temprature in London is "+temp+"</h1>");
//     //     // console.log(temp);
//     //     // console.log(weatherDiscription); 
//     //    })
//     // })

//     // res.send("running");
// })





app.listen(3000,function(){
    console.log("server is running");
})