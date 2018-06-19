({
	getMarketingLines: function(component){
        var action = component.get("c.getMarketLineInfo");
        action.setCallback(this, function(actionResult){
            console.log(JSON.stringify(actionResult));
            component.set("v.marketLineList", actionResult.getReturnValue());
            //this.createMarketOptions(component, action.getReturnValue(), "v.marketLineOptions");
        })
        $A.enqueueAction(action);
    },
    
    getMarketingCategories: function(component){
        var action = component.get("c.getMarketCategoryInfo");
        var marketLine = component.get("v.marketLine");
        console.log("marketLine" + marketLine);
        action.setParams({
            'marketLine': marketLine
        });
        action.setCallback(this, function(actionResult){
            console.log(JSON.stringify(actionResult));
            component.set("v.marketCategoryList", actionResult.getReturnValue());
        })
        $A.enqueueAction(action);
    },
    
    getMarketingFamilies: function(component){
        var action = component.get("c.getMarketFamilyInfo");
        var marketLine = component.get("v.marketLine");
        var marketCategory = component.get("v.marketCategory");
        action.setParams({
            'marketLine': marketLine,
            'marketCategory': marketCategory
        });
        action.setCallback(this, function(actionResult){
            component.set("v.marketFamilyList", actionResult.getReturnValue());
        })
        $A.enqueueAction(action);
    },
    
    getMarketingProducts: function(component){
        var action = component.get("c.getMarketProductInfo");
        var marketLine = component.get("v.marketLine");
        var marketCategory = component.get("v.marketCategory");
        var marketFamily = component.get("v.marketFamily");
        action.setParams({
            'marketLine': marketLine,
            'marketCategory': marketCategory,
            'marketFamily' : marketFamily
        });
        action.setCallback(this, function(actionResult){
            component.set("v.marketProduct", actionResult.getReturnValue());
        })
        $A.enqueueAction(action);
    },
    
    SearchHelper: function(component, event, helper){
        var action = component.get("c.fetchProduct");
        action.setParams({
            'searchKeyword': component.get("v.searchKeyword")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var searchResult = response.getReturnValue();
                
                // if reponse is 0, display no record found message
                if(searchResult.length == 0){
                    component.set("v.Message", true);
                } else {
                    component.set("v.Message", false);
                }
                
                // set searchResult list with return value from server.
                component.set("v.searchResult", response.getReturnValue());
            } else if (state === "INCOMPLETE"){
                alert('Response is Incompleted');
            } else if (state === "ERROR"){
                var errors = response.getError();
                if(errors) {
                    if(errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    } else {
                        alert("Unknown error");
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    mLFilter: function(component, event, helper){
        var action = component.get("c.getMLFilteredTable");
        action.setCallback(this, function(actionResult){
            component.set("v.marketLine", actionResult.getReturnValue());
        })
        $A.enqueueAction(action);
    },
    
    createMarketOptions: function(component, marketOptions, attributeLabel){
        /*var options;
        marketOptions.forEach(function (option){
                              var newOption;
            newOption.label=option.MasterLabel;
            newOption.value=option.value;
            options.push(newOption);
                              });
        component.set(attributeLabel, newOptions);*/
    }
    
})
