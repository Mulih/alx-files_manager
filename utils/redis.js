import redis from 'redis';

class redisClient {
  constructor() {
    this.client = redis.createClient({
	    host: 'localhost',
	    port: 6379
    });
    this.client.on('error', (err) => console.error('Redis Error', err));
    this.isAlive = () => {
      return new Promise((resolve) => {
        this.client.ping((err, result) => {
          if (result === 'PONG') {
	    resolve(true);
          } else {
              resolve(false);
	  }
       });
    });
    }
}

module.exports = redisClient;
