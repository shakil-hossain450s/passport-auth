require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on https://localhost:${PORT}`);
});