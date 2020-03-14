({
    requestDefaultUser : function(component, helper) {
        var userText = component.get("v.userText");
        var action = component.get("c.getDefaultUser");
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            component.set("v.spinner", false);
            
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                var u = response.getReturnValue();
                component.set("v.target", u);
                
                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
                helper.requestUserRecordAccess(component, helper);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        // optionally set storable, abortable, background flag here
        component.set("v.spinner", true);
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    requestUser : function(component, helper) {
        var action = component.get("c.getUser");
        action.setParams({ userId : component.get("v.userId") });

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            component.set("v.spinner", false);
            
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                var u = response.getReturnValue();
                component.set("v.target", u);
                
                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
                helper.requestUserRecordAccess(component, helper);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        // optionally set storable, abortable, background flag here
        component.set("v.spinner", true);
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    requestUsers : function(component, helper) {
        var userText = component.get("v.userText");
        var action  = component.get("c.getUsers");
        action.setParams({ userText : component.get("v.userText") });

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            component.set("v.spinner", false);
            
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                var u = response.getReturnValue();
                var newList = [];
                for (var item of u) {
                    newList.push(item);
                }
                component.set("v.userList", newList);
                
                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
                component.find("user_name").getElement().focus();
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        // optionally set storable, abortable, background flag here
        component.set("v.spinner", true);
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    requestUserRecordAccess : function(component, helper) {
        var action = component.get("c.getUserRecordAccess");
		var user = component.get("v.target");
        action.setParams({ 
            recordId : component.get("v.recordId"),
            userId : user.Id
        });
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            component.set("v.spinner", false);
            
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                var u = response.getReturnValue();
                component.set("v.HasReadAccess", u.HasReadAccess);
                component.set("v.HasEditAccess", u.HasEditAccess);
                component.set("v.HasDeleteAccess", u.HasDeleteAccess);
                component.set("v.HasTransferAccess", u.HasTransferAccess);
                component.set("v.HasAllAccess", u.HasAllAccess);

                component.find("user_name").getElement().value = "";
                component.set("v.userText", "");

                helper.clearUserList(component, helper);
                helper.showUserListState(component, helper);

                
                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        // optionally set storable, abortable, background flag here
        component.set("v.spinner", true);
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);	
    },
    setInputUserText : function(component, helper) {
        var newValue = component.find("user_name").getElement().value;
        component.set("v.userText", newValue);
        return newValue;
    },
    showUserListState :function (component, helper) {
        var userList = component.get("v.userList");
        var isShow = false;
        if (userList.length > 0) {
            isShow = true;
            component.set("v.hideListTimer", false);
        }
        component.set("v.showList", isShow);
	},
    hideUserListState :function (component, helper) {
        if (component.get("v.hideListTimer")) {
            component.set("v.showList", false);
        }
	},
    clearUserList : function (component, helper) {
        component.set("v.userList", []);
    }
})