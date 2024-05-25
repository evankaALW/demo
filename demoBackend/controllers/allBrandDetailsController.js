const allBrandDetailsController = {}
const connection = require('../config/db')




allBrandDetailsController.getAllBrandDetails = async  (req,res) =>{
        
                 
           
try{
    const selectQuery = `SELECT * FROM BRANDTABLES`;
    const result = await connection.query(selectQuery)
    if(result[0]) {
        const results = result[0];
           
            res.status(200).json({ results });
          } else {
            res.status(404).json({ error: 'No Brand details found' });
          }
        
      }
catch(error){
    console.log("error in getAllBrandDetails fetch",error)
}         
};


module.exports = allBrandDetailsController;

