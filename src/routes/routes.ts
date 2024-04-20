import { Router } from "express";
import coinRoutes from "./coin.routes";
import profileRoutes from "./profile.routes";
import accountRoutes from "./account.routes";
import balanceRoutes from "./balance.routes";
import authRoutes from "./auth.routes";
import landingRoutes from "./landing.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/coins", coinRoutes);
router.use("/profile", profileRoutes);
router.use("/account", accountRoutes);
router.use("/balance", balanceRoutes);
router.use("/contact", landingRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
