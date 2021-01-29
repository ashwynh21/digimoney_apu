import Ash from '../../declarations/application';
import { FeetypeService } from './feetype.class';
import { FeetypeModel } from '../../models/feetype.model';

export default (app: Ash): void => {
    app.apply<FeetypeModel, FeetypeService>(new FeetypeService(app));
}
