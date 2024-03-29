
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const statusRouter = require('./routes/jobStatus.router');
const jobRouter = require('./routes/job.router');
const skillRouter = require('./routes/skill.router');
const followUpRouter = require('./routes/followup.router');
const s3Router = require('./routes/s3.router');
const fileRouter = require('./routes/file.router');
const chartRouter = require('./routes/chart.router');
const searchRouter = require('./routes/search.router');
const webScrapingRouter = require('./routes/webScraping.router');
const contactRouter = require('./routes/contact.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/status', statusRouter);
app.use('/api/job', jobRouter);
app.use('/api/skill', skillRouter);
app.use('/api/followup', followUpRouter)
app.use('/api/s3', s3Router);
app.use('/api/file', fileRouter);
app.use('/api/chart', chartRouter);
app.use('/api/search', searchRouter);
app.use('/api/scraping', webScrapingRouter);
app.use('/api/contact', contactRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
