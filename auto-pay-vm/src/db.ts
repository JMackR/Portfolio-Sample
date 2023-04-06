import mysql from 'mysql'
import fs from 'fs'

var pool = mysql.createPool({
  connectionLimit: 7,
  host: '',
  port: 30033,
  user: '',
  password: '',
  database: ''
});


pool.getConnection((err, connection) => {
  if (err)
    throw err;
  console.log('Database connected successfully');
  connection.release();
  
});


const Db = {
  async getDueInvoices() {
    try {
      return new Promise((resolve, reject) => {
        let sql = `
        SELECT DISTINCT i.policy_locator, i.locator AS invoice_locator, i.due_timestamp , i.total_due AS amount, i.status, c.field_value AS 'email' 
        FROM invoice AS i 
        INNER JOIN 
              (SELECT a.policy_locator, b.* 
                FROM policy_characteristics AS a 
                INNER JOIN policy_characteristics_fields AS b 
                ON a.locator = b.policy_characteristics_locator 
                WHERE b.field_name = 'driverEmail') AS c 
            ON i.policy_locator = c.policy_locator
            WHERE i.status = 'unfulfilled'
             -- LIMIT 1
            -- AND DATE(FROM_UNIXTIME(i.due_timestamp/1000, "%Y-%m-%d")) between curdate() and DATE_ADD(curdate(), INTERVAL 1 WEEK);
        `;
  
        pool.query(sql, (error, results, fields) => {
           if (error) return reject(error.message);
           if (Array.isArray(results)) {
               let finalResults = [];
               const resultsLength = results.length;

               for (let index = 0; index < resultsLength; index++) {
                   finalResults.push({...results[index]});
               }
               pool.end();
               return resolve(finalResults);
           } else {
              pool.end();
              return resolve(results);
           }
         
        });
     
       
      })
    } catch (error) {

      console.log("DB FETCH ERROR", error);
      
    }
  
    

  }

}
export default Db