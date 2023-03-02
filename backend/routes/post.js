import express from "express";

const router = express.Router();

router.post("/pics", (request, response) => {
    console.log(request.headers)
    try {
    response.status(200).json({
        success: true
    })} 
    catch (e) {
        response.status(400).json({
            success:false
        })
        console.log(e)
    }
}); 


export default router