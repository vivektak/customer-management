const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/net-payable-amount', (req, res) => {
    let netAmount;
    if(req.body.itemtype !== 'groceries'){
        if(req.body.storeEmployee){
            netAmount = req.body.amount - (req.body.amount*0.30)
        } else if(req.body.storeAffliate){
           netAmount = req.body.amount - (req.body.amount*0.10)
        }else if(req.body.duration >= 2){
            netAmount = req.body.amount - (req.body.amount*0.05)
        } 
        
        if(req.body.amount > 100){
            discount = Math.floor(req.body.amount/100)*5
            if(netAmount == null){
                netAmount = req.body.amount-discount
            } else{
                netAmount -=discount;
            }
        }
    } else{
        if(req.body.amount > 100){
            discount = Math.floor(req.body.amount/100)*5
            netAmount = req.body.amount - discount;
        }
    }
    res.send({data : netAmount});
    
})

app.listen(8000, () => {
    console.log('Server is Running on Port',8000);
});