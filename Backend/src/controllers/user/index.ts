import { Response, Request } from "express"
import { user } from "../../models/user"
import { userType } from "../../types/userType";



const register = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        //req.body..
        /*
        const realtimeList: realtimedataType[] = await realtimeWsb.find().exec()
        res.status(200).json({ realtimeList })
        */
       res.status(200).json({ res: req.body})
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        /*
        const realtimeList: realtimedataType[] = await realtimeWsb.find().exec()
        res.status(200).json({ realtimeList })
        */
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export { register, login }
