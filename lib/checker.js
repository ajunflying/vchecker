/**
 * Created by junpinp on 15-9-24.
 */
module.exports = Checker;

function Checker(data){
	if (!data) {
		console.log("check data is empty");
		return;
	}
	this.error = null;
	this.data = data;
};

Checker.prototype.returnError = function(key, value, info){
	this.error = new Error("param error " + "[" + key + "=" + value + "]" + (info || ""));
};

/*必选参数，且不能为空或0*/
Checker.prototype.requireExist = function(key){
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], "必选参数，任意类型，且不能为空或零");
	}
	var flag = function (value) {
		return value && value !== undefined && value !== "" && value !== "0";
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], "必选参数，任意类型，且不能为空或零");
	}
};

/*必选参数，必须是一个ObjectId 24位的字符串*/
Checker.prototype.requireObjectId = function(key){
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], "必选择参数，必须是一个ObjectId，且不可为空");
	}
	var flag = function (value) {
		var reg = /^[0-9a-z]{24}$/i;
		return value && typeof(value) === "string" && reg.test(value);
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], "必选择参数，必须是一个ObjectId，且不可为空");
	}
};

/*必选字符串参数*/
Checker.prototype.requireString = function(key){
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], "必选参数，必须是一个String，且不可为空");
	}
	var flag = function (value) {
		return value && typeof(value) === "string";
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], "必选参数，必须是一个String，且不可为空");
	}
};

/*可选字符串参数*/
Checker.prototype.optionalString = function (key, dv) {
	var self = this;
	var flag = function (value) {
		return typeof(value) === "string";
	};
	if (self.data.hasOwnProperty(key) && !flag(self.data[key])) {
		return self.returnError(key, self.data[key], "可选参数，String，可为空");
	}
	if (flag(dv)) {
		self.data[key] = dv;
	}
};

/*必选数值参数*/
Checker.prototype.requireNumber = function (key) {
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], "必选参数，必须是一个Number");
	}
	var flag = function (value) {
		return typeof(value) === "number";
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], "必选参数，必须是一个Number");
	}
	self.data[key] = Number(self.data[key]);
};

/*可选数值参数*/
Checker.prototype.optionalNumber = function (key, dv) {
	var self = this;
	var flag = function (value) {
		return typeof(value) === "number";
	};
	if (self.data.hasOwnProperty(key) && !flag(self.data[key])) {
		return self.returnError(key, self.data[key], "可选参数，Number");
	}
	if (flag(dv)) {
		self.data[key] = dv;
	}
	self.data[key] = Number(self.data[key]);
};

/*必选整数参数*/
Checker.prototype.requireInt = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, self.data[key], "必选参数，必须是一个Int");
	}
	var flag = function (value) {
		var _val = parseInt(value);
		if (isNaN(value) || _val.toString() != _val) {
			return false;
		}
		return true;
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], "必选参数，必须是一个Int");
	}
	self.data[key] = parseInt(self.data[key]);
};

/*可选整数参数*/
Checker.prototype.optionalInt = function (key, dv) {
	var self = this;
	var flag = function (value) {
		var _val = parseInt(value);
		if (isNaN(value) || _val.toString() != _val) {
			return false;
		}
		return true;
	};
	if (self.data.hasOwnProperty(key) && !flag(self.data[key])) {
		return self.returnError(key, self.data[key], "可选参数，Int");
	}
	if (flag(dv)) {
		self.data[key] = dv;
	}
	self.data[key] = parseInt(self.data[key]);
};

/*必选的数组*/
Checker.prototype.requireArray = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, "", "必选参数，必须是一个Array");
	}
	if (self.data[key].constructor != Array) {
		return self.returnError(key, self.data[key], "必选参数，必须是一个Array");
	}
};

/*必选的对象，主要是JSON判断*/
Checker.prototype.requireJsonObject = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, "", "必选参数，必须是一个JSON");
	}
	try {
		var _value = JSON.parse(self.data[key]);
		if (self.data[key].constructor != Object) {
			return self.returnError(key, JSON.stringify(self.data[key]), "必选参数，必须是一个JSON");
		}
		self.data[key] = _value;
	} catch (e) {
		return self.returnError(key, JSON.stringify(self.data[key]), "必选参数，必须是一个JSON");
	}
};

/*必选日期*/
Checker.prototype.requireDate = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, "", "必选参数，必须是一个Date");
	}
	if (!isNaN(self.data[key])) {
		self.data[key] = parseInt(self.data[key]);
	}
	var time = new Date(self.data[key]);
	if (time == "Invalid Date") {
		return self.returnError(key, JSON.stringify(self.data[key]), "必选参数，必须是一个Date");
	}
	self.data[key] = time;
};

/*必选bool*/
Checker.prototype.requireBoolean = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, JSON.stringify(self.data[key]), "必选参数，必须是一个Bool");
	}
	if ((self.data[key] != "true" || self.data[key] != "false")) {
		return self.returnError(key, JSON.stringify(self.data[key]), "必选参数，必须是一个Bool");
	}
	self.data[key] = self.data[key] == "true" ? true : false;
};
