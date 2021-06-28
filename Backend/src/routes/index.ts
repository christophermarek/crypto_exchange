import { Router } from "express"
import { register, login } from "../controllers/user/index";

const router: Router = Router()

router.post("/api/register", register);
router.post("/api/login", login);

export default router;