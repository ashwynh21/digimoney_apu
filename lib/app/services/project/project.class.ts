import { ProjectModel } from '../../models/project.model';
import Service from '../../declarations/service';
import Ash from '../../declarations/application';

export class ProjectService extends Service<ProjectModel> {
    public constructor(app: Ash) {
        /*
        This service does not have a model or data store so we have to be careful with the constructor
         */
        super(app, {
            name: 'project',
        });

    }
}
