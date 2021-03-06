import {Component} from '@angular/core';

import {PluginConfig} from "../services/plugin.config";
import {BasePopup, PopupService} from "../services/popup.service";
import {AbstractPopupComponent} from "./abstract-popup.component";

export class BusyPopup extends BasePopup {}

@Component({
    selector: 'busy-popup',
    templateUrl: PluginConfig.buildTemplateUrl('/templates/busy-popup.html')
})
export class BusyPopupComponent extends AbstractPopupComponent {
    constructor(popupService: PopupService) {
        super(popupService, BusyPopup);
    }
}
