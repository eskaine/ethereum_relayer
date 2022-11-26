// import express = require("express");
import express, { Request, Response, NextFunction } from 'express';
import RelayerService from '../services/relayer.service';
const router = express.Router();
const relayerService = new RelayerService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
});

export default router;
