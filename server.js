const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const router = require("./app/routes");

app.use("/api/user", router.userRoutes);
app.use("/api/user/vote", router.voteRoutes);
app.use("/api/user/candidate", router.candidateRoutes);

app.listen(port, () => console.log(`Listening on : http://localhost:${port}`));
