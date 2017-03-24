import {Component} from '@angular/core';

import {PluginConfig} from "../services/plugin.config";
import {BasePopup, PopupService} from "../services/popup.service";
import {AbstractPopupComponent} from "./abstract-popup.component";

export class EditPopup extends BasePopup {}

@Component({
    selector: 'edit-popup',
    templateUrl: PluginConfig.buildTemplateUrl('/templates/edit-popup.html')
})
export class EditPopupComponent extends AbstractPopupComponent {
    constructor(popupService: PopupService) {
        super(popupService, EditPopup);
    }
}
