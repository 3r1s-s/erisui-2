import '../styles.css';

import './components/eui-avatar.js';
import './components/eui-icon.js';
import './components/eui-input.js';
import './components/eui-loader.js';
import './components/eui-progressbar.js';
import './components/eui-switch.js';
import './components/eui-chip.js';
import './components/eui-app-nav.js';
import './components/eui-nav-item.js';
import './components/eui-header.js';
import './components/eui-checkbox.js';
import './components/eui-button.js';
import './components/eui-heading.js';
import './components/eui-code.js';
import './components/eui-app-titlebar.js';

import { router, loadPage } from './scripts/router.js';
import * as device from './scripts/device.js';
import * as haptics from './scripts/haptics.js';
import * as icons from './scripts/icons.js';
import * as storage from './scripts/storage.js';
import * as utils from './scripts/utils.js';

export { router, loadPage, device, haptics, icons, storage, utils };

export const version = "1.0.5";

if (typeof window !== 'undefined') {
    console.log('ErisUI loaded successfully');
}
