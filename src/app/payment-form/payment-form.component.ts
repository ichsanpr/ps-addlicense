import { Component, OnInit } from '@angular/core';
//import { CookieService } from 'angular2-cookie/core';
import { CookieService } from 'angular2-cookie/services/cookies.service'; 
import { checkOut } from '../checkout.model';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  model = new checkOut('', '', '', '', '','','basic',0,120,'',0,0,0,0,0,'','','');
  packageType = 'basic';  
  
  //constructor(public _cookieService:CookieService) { }
  constructor() { }

 /* getClientRequestHeaders() { 
		var a = "Bearer" + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
		return {
			"Authorization": a,
			"X-JavaScript-User-Agent": "Google APIs Explorer"
		};
	}
 */
	
  ngOnInit() {}
  
  get currentPayment() { 
	//var modelpayment = this.model;
	/*var modelpayment = 
	 {
		 'domain':this.model.domain,
		 'company':this.model.company,
		 'requesterName':this.model.requesterName,
		 'requesterMail':this.model.requesterMail,
		 'phone':this.model.phone,
		 'country':this.model.country,
		 'packageType':this.model.packageType,
		 'license':this.model.license,
		 'vault':this.model.vault,
		 'renewal':this.model.renewal,
		 'remmonth':remmonth
	 }
	 */
	
	//{"domain":"","company":"","requesterName":"","requesterMail":"","phone":"","country":"","packageType":"","license":0,"vault":"","renewal":"8","remmonth":""}
	//return JSON.stringify(modelpayment);

	//let modelpayment = JSON.parse(localStorage.getItem('modelpayment'));
	//return modelpayment;	
	
	//var remmonth = this.model.renewal*2;
	//var datez = Date.now(); // format in number
	var datez = new Date(); // format date
	//var remmonth =  new Date().format('MM/DD/YYYY');
	//var remmonth =  $filter('date')(datez, 'yyyy-MM-dd'); 
	//var remmonth = $filter('date')(Date.now(), date || 'yyyy-MM-dd');
	
	//calculate license & calculate vault
	if (this.model.packageType == 'business') { var proratedef = 120; } 
	else { var proratedef = 50; }
	
	var monthnow = datez.getMonth() + 1;
	//var licmonth = this.model.renewal;

	if(this.model.enablevault == "No") { var vaultRes = 0; }
	else { var vaultRes = this.model.vault; }

	if (this.model.renewal == "January") { var licmonth = 1; }
	else if (this.model.renewal == "February") { var licmonth = 2; }
	else if (this.model.renewal == "March") { var licmonth = 3; }
	else if (this.model.renewal == "April") { var licmonth = 4; }
	else if (this.model.renewal == "May") { var licmonth = 5; }
	else if (this.model.renewal == "June") { var licmonth = 6; }
	else if (this.model.renewal == "July") { var licmonth = 7; }
	else if (this.model.renewal == "August") { var licmonth = 8; }
	else if (this.model.renewal == "September") { var licmonth = 9; }
	else if (this.model.renewal == "October") { var licmonth = 10; }
	else if (this.model.renewal == "November") { var licmonth = 11; }
	else if (this.model.renewal == "December") { var licmonth = 12; }
	else { var licmonth = 0; }
	
	if (licmonth == monthnow) { var remmonth = 12; }
	else if (licmonth > monthnow) { var remmonth = licmonth - monthnow; }
	else if (licmonth < monthnow) { var remmonth = (licmonth+12)- monthnow; }
		
	var prorate = (proratedef/12) * remmonth;
	
	var licensevalRp = this.model.licenseval * prorate;
	var vaulttotal = vaultRes * prorate;
	
	//calculate tax
	
	if (this.model.country=="Singapore") {
		var tax = ((licensevalRp + vaulttotal)*0.07);
	} else { 
		var tax = 0;
	}

	// calculate grand total
	var grandtotal = (licensevalRp + vaulttotal + tax);
	//this._cookieService.put('cookieValue', 'dededede');
	/*
	if (this.model.renewal == 1) { var renewalval = "January"; }
	else if (this.model.renewal == 2) { var renewalval = "February"; }
	else if (this.model.renewal == 3) { var renewalval = "March"; }
	else if (this.model.renewal == 4) { var renewalval = "April"; }
	else if (this.model.renewal == 5) { var renewalval = "May"; }
	else if (this.model.renewal == 6) { var renewalval = "June"; }
	else if (this.model.renewal == 7) { var renewalval = "July"; }
	else if (this.model.renewal == 8) { var renewalval = "August"; }
	else if (this.model.renewal == 9) { var renewalval = "September"; }
	else if (this.model.renewal == 10) { var renewalval = "October"; }
	else if (this.model.renewal == 11) { var renewalval = "November"; }
	else if (this.model.renewal == 12) { var renewalval = "December"; }
	else { var renewalval = "none"; }
	*/
	var renewalval = licmonth;
	var model = new checkOut(
		this.model.domain, 
		this.model.company, 
		this.model.rName, 
		this.model.rEmail, 
		this.model.rPhone,
		this.model.country,
		this.model.packageType,
		this.model.licenseval,
		vaultRes,
		this.model.renewal,
		licensevalRp,
		vaulttotal,
		tax,
		grandtotal,
		renewalval,
		//remmonth,
		this.model.methodpayment,
		this.model.enablevault,
		this.model.isActive
	);
	return model;
  }

 
}
