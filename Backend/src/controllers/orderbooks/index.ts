import express from 'express';

const getUsersOrders = async (req: express.Request, res: express.Response): Promise<void> => {

    console.log('called');
    console.log(req.params);
    try {
        let userName = req.body.userName;

       res.status(200).json({ res: 'ok'})
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export {
    getUsersOrders
}