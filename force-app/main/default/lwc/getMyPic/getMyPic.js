import { api, LightningElement } from 'lwc';

export default class GetMyPic extends LightningElement {
    @api recordId;

    get pictureUrl() {
        return `https://i.pravatar.cc/300?u=${this.recordId}`;
    }
}