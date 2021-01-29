import { WallettypeModel } from '../../models/wallettype.model';

import Ash from '../../declarations/application';
import Service from '../../declarations/service';

export class WallettypeService extends Service<WallettypeModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'wallettype',
            store: 'wallettype'
        });
    }
}
