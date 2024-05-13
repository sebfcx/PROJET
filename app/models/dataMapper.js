import client from '../helpers/pg.driver.js';

const dataMapper = {

  async findUserByEmail(email) {
    const result = await client.query('SELECT * FROM "member" WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  },

  async createUser(firstname, lastname, email, hashedPassword) {
    const user = await client.query('INSERT INTO "member" (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, hashedPassword]);
    return user.rows[0];
  },
};

 export default dataMapper;