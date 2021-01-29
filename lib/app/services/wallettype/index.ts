import Ash from '../../declarations/application';
import { WallettypeService } from './wallettype.class';
import { WallettypeModel } from '../../models/wallettype.model';

export default (app: Ash): void => {
    app.apply<WallettypeModel, WallettypeService>(new WallettypeService(app));
}
