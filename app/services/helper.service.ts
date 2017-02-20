import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs/Rx";

@Injectable()
export class HelperService {
    private _tick: Subject<any>;
    public tick: Observable<any>;

    constructor() {
        this._tick = new Subject<any>();
        this.tick = this._tick.asObservable();
        if(window){
            window.setInterval(() => this.tickTime(), 1000);
        }
    }

    public formatDuration(milliseconds: number): string {
        let h: number = Math.floor(milliseconds/3600000);
        let m: number = Math.floor((milliseconds - h*3600000)/60000);
        let s: number = Math.floor((milliseconds - h*3600000 - m*60000)/1000);
        return (h ? this.get07(h) + ':' : '') + ((h || m) ? this.get07(m) + ':' : '') + this.get07(s) + 's';
    }

    public formatTime(dateRaw: string): string {
        let formatted = '';
        let date = new Date(dateRaw);
        if(date instanceof Date && !isNaN(date.getTime())){
            formatted = this.get07(date.getHours()) + ':' + this.get07(date.getMinutes());
        }
        return formatted;
    }

    private get07(str: any) : string {
        return ('00' + str).substr(-2, 2);
    }

    private tickTime(){
        this._tick.next();
    }
}