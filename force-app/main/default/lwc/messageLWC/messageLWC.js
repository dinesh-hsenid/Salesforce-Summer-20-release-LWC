import { LightningElement, track, wire } from 'lwc';
import messageDemo from '@salesforce/messageChannel/messageDemo__c';
import { APPLICATION_SCOPE, MessageContext, publish, subscribe, unsubscribe } from 'lightning/messageService';
import hasSendPermission from '@salesforce/customPermission/Send_Message';

export default class MessageLWC extends LightningElement {
    @track messages = [];

    @wire(MessageContext) msgContext;

    subscription = null;

    connectedCallback() {
        if(!this.subscription) {
            this.subscription = subscribe(
                this.msgContext, 
                messageDemo, 
                msg => {
                this.messageHandler(msg)
                },
                { scope : APPLICATION_SCOPE } 
            );
        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    sendHandler() {
        const inputElement = this.template.querySelector('lightning-input');

        if(inputElement) {
            const msg = inputElement.value;
            
            this.messages.push({
                id : this.messages.length,
                value : msg,
                from : "LWC"
            });

            // publish message
            const messagePayload = {
                message : msg,
                from : "LWC"
            };

            publish(this.msgContext, messageDemo, messagePayload);

            inputElement.value = "";
        }
    }

    messageHandler(msgPayload) {

        if(msgPayload && msgPayload.from !== "LWC") {
            this.messages.push({
                id : this.messages.length,
                value : msgPayload.message,
                from : msgPayload.from
            });
        }
    }

    get disableSendButton() {
        return !hasSendPermission;
    }
}

















