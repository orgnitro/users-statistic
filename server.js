const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const userRouter = require('./router')
const PORT = process.env.PORT || 4001;
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'react-ui/build')));

app.use('/users', userRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/react-ui/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})

