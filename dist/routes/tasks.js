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
const router = express_1.Router();
// Model
const Task_1 = __importDefault(require("../models/Task"));
router.route('/create')
    .get((req, res) => {
    res.render('tasks/create');
})
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body)
    const { title, description } = req.body;
    const newTask = new Task_1.default({ title, description });
    yield newTask.save();
    //res.send('Saved')
    res.redirect('/tasks/list');
}));
router.route('/list')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find().lean();
    console.log(tasks);
    res.render('tasks/list', { tasks });
}));
router.route('/delete/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Task_1.default.findByIdAndDelete(id);
    res.redirect('/tasks/list');
}));
router.route('/edit/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield Task_1.default.findById(id).lean();
    console.log(task);
    res.render('tasks/edit', { task });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    yield Task_1.default.findByIdAndUpdate(id, { title, description });
    res.redirect('/tasks/list');
}));
router.route('/edit/:id');
exports.default = router;
