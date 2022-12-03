import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./db";
import routes from "./routes";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json()); // Accept Request body

    app.use("/api", routes);

    app.get("/", (request, response) => {
      response.status(200).send({ message: "success" });
    });

    // Error Handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      return res.status(500).send({
        message: err.message ?? "Something went wrong",
      });
    });

    app.listen(5000, () => console.log(`App is running on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
