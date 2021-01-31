"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var appRoot = require('app-root-path');
const csv = require('csvtojson');
const router = express_1.Router();
// Model
const Contact_1 = __importDefault(require("../models/Contact"));
router.route('/create')
    .get((req, res) => {
    res.render('contacts/create');
})
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body)
    const { name, phone } = req.body;
    const newContact = new Contact_1.default({ name, phone });
    yield newContact.save();
    //res.send('Saved')
    res.redirect('/contacts/list');
}));
router.route('/list')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield Contact_1.default.find().lean();
    //console.log(contacts);
    res.render('contacts/list', { contacts });
}));
router.route('/delete/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Contact_1.default.findByIdAndDelete(id);
    res.redirect('/contacts/list');
}));
router.route('/edit/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const contact = yield Contact_1.default.findById(id).lean();
    console.log(contact);
    res.render('contacts/edit', { contact });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, phone } = req.body;
    yield Contact_1.default.findByIdAndUpdate(id, { name, phone });
    res.redirect('/contacts/list');
}));
router.route('/import/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('import');
    res.render('contacts/import');
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('file', (_a = req.files) === null || _a === void 0 ? void 0 : _a.csvfile);
    let csvfile;
    let uploadPath;
    csvfile = (_b = req.files) === null || _b === void 0 ? void 0 : _b.csvfile;
    uploadPath = appRoot + '/src/public/csv/' + csvfile.name;
    console.log('upload to : ', uploadPath);
    // Use the mv() method to place the file somewhere on your server
    yield csvfile.mv(uploadPath);
    const csvFilePath = uploadPath;
    const array = yield csv().fromFile(csvFilePath);
    console.log(array);
    array.forEach((element) => {
        console.log(element);
        const newContact = new Contact_1.default({ element, : .name, element, : .phone });
        yield newContact.save();
    });
    res.redirect('/contacts/list');
}));
exports.default = router;
