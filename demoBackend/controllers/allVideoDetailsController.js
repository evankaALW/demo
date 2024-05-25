const allVideoDetailsController = {}
const connection = require('../config/db')

allVideoDetailsController.getAllVideoDetails = async  (req,res) =>{
        
                 
           
try{
  const selectQuery = `SELECT DISTINCT displayToggle, userResponseToggle, videoID, videoDataID, questionTypeID, imageURL, JSON_OBJECT('padx1', CAST(JSON_UNQUOTE(JSON_EXTRACT(padX, '$.padx1')) AS UNSIGNED), 'padx2', CAST(JSON_UNQUOTE(JSON_EXTRACT(padX, '$.padx2')) AS UNSIGNED),'padx3', CAST(JSON_UNQUOTE(JSON_EXTRACT(padX, '$.padx3')) AS UNSIGNED),'padx4', CAST(JSON_UNQUOTE(JSON_EXTRACT(padX, '$.padx4')) AS UNSIGNED),'padx5', CAST(JSON_UNQUOTE(JSON_EXTRACT(padX, '$.padx5'))AS UNSIGNED)) AS padX, JSON_OBJECT('pady1', CAST(JSON_UNQUOTE(JSON_EXTRACT(padY, '$.pady1')) AS UNSIGNED),'pady2', CAST(JSON_UNQUOTE(JSON_EXTRACT(padY, '$.pady2')) AS UNSIGNED),'pady3', CAST(JSON_UNQUOTE(JSON_EXTRACT(padY, '$.pady3')) AS UNSIGNED),'pady4', CAST(JSON_UNQUOTE(JSON_EXTRACT(padY, '$.pady4')) AS UNSIGNED),'pady5', CAST(JSON_UNQUOTE(JSON_EXTRACT(padY, '$.pady5')) AS UNSIGNED)) AS padY, JSON_OBJECT('x1', CAST(JSON_UNQUOTE(JSON_EXTRACT(x, '$.x1')) AS UNSIGNED), 'x2', CAST(JSON_UNQUOTE(JSON_EXTRACT(x, '$.x2')) AS UNSIGNED),'x3', CAST(JSON_UNQUOTE(JSON_EXTRACT(x, '$.x3')) AS UNSIGNED),'x4', CAST(JSON_UNQUOTE(JSON_EXTRACT(x, '$.x4')) AS UNSIGNED),'x5', CAST(JSON_UNQUOTE(JSON_EXTRACT(x, '$.x5')) AS UNSIGNED)) AS x,JSON_OBJECT('y1', CAST(JSON_UNQUOTE(JSON_EXTRACT(y, '$.y1')) AS UNSIGNED), 'y2', CAST(JSON_UNQUOTE(JSON_EXTRACT(y, '$.y2')) AS UNSIGNED),'y3', CAST(JSON_UNQUOTE(JSON_EXTRACT(y, '$.y3')) AS UNSIGNED),'y4', CAST(JSON_UNQUOTE(JSON_EXTRACT(y, '$.y4')) AS UNSIGNED),'y5', CAST(JSON_UNQUOTE(JSON_EXTRACT(y, '$.y5')) AS UNSIGNED)) AS y,JSON_UNQUOTE(JSON_EXTRACT(font, '$.text')) AS font,totalOptionNumber,JSON_OBJECT('optionOne', optionOne,'optionTwo', optionTwo,'optionThree', optionThree,'optionFour', optionFour,'optionFive', optionFive) AS options FROM videoData`;
    //onst selectQuery = `SELECT DISTINCT displayToggle, userResponseToggle, videoID, videoDataID, questionTypeID, imageURL, JSON_OBJECT(padX), JSON_OBJECT(padY), JSON_OBJECT(x), JSON_OBJECT(y), JSON_OBJECT(font), totalOptionNumber, JSON_OBJECT('optionOne', optionOne, 'optionTwo', optionTwo, 'optionThree', optionThree, 'optionFour',optionFour,'optionFive',optionFive) AS options  FROM videoData`;
    const result = await connection.query(selectQuery)
    if(result[0]) {
        const results = result[0];
           
            res.status(200).json({ results });
          } else {
            res.status(404).json({ error: 'No videos found' });
          }
      }
catch(error){
    console.log("error in allVideoDetails fetch",error)
}         
};


module.exports = allVideoDetailsController;





// app.get('/api/allVideoDetails/',(req,res) => {
//     const selectQuery = 'SELECT displayToggle, userResponseToggle, videoID FROM videoData';
  
//     connection.query(selectQuery, (err, results) => {
//       if (err) {
//         console.error('Error querying database:', err);
//         res.status(500).json({ error: 'Error retrieving all videos' });
//       } else {
//         if (results.length > 0) {
//           const videos = results.map(({displayToggle, userResponseToggle, videoID }) => {
//             displayToggle,
//             userResponseToggle,
//             videoID
//           });
//           res.status(200).json({ results });
//         } else {
//           res.status(404).json({ error: 'No videos found' });
//         }
//       }
//     })
//   });
  