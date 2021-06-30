import { Response, Request } from "express"
import { user } from "../../models/user"

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        let userName = req.body.userName;
        let password = req.body.password;

        let found = await user.findOne({ username: userName }).exec();
        //console.log(found);

        //no user found
        //so create one
        if(found == null){
            try{
                //should hash password here probably
                //and need to send back a session
                await user.create({username: userName, password: password})
                res.status(200).json({registered: true, message: 'successfully registered user'})
            }catch(error){
                res.status(400).json({error: error})
            }
        }else{
            res.status(200).json({registered: false, message: 'user already registered'})
        }
       res.status(200).json({ res: req.body})
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    console.log('trying to login');
    try {
        let userName = req.body.userName;
        //we dont even check password
        let password = req.body.password;

        let found = await user.findOne({ username: userName }).exec();
       
        //no user found
        if(found == null){
            res.status(400).json({loggedIn: false, message: 'No user found'})
        }else{
            res.status(200).json({loggedIn: true, message: 'successfully logged in'})

        }
       res.status(200).json({ res: req.body})
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export { register, login }
