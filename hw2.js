const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})

const instring = mongoose.model('instring', stringSchema)

//get all strings
router.get('/', function (req, res, next) {
    instring.find({}, function (err, results) {
        res.json(results);
    })
});

//display string
router.get('/:instr', function (req, res, next) {
    let strs = req.params.instr
    const myObj = instring.find({string: strs}, function(err,result){
        if (result.length == 0){
            let newstr = new instring({string: strs, length: strs.length})
            newstr.save(function(err){
                if (err)
                    console.log('Error')
                else
                    console.log('Saved')
                res.json({string: strs, length: strs.length})
            })
        }
        else{
            console.log('Duplicate')
            res.json({string: strs, length: strs.length})
        }
    })
});

//Create a new user
router.post('/', function(req, res, next) {
    let strs = req.body.string
    if (strs == 0)
        res.json({message: 'Please enter a string'});
    else{
        const myObj = instring.find({string: strs}, function(err,result){
            if (result.length == 0){
                let newstr = new instring({string: strs, length: strs.length})
                newstr.save(function(err){
                    if (err)
                        console.log('Error')
                    else
                        console.log('Saved')
                    res.json({string: strs, length: strs.length})
                })
            }
            else{
                console.log('Duplicate')
                res.json({string: strs, length: strs.length})
            }

        })
    }
})

//Delete a user
router.delete('/:instr', function (req, res, next) {
    let strs = req.body.string
    const myObj = instring.find({string: strs}, function(err, result){
        if(result.length == 0)
            res.json({message: 'Not Found'});
        else{
            instring.del({string: strs}, function(err){
                if(err){
                    console.log('Error Deleting')
                }
                else {
                    res.json({message: 'Deleted'});
                }
            })
        }
    })
});


module.exports = router;