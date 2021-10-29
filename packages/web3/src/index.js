/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.js
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 *   Gav Wood <gav@parity.io>
 *   Jeffrey Wilcke <jeffrey.wilcke@ethereum.org>
 *   Marek Kotewicz <marek@parity.io>
 *   Marian Oancea <marian@ethereum.org>
 * @date 2017
 */

"use strict";


import {version} from '../package.json';
import core from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-core/src/index.js';
import Eth from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-eth/src/index.js';
import Net from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-net/src/index.js';
import Personal from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-eth-personal/src/index.js';
import Shh from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-shh/src/index.js';
import Bzz from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-bzz/src/index.js';
import utils from 'https://github.com/ntrotner/web3-deno/raw/main/packages/web3-utils/src/index.js';

var Web3 = function Web3() {
    var _this = this;

    // sets _requestmanager etc
    core.packageInit(this, arguments);

    this.version = version;
    this.utils = utils;

    this.eth = new Eth(this);
    this.shh = new Shh(this);
    this.bzz = new Bzz(this);

    // overwrite package setProvider
    var setProvider = this.setProvider;
    this.setProvider = function (provider, net) {
        /*jshint unused: false */
        setProvider.apply(_this, arguments);

        _this.eth.setRequestManager(_this._requestManager);
        _this.shh.setRequestManager(_this._requestManager);
        _this.bzz.setProvider(provider);

        return true;
    };
};

Web3.version = version;
Web3.utils = utils;
Web3.modules = {
    Eth: Eth,
    Net: Net,
    Personal: Personal,
    Shh: Shh,
    Bzz: Bzz
};

core.addProviders(Web3);

export default Web3;
