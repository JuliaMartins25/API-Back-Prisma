import express from "express";
import noteRoutes from "./routes/notesRoutes.js";


const app = express();
const port = 4000;
app.use(express.json());
app.use("/anotacao", noteRoutes);
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
