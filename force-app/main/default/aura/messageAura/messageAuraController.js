({
    sendHandler : function(component, event, helper) {
        const inputElement = component.find("inputBox");

        if(inputElement) {
            const msg = inputElement.get("v.value");
            const messages = component.get("v.messages");

            messages.push({
                id : messages.length,
                value : msg,
                from : "AURA"
            });

            component.set("v.messages", messages);
            
            // publish from AURA
            const messagePayload = {
                message : msg,
                from : "AURA"
            };

            const msgChannel = component.find("messageChannel");
            msgChannel.publish(messagePayload);

            inputElement.set("v.value", "");
        }
    },

    messageHandler : function(component, event, helper) {

        if(event && event.getParam("message") && event.getParam("from") !== "AURA") {
            const msg = event.getParam("message");
            const messages = component.get("v.messages");

            messages.push({
                id : messages.length,
                value : msg,
                from : "LWC"
            });

            component.set("v.messages", messages);
        }
    }
})
