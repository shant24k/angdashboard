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
                return $http.get('mydata.json');
            }
            return dataFactory;
        });
        var controllers = angular.module('controllers', ['factories']);
        controllers.controller('summary', ['$scope', '$routeParams','dataFactory', function ($scope, $routeParams, dataFactory) {
             $scope.summary={};
            dataFactory.getData().then(function(response){
                                           $scope.summary.products = response.data.productDetails;
                                           console.log($scope.productDetails);
                                            $scope.summary.category = response.data.categoryDetails;
                                            $scope.summary.brands = response.data.brandsDetails;
                                           }, function(e){
                                           alert(e);
                                           });
       /* $scope.summary.products = [{ productId:"M000",productType:"Mobile",productName:"OnePlus 3",brand:"OnePlus",price:"30000"},
            { productId:"M001",productType:"Mobile",productName:"iPhone 7",brand:"Apple",price:"60000"},
            { productId:"M002",productType:"Mobile",productName:"iPhone 7+",brand:"Apple",price:"80000"},
            { productId:"M003",productType:"Mobile",productName:"Pixel",brand:"Google",price:"65000"},
            { productId:"T001",productType:"Tablet",productName:"iPad Air2",brand:"Apple",price:"50000"},
            { productId:"T002",productType:"Tablet",productName:"ipadMini 4",brand:"Apple",price:"32000"},
            { productId:"L001",productType:"Laptop",productName:"Macbook Pro",brand:"Apple",price:"110000"},
            { productId:"L002",productType:"Laptop",productName:"Inspiron15R",brand:"Dell",price:"55000"}];

            $scope.summary.category = [{ categoryId:"M000",categoryName:"OnePlus 3"},
            { categoryId:"M001",categoryName:"iPhone 7"},
            { categoryId:"M002",categoryName:"iPhone 7+"},
            { categoryId:"M003",categoryName:"Pixel"},
            { categoryId:"T001",categoryName:"iPad Air2"},
            { categoryId:"T002",categoryName:"ipadMini 4"},
            { categoryId:"L001",categoryName:"Macbook Pro"},
            { categoryId:"L002",categoryName:"Inspiron15R"}];


            $scope.summary.brands = [{ brandName:"OnePlus",brandItem:"Mobile",brandDetails:"OnePlus 3"},
            { brandName:"Apple",brandItem:"Mobile",brandDetails:"iPhone 7"},
            { brandName:"Google",brandItem:"Mobile",brandDetails:"iPhone 7+"},
            { brandName:"Samsung",brandItem:"Mobile",brandDetails:"Pixel"},
            { brandName:"Apple",brandItem:"Tablet",brandDetails:"iPad Air2"}];*/

        }]);
        controllers.controller('purchases', ['$scope', '$routeParams','dataFactory', function ($scope, $routeParams,dataFactory) {
            
            $scope.purchase={};
            dataFactory.getData().then(function(response){
                                           $scope.purchase.recentpurchases = response.data.recentPurchases;
                                           //console.log($scope.productDetails);
                                            
                                           }, function(e){
                                           alert(e);
                                           });
            /*$scope.purchase.recentpurchases = [
            { productId:"M000",price:"30000",details:"#/recentpurchases/0"},
            { productId:"M001",price:"60000",details:"#/recentpurchases/1"},
            { productId:"M002",price:"80000",details:"#/recentpurchases/2"},
            { productId:"M003",price:"65000",details:"#/recentpurchases/3"},
            { productId:"T001",price:"50000",details:"#/recentpurchases/4"},
            { productId:"T002",price:"32000",details:"#/recentpurchases/5"},
            { productId:"L001",price:"110000",details:"#/recentpurchases/6"},
            { productId:"L002",price:"55000",details:"#/recentpurchases/7"}];*/

        }]);
        controllers.controller('purchaseDetails', ['$scope', '$routeParams','dataFactory', function ($scope, $routeParams, dataFactory) {
            console.log($routeParams.detailsID);

            $scope.purchase={};
            $scope.whichDetails = $routeParams.detailsID;
            dataFactory.getData().then(function(response){
                                           $scope.purchase.recentpurchases = response.data.purchaseDetails;
                                           //console.log($scope.productDetails);
                                            
                                           }, function(e){
                                           alert(e);
                                           });
            /*$scope.purchase.recentpurchases = [
            { productId:"M000",price:"30000",details:[{purchaseId:"P0001",productName:"OnePlus3",quantity:"4", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0002",productName:"OnePlus3",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0003",productName:"OnePlus3",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0004",productName:"OnePlus3",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"M001",price:"60000",details:[{purchaseId:"P0005",productName:"iPhone 7",quantity:"4", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0006",productName:"iPhone 7",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0007",productName:"iPhone 7",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0008",productName:"iPhone 7",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"M002",price:"80000",details:[{purchaseId:"P0009",productName:"iPhone 7+",quantity:"4", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0010",productName:"iPhone 7+",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0011",productName:"iPhone 7+",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0012",productName:"iPhone 7+",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"M003",price:"65000",details:[{purchaseId:"P0013",productName:"Pixel",quantity:"1", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0014",productName:"Pixel",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0015",productName:"Pixel",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0016",productName:"Pixel",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"T001",price:"50000",details:[{purchaseId:"P0017",productName:"iPad Air2",quantity:"1", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0018",productName:"iPad Air2",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0019",productName:"iPad Air2",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0020",productName:"iPad Air2",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"T002",price:"32000",details:[{purchaseId:"P0021",productName:"ipadMini 4",quantity:"4", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0022",productName:"ipadMini 4",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0023",productName:"ipadMini 4",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0024",productName:"ipadMini 4",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"L001",price:"110000",details:[{purchaseId:"P0025",productName:"Macbook Pro",quantity:"4", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0026",productName:"Macbook Pro",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0027",productName:"Macbook Pro",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0028",productName:"Macbook Pro",quantity:"1", buyerName:"abc4",price:"30000"}]},
            { productId:"L002",price:"55000",details:[{purchaseId:"P0029",productName:"Inspiron15R",quantity:"4", buyerName:"abc1",price:"120000"},
                                                {purchaseId:"P0030",productName:"Inspiron15R",quantity:"1", buyerName:"abc2",price:"30000"},
                                                {purchaseId:"P0031",productName:"Inspiron15R",quantity:"2", buyerName:"abc3",price:"60000"},
                                                {purchaseId:"P0032",productName:"Inspiron15R",quantity:"1", buyerName:"abc4",price:"30000"}]}];*/

        }]);
