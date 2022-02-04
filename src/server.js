const { PORT = 8080 } = process.env;
const app = require("./app");

const listener = () => console.log(`Server is running on Port ${PORT}!`);
app.listen(PORT, listener);
