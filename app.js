var app = angular.module('myApp', ['controllers', 'ngRoute','factories']);
        app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/pms/:box', {
                controller: 'pmBox',
                templateUrl: 'pmBox.html'
            }).when('/summaryproducts', {
                controller: 'summary',
                templateUrl: 'views/summaryproducts.html'
            }).when('/summarycategory', {
                controller: 'summary',
                templateUrl: 'views/summarycategory.html'
            }).when('/summarybrands', {
                controller: 'summary',
                templateUrl: 'views/summarybrands.html'
            }).when('/recentpurchases', {
                controller: 'purchases',
                templateUrl: 'views/recentpurchases.html'
            }).when('/purchasenew', {
                controller: 'purchaseDetails',
                templateUrl: 'views/purchaseForm.html'
            }).when('/recentpurchases/:detailsID', {
                controller: 'purchaseDetails',
                templateUrl: 'views/purchasedetails.html'
            }).otherwise({
                redirectTo: '/summaryproducts'
            });
        }]);
        var factories = angular.module('factories', []);
        factories.factory('dataFactory',function($http){
            var dataFactory={};
            dataFactory.getData = function(){
                return $http.get('http://localhost:3000/db');
            }
            dataFactory.postData = function(data){
                var url = 'http://localhost:3000/purchaseDetails';
                return $http.post(url,data);
            }
            return dataFactory;
        });
        var controllers = angular.module('controllers', ['factories']);
        controllers.controller('summary', ['$scope', '$routeParams','dataFactory', function ($scope, $routeParams, dataFactory) {
             $scope.summary={};
            dataFactory.getData().then(function(response){
                                           $scope.summary.products = response.data.productDetails;
                                          
                                            $scope.summary.category = response.data.categoryDetails;
                                            $scope.summary.brands = response.data.brandsDetails;
                                           }, function(e){
                                           console.log(e);
                                           });
       

        }]);
        controllers.controller('purchases', ['$scope', '$routeParams','dataFactory', function ($scope, $routeParams,dataFactory) {
            
            $scope.purchase={};
            dataFactory.getData().then(function(response){
                                           $scope.purchase.recentpurchases = response.data.recentPurchases;
                                          
                                           }, function(e){
                                            console.log(e);
                                           });
            

        }]);
        controllers.controller('purchaseDetails', ['$scope', '$routeParams','dataFactory', function ($scope, $routeParams, dataFactory) {
            console.log($routeParams.detailsID);
            $scope.newPurchase = {purchaseId:null,productName:null,quantity:null,buyerName:null};
            $scope.purchase={};
            $scope.whichDetails = $routeParams.detailsID;
            dataFactory.getData().then(function(response){
                                           $scope.purchase.recentpurchases = response.data.purchaseDetails;
                                           
                                           }, function(e){
                                            console.log(e);
                                           });
            $scope.purchasePriceDetails = function(){
                var purchaseDetails = $scope.purchase.recentpurchases;
                for(var i=0;i<purchaseDetails.length-1;i++){
                    if(purchaseDetails[i].productName == $scope.newPurchase.productName){
                        console.log(purchaseDetails[i].productId);
                        $scope.newPurchase.price = $scope.newPurchase.quantity * purchaseDetails[i].price;
                        console.log($scope.newPurchase.price);
                    }
                }
            }
            $scope.submit = function(){
                var purchaseDetails = $scope.purchase.recentpurchases;
                for(var i=0;i<purchaseDetails.length-1;i++){
                    if(purchaseDetails[i].productName == $scope.newPurchase.productName){
                        purchaseDetails[i].details.push($scope.newPurchase)
                        console.log(purchaseDetails[i].details);

                    }
                }

                var newdata = purchaseDetails;
                dataFactory.postData(newdata).then(function(response){
                                           $scope.successPost = response;
                                          console.log($scope.successPost);
                                           }, function(e){
                                            console.log(e);
                                           });
            }

        }]);
