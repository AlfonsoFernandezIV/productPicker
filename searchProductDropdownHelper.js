({
    getAllProducts: function(component) {
        var action = component.get("c.getAllProductInfo");
        action.setCallback(this, function(actionResult){
           component.set("v.productData", actionResult.getReturnValue());
           component.set("v.productsLength", actionResult.getReturnValue().length);
        });
        $A.enqueueAction(action);
    },
    
    getSomeRows : function(objs, cnt) {
        var selected_records = [];
        
        for(var i=0; i<cnt; i++){
            selected_records.push(objs[i].Id)
        }
        
        return selected_records;
    },
    
    findByName: function(component, event, helper){
        var searchKey = event.getParam("searchKey");
        var prodList = component.get("v.productData");
        var action = component.get("c.findByName");
        action.setParams({
            "searchKey": searchKey,
            "prodList": prodList
        });
        action.setCallback(this, function(a) {
            component.set("v.productData", a.getReturnValue());
            component.set("v.productLength", a.getReturnValue().length);
        });
        $A.enqueueAction(action);
    }
})
