import client from '../helpers/pg.driver.js';
import { Logger } from '../helpers/Logger/logger.js'

const dataMapper = {

  async findMemberByEmail(email) {
    try {
      const result = await client.query(
        'SELECT * FROM member WHERE email = $1', 
        [email]
      );

      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    
    } catch (error) {
      Logger.error('Impossible de trouver le membre', error);
      throw error;
    }
  },

  async createMember(firstname, lastname, email, hashedPassword) {
    try {
      const result = await client.query(
        'INSERT INTO "member" (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *', 
        [firstname, lastname, email, hashedPassword]
      );
      return result.rows[0];
    
    } catch (error) {
      Logger.error('Echec de création de membre', error);
      throw error;
    }
  },

  async changePassword(hashedNewPassword, email) {
    try {
      const result = await client.query(
        'UPDATE member SET password = $1 WHERE email = $2 RETURNING *',
        [hashedNewPassword, email]
      );
      return result.rows[0];
  
    } catch (error) {
      Logger.error('Echec du changement de mot de passe', error);
      throw error;
    }
  },
  
};

export default dataMapper;



