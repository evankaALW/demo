const connection = require('../config/db'); // Assuming you have a database configuration file

const getClickerAndCardDetailsController = {
    getClickerAndCardDetails: async (req, res) => {
        try {
            const query = 'SELECT userData.cardID, clickerTable.clickerMacAddress from userData, clickerTable WHERE userData.clickerSerialNo = clickerTable.clickerSerialNo;';

      
            const [results] = await connection.query(query);
            if(results){
                return res.status(200).json({ results });
            }
            else{
                return res.status(500).json({ error: 'Error retrieving user responses. Please try again.' });
            }
          }   catch (error) {
            console.error('Error executing getUserResponses query:', error);
          }
            
         
      },
  };

  
  module.exports = getClickerAndCardDetailsController;