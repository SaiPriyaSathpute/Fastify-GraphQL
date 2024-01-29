import pkg from 'jsonwebtoken';
const { sign } = pkg;

// Function to generate a JWT token with a specific payload
const generateJwtToken = (channel) => {
  const secretKey = 'secret-key'; 

  // JWT payload including the 'channel' key
  const payload = {
    channel,
  };

  // Options for the JWT token (e.g., expiration time)
  const options = {
    expiresIn: '1d', 
  };

  // Generate the JWT token
  const token = sign(payload, secretKey, options);
  return token;
};

const tokenNational = generateJwtToken('national');
console.log('JWT Token for national:', tokenNational);

const tokenRegional = generateJwtToken('regional');
console.log('JWT Token for regional:', tokenRegional);
