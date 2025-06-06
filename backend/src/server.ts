import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
