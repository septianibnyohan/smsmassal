import { Router, Request, Response } from 'express';

const router = Router();

// Model
import Task from '../models/Task';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('tasks/create')
    })
    .post(async (req: Request, res: Response) => {
        //console.log(req.body)
        const { title, description } = req.body;
        const newTask = new Task({title, description})
        await newTask.save();
        //res.send('Saved')
        res.redirect('/tasks/list')
    })

router.route('/list')
    .get(async (req: Request, res: Response) => {
        const tasks = await Task.find().lean();
        console.log(tasks);
        res.render('tasks/list', { tasks });
    })

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.redirect('/tasks/list');
    })

router.route('/edit/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const task = await Task.findById(id).lean();
        console.log(task)
        res.render('tasks/edit', {task});
    })
    .post(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description } = req.body;
        await Task.findByIdAndUpdate(id, {title, description});
        res.redirect('/tasks/list')
    })

router.route('/edit/:id')

export default router;