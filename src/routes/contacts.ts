import { Router, Request, Response } from 'express';
var appRoot = require('app-root-path');
const csv = require('csvtojson')


const router = Router();

// Model
import Contact from '../models/Contact';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('contacts/create')
    })
    .post(async (req: Request, res: Response) => {
        //console.log(req.body)
        const { name, phone } = req.body;
        const newContact = new Contact({name, phone})
        await newContact.save();
        //res.send('Saved')
        res.redirect('/contacts/list')
    })

router.route('/list')
    .get(async (req: Request, res: Response) => {
        var perPage = 12;
        var page = req.query.page;

        if (page == undefined) page = '1'

        var colName = req.query.search;
        if (colName == undefined) colName = "";
        console.log('search : ', colName);
        const contacts = await Contact.find({ "name": { $regex: '.*' + colName + '.*' }})
            .skip((perPage * (page as any)) - perPage).limit(perPage).lean();
        //console.log(contacts);
        res.render('contacts/list', { contacts });
    })

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.redirect('/contacts/list');
    })

router.route('/edit/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const contact = await Contact.findById(id).lean();
        console.log(contact)
        res.render('contacts/edit', {contact});
    })
    .post(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, phone } = req.body;
        await Contact.findByIdAndUpdate(id, {name, phone});
        res.redirect('/contacts/list')
    })

router.route('/import/')
    .get(async (req: Request, res: Response) => {
        console.log('import')
        res.render('contacts/import');
    })
    .post(async (req, res, next) => {
        console.log('file',req.files?.csvfile);

        let csvfile;
        let uploadPath;

        csvfile = req.files?.csvfile;
        uploadPath = appRoot + '/src/public/csv/' + (csvfile as any).name;
        console.log('upload to : ', uploadPath);

        // Use the mv() method to place the file somewhere on your server
        await (csvfile as any).mv(uploadPath);

        const csvFilePath = uploadPath
        const array = await csv().fromFile(csvFilePath);

        console.log(array)

        array.forEach(async (element: any) => { 
            console.log(element); 
            var name = element.name;
            var phone = element.phone;
            const newContact = new Contact({name, phone});
            await newContact.save();
        }); 

        
        
        res.redirect('/contacts/list')
    })

export default router;