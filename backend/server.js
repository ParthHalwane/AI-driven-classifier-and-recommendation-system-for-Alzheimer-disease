const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

const app = express();
const port = 3000;

// Configure session middleware
app.use(
    session({
        secret: "jgjg78b5ohjfngkjhfbgfnjmhbgjuvgvkvglkgbkhvtegfsdgbu5e4w35y4u5",
        resave: false,
        saveUninitialized: true,
    })
);

// Configure Passport with Auth0 Strategy
const auth0Strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/callback",
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    }
);

passport.use(auth0Strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/auth/login", passport.authenticate("auth0", { scope: "openid email profile" }));

app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
        failureRedirect: "/auth/failure",
    }),
    (req, res) => {
        res.redirect("http://localhost:5173/dashboard");
    }
);

app.get("/auth/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:5173");
    });
});

app.get("/auth/user", (req, res) => {
    res.json(req.user || null);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
