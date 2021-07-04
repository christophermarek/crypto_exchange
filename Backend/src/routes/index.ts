import { Router } from "express"

import { getUsersOrders } from '../controllers/orderbooks/index';

const router: Router = Router()

router.get("/user/getusersoders/:user_id", getUsersOrders);

export default router;