const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const { db, User } = require("./db");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 8080;

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === "test") {
  after("close the session store", () => sessionStore.stopExpiringSessions());
}

// passport registration
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

const createApp = () => {
  // logging middleware
  app.use(logger("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // compression middleware
  app.use(compression());

  // session/cookie middleware
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "show me the money",
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, "client/build")));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.get("*", function(req, res, next) {
    res.sendFile(path.join(__dirname, ".", "public/index.html"));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Alive and listening on port ${PORT}`)
  );
};
const syncDb = db.sync();

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

/** This evaluates as true when this file is run directly from the command line
 * i.e. when we say 'node ./bin/www' (or 'nodemon ./bin/www', etc.).
 * It will evaluate false when this module is required by another module - for example.
 * if we wanted to require our app in a test spec.
 */
require.main === module ? bootApp() : createApp();

module.exports = app;
