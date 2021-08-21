const express = require('express');

const { PORT } = require('./config/varialbles');
const { userRouter, authRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Localhost:${PORT}`);
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
