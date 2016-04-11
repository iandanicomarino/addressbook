//controller
console.log("controller loaded ajax");
var myApp=angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	//processes
	console.log("i got data");

	function refresh(){
		$http.get('/refresh').then(function(res){
			$scope.Persons=res.data;
		});
	};

	$http.get('/refresh').then(function(res){
		$scope.Persons=res.data;
	});

	$scope.add= function ()
	{
		//console.log($scope.Person);
		$http.post('/add',$scope.Person);
		$scope.Person="";
		refresh();
	};

	$scope.del= function(id)
	{
		$http.delete('/delete/'+id).then(function (res){
			refresh();
		});
	};

	$scope.addAddress=function(id){
		console.log(id);
		$scope.message=id;
		$http.post('/find/'+id).then(function(res){
			console.log(res.data);
			var Person=res.data;
			$scope.message="You will be adding address info to "+Person.firstname+" "+Person.middlename+" "+Person.lastname;
			$scope.id=id;
		});
		$scope.Address="";
	};
	$scope.addAddressToPerson=function(id){
		console.log(id)
		$http.post('/addAddressToPerson/'+id,$scope.Address).then(function(res){
			delete $scope.Address;
		});
	}
	$scope.viewAddress= function(id){
		$http.post('/find/'+id).then(function(res){
			console.log(res.data);
			var Person=res.data;
			$scope.message2="You are viewing address info of "+Person.firstname+" "+Person.middlename+" "+Person.lastname;
			$scope.id=id;
		});
		$http.post('/findAddress/'+id).then(function (res){
			console.log(res.data);
			$scope.Address2=res.data;
		});

	}
}]);
