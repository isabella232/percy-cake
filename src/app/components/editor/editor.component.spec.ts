import * as _ from 'lodash';
import { PROPERTY_VALUE_TYPES, appPercyConfig } from 'config';
    expect(ctx.component.getAppConfigTooltip()).toEqual(utilService.getAppConfigTooltip(appPercyConfig));
    ctx.store.next(new LoadFilesSuccess({ files: [file], applications, appConfigs: {} }));