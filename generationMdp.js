import bcrypt from 'bcrypt';

bcrypt.hash('TOTO', 10, (error, hash) => {
    console.log(hash);
});