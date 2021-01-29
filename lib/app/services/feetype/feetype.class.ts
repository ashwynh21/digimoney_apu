import Service from '../../declarations/service';
import { FeetypeModel } from '../../models/feetype.model';
import Ash from '../../declarations/application';

export class FeetypeService extends Service<FeetypeModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'feetype',
            store: 'feetype'
        });
    }
}
