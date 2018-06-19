({
    doInit: function(component, event, helper) {
        component.set('v.marketLineTableColumns',[
            {label: 'Market Line', fieldName: 'MasterLabel', type: 'text'}
        ]);
        
        component.set('v.marketCategoryTableColumns',[
            {label: 'Market Category', fieldName: 'MasterLabel', type: 'text'}
        ]);
        
        component.set('v.marketFamilyTableColumns',[
            {label: 'MarketFamily', fieldName: 'MasterLabel', type: 'text'}
        ]);
        
        component.set('v.marketProductTableColumns',[
            {label: 'MarketProduct', fieldName: 'Name', type: 'text'}
        ]);
        
        helper.getMarketingLines(component);
        helper.getMarketingCategories(component);
        helper.getMarketingFamilies(component);
        helper.getMarketingProducts(component);
    },
        
    // Search Bar
    Search: function(component, event, helper) {
        var searchField = component.find('v.searchKeyword');
        // if value is missing show error message and focus on field
            helper.SearchHelper(component, event, helper);
    },
    
    // Called by event aura:waiting
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display Spinner
        component.set("v.Spinner", true);
    },
    
    // Called by event aura:doneWaiting
    hideSpinner: function(component, event, helper) {
        component.set("v.Spinner", false);
    },
    
    marketingLineSelected: function(component, event, helper){
    	var marketingLine = event.getParam('name');
        component.set("v.marketLine", marketingLine);
        component.set("v.marketCategory", null);
        component.set("v.marketFamily", null);
        
        console.log("marketingLine" + marketingLine);
        helper.getMarketingCategories(component);
        helper.getMarketingFamilies(component);
        helper.getMarketingProducts(component);
	},
    
    marketingCategorySelected: function(component, event, helper){
    	var marketingCategory = event.getParam('name');
        component.set("v.marketCategory", marketingCategory);
        component.set("v.marketFamily", null);
        
        console.log("marketCategory" + marketingCategory);
        helper.getMarketingFamilies(component);
        helper.getMarketingProducts(component);
	},
    
    marketingFamilySelected: function(component, event, helper){
    	var marketingFamily = event.getParam('name');
        component.set("v.marketFamily", marketingFamily);
        console.log("marketFamily" + marketingFamily);
        helper.getMarketingProducts(component);
	}
})
