import Store from '../declarations/store';

import mongoose from 'mongoose';

import Ash from '../declarations/application';
import { ProjectModel, ProjectSchema } from '../models/project.model';

export class ProjectStore extends Store<ProjectModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'user',
            storage: ProjectSchema,
        });
    }

    protected oninit(): void {
        /*
         * //TODO: implement oninint()
         * */
    }

    protected onmodel(schema: mongoose.Schema<ProjectModel>): void {
        /*
         * //TODO: implement onmodel()
         * */
    }

    protected onready(): void {
        /*
         * //TODO: implement onready()
         * */
    }
}
