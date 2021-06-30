import { Router } from "express"
import { register, login } from "../controllers/user/index";

import { getUsersOrders } from '../controllers/orderbooks/index';

const router: Router = Router()

router.post("/api/register", register);
router.post("/api/login", login);

router.get("/user/getusersoders/:user_id", getUsersOrders);

export default router;