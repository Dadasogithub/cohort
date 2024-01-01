const express=require("express")

const app=express()

const user = [{
    name: "John",
    kidneys: [{
        healthy: false 
    }]
}];


app.use(express.json())
 

app.get('/', (req, res) => {
          const johnskidney= user[0].kidneys;
          const kidneyNumber = johnskidney.length;
          let numberOfHealthyKidneys=0;

          for(let i=0;i<johnskidney.length;i++){
             if(johnskidney[i].healthy) { 
                    numberOfHealthyKidneys += 1;
             }
          }

          const numberOfunHealthyKidneys = kidneyNumber - numberOfHealthyKidneys;
          res.json({
          
            kidneyNumber,
            numberOfHealthyKidneys,
            numberOfunHealthyKidneys
          })
  });
//adding unhealthy kidneys
  app.post('/',(req,res) => {
        const isHealthy= req.body.isHealthy;
        user[0].kidneys.push({
           healthy: isHealthy
        })

        res.json({
            msg:"Done!"
        })
  })


  // update unhealthy kidneys to healthy
  app.put('/',(req,res) => {
        for( let i=0;i<user[0].kidneys.length;i++){
                user[0].kidneys[i].healthy = true;
        }

        res.json({})
  }
  )

  //removing all the unhealthy kidneys
  app.delete('/',(req,res) => {

    if(altleastOneBadKidney()){
      const newKidneys = [];
      for( let i=0;i<user[0].kidneys.length;i++){
           if(user[0].kidneys[i].healthy){
                newKidneys.push({
                      healthy: true
                })
           }
      }

    user[0].kidneys = newKidneys;
    res.json({ msg: "Done"})

    }
    else{
        res.status(411).json({ msg:"Your havent nay sort of bad kidney"})
    }
})

function altleastOneBadKidney(){
  let altleastOneBadKidney=false;
  for( let i=0;i<user[0].kidneys.length;i++){
    if( !user[0].kidneys[i].healthy){
        altleastOneBadKidney = true ;
    }
  }
  return altleastOneBadKidney

}

app.listen(3001)