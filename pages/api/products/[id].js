import Product from '../../../models/Product'
import DbConnect from '../../../util/mongo'
export default async function handler(req, res) {
    await DbConnect()
    const {
        method, cookies
    } = req
    const {
        id
    } = req.query

    const token = cookies.token
    if (method === 'GET') {
        try {
            const product =await Product.findById(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if(method==='PUT'){
        if(!token || token!== process.env.token){
           return res.status(401).json("NOT AUTHENTICATED")
        }
        try{
            const product = await Product.create(req.body);
            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }if(method==='DELETE'){
        if(!token || token!== process.env.token){
           return res.status(401).json("NOT AUTHENTICATED")
        }
        try{
            const product = await Product.findByIdAndDelete(id);
            res.status(201).json('The product have been deleted !')
        }catch(err){
            res.status(500).json(err)
        }
    }
}

