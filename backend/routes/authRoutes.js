const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();

// Configure Passport with Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Loaded from .env
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Loaded from .env
            callbackURL: "http://localhost:3000/auth/google/callback", // Ensure this matches the Google Console URI
        },
        (accessToken, refreshToken, profile, done) => {
            // Save the user's profile (optional)
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/failure",
        successRedirect: "http://localhost:5173/dashboard",
    })
);

module.exports = router;
