import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentFormComponent } from './payment-form/payment-form.component';
//import { CookieService } from 'angular2-cookie/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
//import { checkOutResult } from './checkout.model';
//import 'gmail-send';
import * as nodemailer from 'nodemailer';
import * as $ from 'jquery';
import * as xoauth2 from 'nodemailer/lib/xoauth2';
//import * as aws from 'aws-sdk';
//import { SES } from 'aws-sdk'
//import { AwsConfig } from '../../../awsConfig';

/// <reference path="../../node_modules/@types/gapi/index.d.ts" />
declare var gapi: any;
//import { AuthService, AppGlobals } from 'angular2-google-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //items = ['First', 'Second', 'Third'];
  //constructor(public cookieService:CookieService,private location: Location){}
  constructor(private location: Location){}

  public ngOnInit(){
	  
	/*
	this._cookieService.put('cookieValue', 'dededede');
	alert("Cookies1:"+this._cookieService.get('cookieValue'));
	this._cookieService.removeAll();
	alert("Cookies2:"+this._cookieService.get('cookieValue'));
	if(this._cookieService.get('cookieValue') == undefined) {
		alert("Cookies removed");
	} else {
		alert("result cookies");
	}
	*/
	// Script Javascript
	//var locPathURL =  location.protocol + "//" + document.domain + "/" + location.pathname.split('/')[1] + "/";
	//alert("Cookies1:"+document.cookie);	
	
	
	var locPathURL =  this.location.path();
	var locPathURL =  locPathURL.replace("/", "");
	
	/*
	if (locPathURL == 'licencesuccess') { 
		//alert("Cookies-visitval:"+this.cookieService.get('visitval'));
		if(this.cookieService.get('visitval') == undefined) {

			//alert("Cookies-licencesuccess:"+this.cookieService.get('totalValue'));
			var cookiesGTotal = this.cookieService.get('totalValue');
			var cookiesDomainName = this.cookieService.get('domainValue');
			
		} else {
			this.cookieService.removeAll();
		}
	} else {
		this.cookieService.removeAll();
	}   
	*/
	//------------------------
	//if(this.cookieService.get('totalValue') == undefined) {
	if (locPathURL == 'licencesuccess') { 
	
		//alert("Total Value defined:"+this.cookieService.get('totalValue'));
		//this.cookieService.put('visitval', '1');
		//alert(document.cookie);
		$(document).ready(function(){

			if (document.cookie == '') {
				var pageDefault = "yes";
			} else {
				var pageDefault = "no";
				$('.conf-wrapper').show();
				$('.conf-wrapper1').show(); 		
				$('.form-wrapper').hide();
				$('.checkout-wrapper').hide();

				
				//alert("Cookies - addcreate:"+document.cookie);
				document.cookie = "visitval=1"; 	
				var cookies = document.cookie.split(";");
				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";						
				}
				//this.cookieService.removeAll();
			}
		});
		//this.cookieService.removeAll();

	} else { 
		var pageDefault = "yes";
	}

	//------------------------
	if(pageDefault == 'yes') {
		//alert("Total Value undefined");

		$(document).ready(function(){
		$('#submit-btn').click(function(){
			$('.conf-wrapper').fadeOut(500);
			$('.form-wrapper').fadeOut(500);
			$('.checkout-wrapper').fadeIn(1000);
		});
		
		});
		
		$(document).ready(function(){
		$('#submit-btn-conf').click(function(){
			$('.checkout-wrapper').fadeOut(500);
			$('.conf-wrapper').fadeIn(1000);
			
			// PUT GAPI HERE
			
			// INITIALIATION 	
			var API_KEY = 'AIzaSyBXNTSufSeswp-M04UhRsI_820InW7oCP0'; // New
			var DISCOVERY_DOCS = ["https://people.googleapis.com/$discovery/rest?version=v1"];
			var CLIENT_ID = '796582515715-ea41lhg60iuctm89fj1f2dkg7vku25u7.apps.googleusercontent.com' //New
			var SCOPES = ['https://mail.google.com/'
						,'https://www.googleapis.com/auth/gmail.send'
						,'https://www.googleapis.com/auth/gmail.modify'
						,'https://www.googleapis.com/auth/gmail.labels'
						,'https://www.googleapis.com/auth/gmail.readonly'
						,'https://www.googleapis.com/auth/plus.login'
						,'https://www.googleapis.com/auth/userinfo.profile'
						,'https://www.googleapis.com/auth/userinfo.email'
						,'https://www.googleapis.com/auth/plus.me'
						
						//,'https://www.googleapis.com/auth/gmail.compose'
						//,'https://www.googleapis.com/auth/gmail.insert'
						//,'https://www.googleapis.com/auth/gmail.metadata'
						//,'https://www.googleapis.com/auth/gmail.settings.basic'
						//,'https://www.googleapis.com/auth/gmail.settings.sharing'
						];
			


			try{
				
				gapi.load('auth2', () => {
					//gapi.client.load('gmail', 'v1', () => {
						gapi.auth2.init({
							//apiKey: API_KEY,
							discoveryDocs: DISCOVERY_DOCS,
							client_id: CLIENT_ID,
							scope: SCOPES 				
						});
						/*.then(function() {
							//var aaz = confirm("onerror :" + error); // Object not defined
							gapi.auth2.getAuthInstance().isSignedIn.get();
							});*/
					//});
				});
					
			}  catch(Error) { 
				alert(Error.message);
				}
			
			// Setting Variable, Calculate Grand Total, and sending eMail
			if ($('input:radio[name="methodpayment"]')[0].checked == true){ 
				var method = "Credit Card / Paypal"; 
				var methodmessage = "PayPal (the above amount has to reach our PayPal account within 24 hours, failing which this order might be delayed or cancelled)";
			}
			else { 
				var method = "Send us a Cheque"; 
				var methodmessage = "Cheque (the cheque has to reach our office within 72 hours, failing which this order might be delayed or cancelled)";
			}
			var domainname = $('input:text[name="domain"]').val();
			var companyname = $('input:text[name="company"]').val();
			
			var contactname = $('input:text[name="rName"]').val();
			var contactemail = $('input:text[name="rEmail"]').val();
			var contactphone = $('input:text[name="rPhone"]').val();

			var country = $('select[name="country"]').val();
			var licenseval = $('input:text[name="licenseval"]').val();
			//var licenseval = $('select[name="licenseval"]').val();
			//var licenseval = $('input[type=number][licenseval]').val();
			

			var licmonthval = $('select[name="renewal"]').val();
			if (licmonthval == "January") { var licmonth = 1; }
			else if (licmonthval == "February") { var licmonth = 2; }
			else if (licmonthval == "March") { var licmonth = 3; }
			else if (licmonthval == "April") { var licmonth = 4; }
			else if (licmonthval == "May") { var licmonth = 5; }
			else if (licmonthval == "June") { var licmonth = 6; }
			else if (licmonthval == "July") { var licmonth = 7; }
			else if (licmonthval == "August") { var licmonth = 8; }
			else if (licmonthval == "September") { var licmonth = 9; }
			else if (licmonthval == "October") { var licmonth = 10; }
			else if (licmonthval == "November") { var licmonth = 11; }
			else if (licmonthval == "December") { var licmonth = 12; }
			else { var licmonth = 0; }

			//var vault = $('select[name="vault"]').val();
			var vault = $('input:text[name="vault"]').val();
			if ($('select[name="enablevault"]').val() == "No"){  
				var vault = 0;
			} else { 
				var vault = $('input:text[name="vault"]').val(); 
			}


			if ($('input:radio[name="packageType"]')[1].checked == true){
				var packagetype = 'business';
			} else { var packagetype = 'basic';	}
			
			
			//var grandtotal = $('input[name="grandtotal"]:hidden').val();
			
			var datez = new Date(); // format date
			var monthnow = datez.getMonth() + 1;

			//calculate license & calculate vault
			if (packagetype == 'business') { var proratedef = 120; } 
			else { var proratedef = 50; }


			if (licmonth == monthnow) { var remmonth = 12; }
			else if (licmonth > monthnow) { var remmonth = licmonth - monthnow; }
			else if (licmonth < monthnow) { var remmonth = (licmonth+12)- monthnow; }
				
			var prorate = (proratedef/12) * remmonth;
			
			var licensevalRp = licenseval * prorate;
			var vaulttotal = vault * prorate;

			//calculate tax
			if (country=="Singapore") {
				var tax = ((licensevalRp + vaulttotal)*0.07);
			} else { 
				var tax = 0;
			}

			// calculate grand total
			var gTotal  = (licensevalRp + vaulttotal + tax);
			var grandtotal = new Intl.NumberFormat('en-IN').format(gTotal)

			/*var outputVal = "";
			var outputVal = outputVal+ "licmonth :"+licmonth+'<br>';
			var outputVal = outputVal+ "licenseval :"+licenseval+'<br>';
			var outputVal = outputVal+ "proratedef :"+proratedef+'<br>';
			var outputVal = outputVal+ "prorate :"+prorate+'<br>';
			var outputVal = outputVal+ "licensevalRp :"+licensevalRp+'<br>';
			var outputVal = outputVal+ "VaultTotal :"+vaulttotal+'<br>';
			var outputVal = outputVal+ "Tax :"+tax+'<br>';
			var outputVal = outputVal+ "grandtotal :"+grandtotal+'<br>';
			var outputVal = outputVal+ "remmonth :"+remmonth+'<br>';
			document.write(outputVal);
			*/
			// MESSAGE SENDING FOR ADMIN
			//var to_admin_email = "salesdept@point-star.net,admin@point-star.net";
			//var from_admin_email = "sales@point-star.net";
			//var repplyto_admin_email = "sales@point-star.net";
			
			var to_admin_email = "melia@point-star.com";
			var from_admin_email = "melia@point-star.com";
			var repplyto_admin_email = "melia@point-star.com";
			var subject_admin_email = "[New Order: Licences Only] " + domainname + " | " + licenseval + " GAL | USD " + grandtotal;
			
			var body_admin_email = "";
			var body_admin_email = body_admin_email + "New PointStar Google Apps Unlimited Licence order:<br/><br/>";
			var body_admin_email = body_admin_email + "Domain Name: "+domainname+"<br/><br/>Company Name: "+companyname+"<br/><br/>";
			var body_admin_email = body_admin_email + "Total Google Apps Licences: "+licenseval+" (provision licences only, no setup needed)<br/><br/>";
			var body_admin_email = body_admin_email + "Total Sale Amount: USD "+grandtotal+"<br/>";
			var body_admin_email = body_admin_email + "Method of Payment: "+method+" (verify if payment has been received before proceeding)<br/>";
			var body_admin_email = body_admin_email + "Country of Business: "+country+"<br/>";
			var body_admin_email = body_admin_email + "Customer Name: "+contactname+"<br/>";
			var body_admin_email = body_admin_email + "Customer Email: "+contactemail+"<br/>";
			var body_admin_email = body_admin_email + "Customer Phone: "+contactphone+"<br/><br/>";
			
			// -----------------------------------------------------------------------------
			// -------- Start - DISINI DI PASANG SCRIPT UNTUK SENDING EMAIL KE ADMIN -------
			// -----------------------------------------------------------------------------
			var content     = body_admin_email;
		
			// I have an email account on GMail.  Lets call it 'theSenderEmail@gmail.com'
			var sender      = from_admin_email;
			// And an email account on Hotmail.  Lets call it 'theReceiverEmail@gmail.com'\
			// Note: I tried several 'receiver' email accounts, including one on GMail.  None received the email.
			var receiver    = to_admin_email;
			var to          = 'To: '   +receiver;
			var from        = 'From: ' +sender;
			var subject     = 'Subject: ' + subject_admin_email;
			
			var contentType = 'Content-Type: text/plain; charset=utf-8';
			var mime        = 'MIME-Version: 1.0';
			
			var message = "";
			message +=   to             +"\r\n";
			message +=   from           +"\r\n";
			message +=   subject        +"\r\n";
			message +=   contentType    +"\r\n";
			message +=   mime           +"\r\n";
			message +=    "\r\n"        + content;


			//var headers = getClientRequestHeaders();
			try {
			var headers = "Authorization : Bearer " + gapi.auth.getToken().access_token;
			// //var path = "gmail/v1/users/me/messages/send?key=" + CLIENT_ID;
			var path = "https://www.googleapis.com/gmail/v1/users/me/messages/send?key=" + CLIENT_ID;
			var base64EncodedEmail = btoa(message).replace(/\+/g, '-').replace(/\//g, '_');
			}  catch(Error) { 
				alert(Error.message);
				}
			
				
			try { 
				//gapi.auth2.getAuthInstance().signIn().then(
				/* START ------ */
					gapi.client.request({
						path: path,
						method: "POST",
						headers: headers,
						body: {
							'raw': base64EncodedEmail
						}
					}).execute(function (response) {						
						alert(response);
						//var aa = confirm("result : " + response + "\n\r" + base64EncodedEmail);
						var aa = confirm("result : " + response);
						
						});
				/*	END ------- */
				//);
				
			}  catch(Error) { 
				alert(Error.message);
				}
			
			// -------- End - DISINI DI PASANG SCRIPT UNTUK SENDING EMAIL KE ADMIN ---------
			
			
			// MESSAGE SENDING FOR CUSTOMER
			var to_cust_email = contactemail;
			//var from_cust_email = "sales@point-star.net";
			//var repplyto_cust_email = "sales@point-star.net";
			var from_cust_email = "melia@point-star.com";
			var repplyto_cust_email = "melia@point-star.com";
			
			var subject_cust_email = "Your Order: " + domainname + " on Google Apps Unlimited";
			
			var body_cust_email = "";
			var body_cust_email = body_cust_email + "Hi "+contactname+",<br/><br/>";
			var body_cust_email = body_cust_email + "Thank you for your Google Apps Unlimited Licence order on point-star.com. Please save this email for your own record.<br/><br/>";
			var body_cust_email = body_cust_email + "----------------------------------------<br/>Email Addresses To Setup<br/>----------------------------------------<br/><br/>";
			var body_cust_email = body_cust_email + "Please indicate for us the email addresses, first names and last names you wish to setup, <br/>in the following format (e.g.) :<br/><br/>";
			var body_cust_email = body_cust_email + "1. <br/>";
			var body_cust_email = body_cust_email + "Email: "+contactemail+"<br/>";
			var body_cust_email = body_cust_email + "Name: "+contactname+"<br/>";

			var body_cust_email = body_cust_email + "====================<br/>Your Order Details:<br/>====================<br/><br/>";

			var body_cust_email = body_cust_email + "Google Apps Licences: "+licenseval+"<br/>";
			var body_cust_email = body_cust_email + "Vault Licences: "+vault+"<br/>";
			var body_cust_email = body_cust_email + "Google Apps Licence Cost: "+licensevalRp+"<br/>";
			var body_cust_email = body_cust_email + "Vault Licence Cost: "+vaulttotal+"<br/>";
			var body_cust_email = body_cust_email + "Total Payable Amount: USD "+grandtotal+" (inclusive of 7% GST if applicable)<br/><br/>";

			var body_cust_email = body_cust_email + "Selected Payment Method: "+methodmessage+"<br/><br/>";

			var body_cust_email = body_cust_email + "Your Domain Name: "+domainname+"<br/>";
			var body_cust_email = body_cust_email + "Your Company: "+companyname+"<br/>";
			var body_cust_email = body_cust_email + "Your Name: "+contactname+"<br/>";
			var body_cust_email = body_cust_email + "Your Email: "+contactemail+"<br/>";
			var body_cust_email = body_cust_email + "Your Phone: "+contactphone+"<br/>";
			var body_cust_email = body_cust_email + "Your Country of Business: "+country+"<br/><br/>";
			var body_cust_email = body_cust_email + "Please note that by proceeding with this order, you had already agreed to <br/>PointStar's terms and conditions as stated here:<br/>http://www.point-star.com/licence-terms-conditions/<br/><br/>If you have any other queries or concerns, you may call us at +65 6773 0987 <br/>(Mondays to Fridays, 9:00 am to 6:00 pm Singapore time) to speak to one of our <br/>PointStar assistants.<br/><br/>";
			
			// -----------------------------------------------------------------------------
			// -------- Start - DISINI DI PASANG SCRIPT UNTUK SENDING EMAIL CUSTOMER -------
			// -----------------------------------------------------------------------------
			
			
			// -------- END - DISINI DI PASANG SCRIPT UNTUK SENDING EMAIL CUSTOMER ---------
			
			
			if ($('input:radio[name="methodpayment"]')[0].checked == true){
				//var gTotal = $.number( grandtotal, 2);
				var gTotalURL = grandtotal.replace(",", "");

				//var returnsuccess = "http://point-star.com/licencesuccess/";
				//var returncancel = "http://point-star.com/licence/";
				//var returnsuccess = "http://localhost:4200/licencesuccess/";
				//var returncancel = "http://localhost:4200/licence/";

				
				if(document.domain == 'localhost') {
					var returnsuccess = "http://localhost:4200/licencesuccess/";
					var returncancel = "http://localhost:4200/";
				} else {
					var returnsuccess = location.protocol + "//" + document.domain + "/licencesuccess/";
					var returncancel = location.protocol + "//" + document.domain + "/";					
				}

				
				try { 				
					//this._cookieService.put('totalValue', grandtotal);
					//this._cookieService.put('domainValue', domainname);

					var cookies = document.cookie.split(";");
					for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i];
						var eqPos = cookie.indexOf("=");
						var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
						document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";						
					}
	
					document.cookie = "totalValue="+gTotalURL; 
					document.cookie = "domainValue="+domainname; 
					//alert("Cookies - create:"+document.cookie);					
				}  catch(Error) { 
					alert(Error.message);
				}
				

				// via paypal
				var linkURL_Paypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=admin@point-star.com&lc=SG&item_name=PointStar-"'+domainname+'&item_number=cg-'+domainname+'&amount='+gTotalURL+'&currency_code=USD&button_subtype=services&no_note=1&no_shipping=1&rm=1&return='+returnsuccess+'&cancel_return='+returncancel;
				//var locPathURL =  location.protocol + "//" + document.domain + "/" + location.pathname.split('/')[1] + "/";
				//document.write("linkurl:"+linkURL_Paypal);
				//document.write("<br><br>"+locPathURL);
				//document.cookie = "doSomethingOnlyOnce=; expires="+datez;
				document.location.href= linkURL_Paypal;
				/*$('.conf-wrapper1').fadeIn(1000);
				console.log(domainname);
				console.log(licenseval);
				console.log(vault);
				console.log(packagetype);
				console.log(grandtotal);
				*/
			};
			if ($('input:radio[name="methodpayment"]')[1].checked == true){
				// via cash
				$('.conf-wrapper2').fadeIn(1000);
			};
			
			
		});
		
		});

	} // end if 
	
	/*if (locPathURL == 'licencesuccess') { 
		this.cookieService.removeAll();
	}*/
  } // end public ngOnInit() 

 
}