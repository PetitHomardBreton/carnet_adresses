import bcrypt from 'bcrypt';

bcrypt.hash('@!qpB58cQG', 10, (error, hash) => {
    console.log(hash);
});