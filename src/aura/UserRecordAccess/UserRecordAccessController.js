({
	onInit : function(component, event, helper) {
		helper.requestDefaultUser(component, helper);
	},
    onSearchClick : function(component, event, helper) {
        var newValue = helper.setInputUserText(component, helper);
        if (newValue) {
			helper.requestUsers(component, helper);
        } else {
            helper.clearUserList(component, helper);
            helper.showUserListState(component, helper);
        }
	},
    onBlur : function(component, event, helper) {
        component.set("v.hideListTimer", true);
        window.setTimeout(
            $A.getCallback(function() {
                helper.hideUserListState(component, helper);
            }), 1000
        );
	},
    onFocus : function(component, event, helper) {
		helper.showUserListState(component, helper);
	},
    onMouseLeave  : function(component, event, helper) {
        component.set("v.hideListTimer", true);
        window.setTimeout(
            $A.getCallback(function() {
                helper.hideUserListState(component, helper);
            }), 1000
        );
	},
    onMouseEnter : function(component, event, helper) {
		helper.showUserListState(component, helper);
	},
    onChange : function(component, event, helper) {
        var newValue = helper.setInputUserText(component, helper);
        if (newValue) {
			helper.requestUsers(component, helper);
        } else {
            helper.clearUserList(component, helper);
            helper.showUserListState(component, helper);
        }
	},
    onChangeUserList : function(component, event, helper) {
        var element = component.find("user-combobox");
        if (component.get("v.showList")) {
	        $A.util.addClass(element, 'slds-is-open');
        } else {
	        $A.util.removeClass(element, 'slds-is-open');
		}
    },
    onClickUser: function(component, event, helper) {
        var uid = event.target.dataset["uid"];
        component.set("v.userId", uid);
        helper.requestUser(component, helper);
    }
})