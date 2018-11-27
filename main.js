var API = 'http://api.openweathermap.org/data/2.5/forecast?units=metric'
var KEY = '&APPID=7572c54d80ae94467226b093d5596a4d'
var mapApi = "https://maps.googleapis.com/maps/api/geocode/json?"
var mapKey = "&key=AIzaSyBR_cdd4nKZ0XNZW9uIFRDpP4Rc0XB27Aw"


var app = new Vue({
	el: '#weather',
	data: {
		weatherLi: [],
		location: '',
		city: '',
		country: '',
		time: ''
		
	},

	methods: {
		getWeather: function (url) {
			fetch(url, {
					method: "GET",
				})
				.then(function (response) {
					return response.json()
				})
				.then(function (json) {
					app.weatherLi = json.list;

				})
				.catch(function (error) {
					console.log(error)
				});
		},
		getCityName: function (url) {
			fetch(url, {
					method: "GET",
				})
				.then(function (response) {
					return response.json()
				})
				.then(function (json) {
					app.location = json.results[0];
					app.city = app.location.address_components[3].short_name + ', ';
					app.country = app.location.address_components[6].short_name;
				})
				.catch(function (error) {
					console.log(error)
				});
		},
		geolocation: function () {
			navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
		},
		buildUrl: function (position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			this.getWeather(API + '&lat=' + lat + '&lon=' + lon + KEY);
			this.getCityName(mapApi + 'latlng=' + lat + ',' + lon + mapKey);
		},
		geoError: function (error) {
			this.getWeather(API + '&lat=37.532600&lon=127.024612' + KEY);
//			alert('Unable to retrieve your location');
//			app.city = 'Seoul, ';
//			app.country = 'Kr';
//			document.getElementById("time").style.display("block");
		}	
	},
	beforeMount: function () {
		this.geolocation();
	}
});
