export const protect = (req, res, next) => {
    //jwt logic goes here
    // TEMP: mock user
    req.user = "69f4ad1e143fb48f613e3549";
    next();
};