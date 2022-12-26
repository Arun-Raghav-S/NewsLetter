const express=require("express");
const https=require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing')
const request=require("request");
const app=express();
app.use(express.urlencoded());
app.use(express.static(__dirname));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    const data={
        members:[{
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
        }],
    };
    mailchimp.setConfig({
        apiKey: "9451a227719866a85c082d5c88d1221c-us12",
        server: "us12",
      });
      const run = async () => {
        try{
        const response = await mailchimp.lists.batchListMembers("b9b4df051f",data);
        console.log(response);
        res.sendFile(__dirname+"/success.html");
        }catch(err){
            console.log(err.status);
            res.sendFile(__dirname+"/failure.html");
        }
      };
      run();
     
    app.post("/failure",function(req,res){
        res.redirect("/");
    })
})


app.listen(process.env.PORT||3000,function(){
    console.log("Server started in port 3000");
})
// 9451a227719866a85c082d5c88d1221c-us12
// b9b4df051f