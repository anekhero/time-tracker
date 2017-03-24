import {Injectable, Inject, Optional} from "@angular/core";
import {Subject, Observable} from "rxjs/Rx";

export class BasePopup {
    visible: boolean;
    window: Window;

    constructor(visible: boolean = true) {
        this.visible = visible;
    }
}

@Injectable()
export class PopupService {
    public popup: Observable<BasePopup>;
    private _popup: Subject<BasePopup>;
    private window: Window;

    constructor(@Optional() @Inject('BROWSER_WINDOW') W: Window) {
        W && (this.window = W) || (window && (this.window = window));
        this._popup = new Subject<BasePopup>();
        this.popup = this._popup.asObservable();
    }

    showPopup(popup: BasePopup){
        popup.window || (popup.window = this.window);
        this._popup.next(popup);
    }
}
