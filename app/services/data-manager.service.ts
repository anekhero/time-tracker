import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from "./it7-error.service";
import {It7AjaxService} from './it7-ajax.service'
import {PopupService} from "./popup.service";
import {BusyPopup} from "../components/busy-popup.component";
import {TimeLogService} from "./time-log.service";
import {TimeLogItem} from "../models/time-log-item";

@Injectable()
export class DataManagerService {
    public wishes_total_formatted: string = '';
    private popup: BusyPopup;
    private storage:Storage;

    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private it7Ajax: It7AjaxService,
        private popupService: PopupService,
        private timeLogService: TimeLogService
    ){
        // Init Articles from config
        //this.articles.update(this.config.articles);

        // Create MyAgenda from sessions
        //this.myAgenda.updateFromSessions(this.agendaSessions.sessions);
        this.storage = localStorage;
    }


    initData() {
        // this.showLoading();
        // let data = JSON.stringify({});
        // return this.it7Ajax
        //     .post(this.config.getDataUrl, {data})
        //     .then(
        //         res => {
        //             this.hideLoading();
        //             this.checkAndUpdateList(res);
        //             return res;
        //         }
        //     )
        let logs = this.storage.getItem('logs');
        logs || (logs = "[]");
        this.checkAndUpdateList({logs: JSON.parse(logs)});
    }

    addTimeLogItem(data: any) {
        let date = new Date();
        let dateString = date.toJSON();
        this._closeLastTimeLogItem(dateString);
        this.timeLogService.list.push(new TimeLogItem({
            id: Math.random().toString(36).substr(2, 9),
            summary: data.summary,
            dateStart: dateString,
            isClosed: false,
            sortKey: date.getTime()
        } as any));
        this.saveLogs();

        this.timeLogService.fireUpdate();
    }

    saveTimeLog() {
        this.saveLogs();
    }

    closeOpenedTimeLogItem(){
        this._closeLastTimeLogItem((new Date()).toJSON());
        this.saveLogs();
    }

    clearTimeLog(){
        this.timeLogService.update([]);
        this.saveLogs();
    }

    // -- Private

    private saveLogs() {
        this.storage.setItem('logs', JSON.stringify(this.timeLogService.list));
        this.timeLogService.fireUpdate();
    }

    private _closeLastTimeLogItem(date: string) {
        this.timeLogService.list.forEach(i => {
            if(!i.isClosed){
                i.isClosed = true;
                i.dateEnd = date;
            }
        })
    }

    private checkAndUpdateList(res: any){
        if (res && res.logs && Array.isArray(res.logs)) {
            this.timeLogService.update(res.logs as any);
        } else {
            this.err.fire('Parse error: Incompatible format of logs.');
        }
    }



    private showLoading(){
        this.popup = new BusyPopup();
        this.popupService.showPopup(this.popup);
    }

    private hideLoading(): any{
        if(this.popup){
            this.popup.visible = false;
            this.popupService.showPopup(this.popup);
            this.popup = undefined;
        }
    }
}

