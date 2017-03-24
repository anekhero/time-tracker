import {
    Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef,
    Renderer
} from '@angular/core';

import {PopupService, BasePopup} from '../services/popup.service';

export class AbstractPopupComponent {
    public popup: BasePopup;
    public styleLeft: string;
    public styleTop: string;
    public overlayWidth: string;
    public overlayHeight: string;

    constructor(
        private popupService: PopupService,
        protected popupType: any
    ) {
        this.popupService.popup.subscribe(popup => this.checkPopup(popup));
    }

    protected checkPopup(popup: BasePopup) {
        if (this.popupType && popup instanceof this.popupType) {
            if (popup.visible) {
                this.showPopup(popup as BasePopup);
            } else {
                this.hidePopup();
            }
        }
    }

    protected showPopup(popup: BasePopup) {
        this.popup = popup;
        this.setOverlay();
        this.centerPopup();
    }

    protected hidePopup() {
        this.popup = undefined;
    }

    protected setOverlay() {
        this.overlayHeight = this.popup.window.innerHeight + "px";
        this.overlayWidth = this.popup.window.innerWidth + "px";
    }

    protected centerPopup() {
        this.styleTop = (this.popup.window.innerHeight - 100) / 2 + "px";
        this.styleLeft = (this.popup.window.innerWidth - 100) / 2 + "px";
    }
}
