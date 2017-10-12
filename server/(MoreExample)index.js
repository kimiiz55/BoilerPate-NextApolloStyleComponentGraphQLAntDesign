//อันนี้ลองไว้เทียบการใช้งานเฉยๆจ้า 

require('dotenv').config();

const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schemas');
const path = require('path');
const db = require('./db/schema');

const next = require('next');
const _ = require('lodash');
const stopword = require('stopword');
const { verifyToken } = require('./middlewares');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;


nextApp.prepare()
  .then(() => {
    const app = express();

    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '../client/static')));

    app.use(verifyToken);

    app.use('/graphql', graphqlExpress((req) => ({
      schema,
      context: {
        SECRET,
        _,
        stopword,
        user: req.user,
        db
      }
    })));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));

    app.get('/question/:id', (req, res) => {
      const actualPage = '/question';
      const queryParams = { id: req.params.id };
      nextApp.render(req, res, actualPage, queryParams);
    });

    app.get('*', (req, res) => {
      return handle(req, res);
    });


    const server = createServer(app);

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.info(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
