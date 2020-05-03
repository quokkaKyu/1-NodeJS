const express = require('express');
const router = express.Router();
const countryModel = require('../model/CountryModel');


router.get('/country', showcountryList);
router.get('/country/:id',showCountryDetailView);
router.get('/country/add',showCountryAddView);
router.post('/country/add', addcountry);
router.get('/country/edit/:id',showCountryEditView);
router.post('/country/edit', updatecountry);
router.post('/country/delete/:id', deletecountry);


module.exports = router;

function showcountryList(req, res) {
    const countryList = countryModel.showcountryList();
    // const result = { data:countryList, count:countryList.length };
    res.render('CountryListView',{ data:countryList, count:countryList.length });
}

function showCountryAddView(req, res) {
        res.render('CountryAddView');    
}

async function addcountry(req, res) {
    const data = req.body
    try {
        const result = await countryModel.addcountry(data);
        res.send({msg:'success', data:result});
    } catch (error) {
        res.status(500).send(error.msg);
    }
}

async function showCountryDetailView(req, res) {
    try {
        const id = req.params.id;
        console.log('country: ', id);
        const info = await countryModel.detailCountry(id);
        res.render('CountryDetailView',{info:info});
        // res.send(info);
        
    } 
    catch (error) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


async function showCountryEditView(req, res) {
    try {
        const id = req.params.id;
        console.log('country: ', id);
        const info = await countryModel.detailCountry(id);
        res.render('CountryEditView',{info:info});
        
    } 
    catch (error) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function updatecountry(req, res) {
    
    const data = req.body;
    console.log(req.body);
    const name = req.body.name;
    const language = req.body.language;
    const capital = req.body.capital;

    if ( !name || !language || !capital) {
        res.status(400).send({error:'Fail'});
        return;
    }

    try {
        const result = await countryModel.updatecountry(data);
        const countryList = countryModel.showcountryList();
        res.render('CountryListView',{ data:countryList, count:countryList.length });
        // res.send({msg:'Updated country' + data.name, data:result});
    }
    catch ( error ) {
        console.error(error);
        res.status(500).send({error:'Fail'});
    }
}

async function deletecountry(req, res) {
    
    try {
        const id = req.params.id;
        console.log('Deleted country : ', id);
        const result = await countryModel.deletecountry(id);
        const countryList = countryModel.showcountryList();
        res.render('CountryListView',{ data:countryList, count:countryList.length });
    }
    catch ( error ) {
        res.status(400).send({error:'Fail'});
    }
}