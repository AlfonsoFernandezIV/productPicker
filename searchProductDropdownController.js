({
    doInit: function(component, event, helper) {
        helper.getAllProducts(component);
        component.set('v.tableColumns', [
            {label: 'Market Line', fieldName: 'Market_Line__c', type: 'text'},
            {label: 'Market Category', fieldName: 'Market_Category__c', type: 'text'},
            {label: 'Market Family', fieldName: 'Market_Family__c', type: 'text'},
            {label: 'Product Name', fieldName: 'Name', type: 'text'}
        ]);
        var action = component.get("c.getAllProductInfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state==="SUCCESS"){
                console.log(response.getReturnValue());
                component.set('v.productData', response.getReturnValue());
                var selected_rows = helper.getSomeRows(response.getReturnValue(), 3);
                var selected_rows_mod = ["01t0n000000mpK7AAI", "01t0n000000mpK6AAI", "01t0n000000mpK5AAI"];
                component.set("v.selectedRows",selected_rows_mod);
            }
        });
        $A.enqueueAction(action);
    },
    
    updateSelectedText: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        cmp.set('v.selectedRowsCount', selectedRows.length);
    },
    
    resetRows: function (cmp, event, helper) {
        cmp.set('v.data', []);
        helper.fetchData(cmp, cmp.get('v.initialRows'))
        .then($A.getCallback(function (data) {
            cmp.set('v.data', data);
        }));
    },
    
    loadMoreData: function (cmp, event, helper) {
        var rowsToLoad = cmp.get('v.rowsToLoad'),
            fetchData = cmp.get('v.dataTableSchema'),
            promiseData;
        
        event.getSource().set("v.isLoading", true);
        cmp.set('v.loadMoreStatus', 'Loading');
        
        promiseData = helper.fetchData(cmp, fetchData, rowsToLoad);
        
        promiseData.then($A.getCallback(function (data) {
            if (cmp.get('v.data').length >= cmp.get('v.totalNumberOfRows')) {
                cmp.set('v.enableInfiniteLoading', false);
                cmp.set('v.loadMoreStatus', 'No more data to load');
            } else {
                var currentData = cmp.get('v.data');
                var newData = currentData.concat(data);
                cmp.set('v.data', newData);
                cmp.set('v.loadMoreStatus', '');
            }
            event.getSource().set("v.isLoading", false);
        }));
    },
    
    // Search Bar
    searchKeyChange: function(component, event, helper){
        helper.findByName(component, event);
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({"searchKey": event.target.value});
        myEvent.fire()
    },
    
    // Called by event aura:waiting
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display Spinner
        component.set("v.Spinner", true);
    },
    
    // Called by event aura:doneWaiting
    hideSpinner: function(component, event, helper) {
        component.set("v.Spinner", false);
    }
    
})
