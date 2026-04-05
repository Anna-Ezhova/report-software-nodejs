import express from "express";

export const test = () => {
  const router = express.Router();

  // Middleware to parse JSON request body
  router.use(express.json());

  // POST route
  router.post("/test", (req, res) => {
    const message = req.body.message;
    res.json({ receivedMessage: message });
  });

  return router;
};
