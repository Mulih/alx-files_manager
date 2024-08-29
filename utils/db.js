import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

/**
 * Class for performing operations with Mongo service
 */

export class DBClient {
  /**
   * Constructor for the DBClient class.
   * When an instance of this class is created, it establishes a connection to the MongoDB database.
   * The connection is established using the URL provided in the environment variables
   * or the default values.
   * If the connection is successful, it assigns the database,
   * users collection, and files collection to the instance variables.
   * If the connection fails, it logs the error message and sets the db variable to false.
   */
  constructor() {
    // Create a new instance of the MongoClient class with the provided URL and options
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to the MongoDB database using the connect method
    this.client.connect()
      .then(() => {
        // If the connection is successful,
      // assign the database, users collection, and files collection to the instance variables

        // Get the database specified in the URL
        this.db = this.client.db(DB_DATABASE);

        // Get the users collection from the database
        this.usersCollection = this.db.collection('users');

        // Get the files collection from the database
        this.filesCollection = this.db.collection('files');
      })
      .catch((err) => {
        // If the connection fails, log the error message and set the db variable to false
        console.log(err.message);
        this.db = false;
      });
  }

  /**
   * It checks if the connection to MongoDB is Alive.
   * @return true if connection is alive of false if not.
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    try {
      const numberOfUsers = await this.usersCollection.countDocuments();
      return numberOfUsers;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  /**
   * Returns the number of files
   */
  async nbFiles() {
    try {
      const numberOfFiles = await this.filesCollection.countDocuments();
      return numberOfFiles;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
