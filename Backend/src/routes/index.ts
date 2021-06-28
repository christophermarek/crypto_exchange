import { Router } from "express"
import { register, login } from "../controllers/user/index";

const router: Router = Router()

router.get("/api/register", register);
router.get("/api/login", login);

export default router;