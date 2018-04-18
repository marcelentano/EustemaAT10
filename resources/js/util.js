function util_initAll(cfControl,dialog,pickers,waiters,buttons,linkers)
{
	if(cfControl)
	{
		util_cf_control();
	}
	if(dialog)
	{
		util_doDialog();	
	}
	if(pickers)
	{
		util_doPickers();
	}
	if(waiters)
	{
		util_doIntercept();
	}
	if(buttons)
	{
		util_doButtons();
	}
	if(linkers)
	{
		util_doLinkers();
	}
}

function util_doLinkers()
{
			$('.linker').css('cursor','pointer');
			$('.linker').mouseover(function() 
			{
				var span = this;
				span.style.textDecoration ='underline';
			});
			$('.linker').mouseout(function() 
			{
		  		var span = this;
				span.style.textDecoration ='none';
			});	
}
function util_doIntercept()
{
	//document.onclick=function(e){interceptor(e);return false};
	$('.waiter').click(function(e)
	{
		util_showModal('waitModal');
		//$('#waitModal').modal('show');
		//return false;  
	});
	
}
function util_doButtons()
{
    $('.bButton').button().addClass('btn btn-default');
}
function util_doPickers()
{

	$('.isDatepicker').datepicker
	(
			{
				autoclose: true,
				format: 'dd/mm/yyyy',
			    maxViewMode: 0,
			    todayBtn: 'linked',
			    language: 'it',
			    todayHighlight: true
			}
	);
	
	
	
}

function util_doDialog()
{
	var idiv='<div class="modal fade" id="waitModal" role="dialog" data-backdrop="static">';
	idiv+='<div class="modal-dialog modal-sm">';
	idiv+='<div class="modal-content">';
	idiv+='<div class="modal-body">';
	idiv+=' <center>Attendere Prego<br><br><img src="resources/IMG/loader.gif" /></center>';
	idiv+='</div>';
	idiv+='</div>';
	idiv+='</div>';
	idiv+='</div>';
	var d =  $(idiv);
	$('body').append(d);
	
 /*
	$("#waitDialog").dialog({
			autoOpen: false,
			modal:true,
			resizable: false,
			dialogClass: "message",
			opacity:0.7
			
		});
	*/	
}



function util_cf_control()
{
	if(document.getElementById('editor'))
	{
	var myElement = document.getElementById('editor');
	myElement.onpaste = function(e) 
	{
  		var pastedText = undefined;
  		if (window.clipboardData && window.clipboardData.getData) 
  		{ 
    			pastedText = window.clipboardData.getData('Text');
  		} 
  		else if (e.clipboardData && e.clipboardData.getData) 
  		{
    			pastedText = e.clipboardData.getData('text/plain');
  		}
  		console.log(pastedText);
  		var isok= myControl(pastedText);
		if (isok)
		{
			document.getElementById("editor").style.border='2px solid green';
		}
		else
		{
		document.getElementById("editor").style.border='2px solid red';
		}
		if(document.getElementById('editor').value=='')
		{
			document.getElementById("editor").style.border='2px solid green';
		}
 		return false; 
	};

	myElement.onkeyup = function(e) 
	{
			var isok= myControl(document.getElementById('editor').value);
			if (isok)
			{
				document.getElementById("editor").style.border='2px solid green';
			}
			else
			{
			document.getElementById("editor").style.border='2px solid red';
				var nn=document.getElementById('editor').value.length;
				if(nn==0)
				{
					document.getElementById("editor").style.border='';
				}
			}
	};

}
}

function myControl(t)
{
	try
	{
		var isOk=true;
		var ii=t;
		var tt = ii.replace(/\s+/g, '');
		var toTest = tt.toUpperCase();
		document.getElementById('editor').value=toTest;
		var re = new RegExp(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/);
		if(re.test(toTest))
		{
			// tappooooo
		}
		else
		{
			isOk=false;
		}
		return isOk;
	}
	catch(e)
	{
		//console.log(e);
	}
	
}

function util_renderTable(obj,idDest) 
{
	var objArr = util_getArr(obj);
    var cols = util_getHeaders(objArr); 
	$('#'+idDest).html(util_createTable(objArr, cols));
}

function util_getArr(obj)
{
    var toPass = null;
    if(util_isArray(obj))
    {
    	toPass=obj;
    }
    else
    {
    	for (var key in obj) 
        {
        	toPass=obj[key];
        }
    }
    return toPass;
}

function util_createTable(obj, cols) 
{
	var table = $('<table class="ntable"></table>');
	if(util_isArray(obj))
	{
	    var th = $('<tr></tr>');
	    for (var i = 0; i < cols.length; i++) 
	    {
	        th.append('<th>' + cols[i] + '</th>');
	    }
	    table.append(th);
	    for (var j = 0; j < obj.length; j++) 
	    {
	    	var ccolor="#FFFFFF";
	    	if((j % 2)==0)
	    	{
	    		ccolor="#e6e6e6";
	    	}
	        var player = obj[j];
	        var tr = $('<tr style="background-color:'+ccolor+'"></tr>');
	        for (var k = 0; k < cols.length; k++) 
	        {
	            var columnName = cols[k];
	            if(player[columnName])
	            {
	            	if(player[columnName].length<20)
		            {
		            	 tr.append('<td>' + player[columnName] + '</td>');
		            }
		            else
		            {
		            	tr.append('<td title="'+player[columnName]+'">' + player[columnName].substring(0,10) + '</td>');
		            }
	            }
	            else
	            {
	            	tr.append('<td></td>');
	            }
	            
	        }
	        table.append(tr);
	    }
	}
	else
	{
		var th = $('<tr></tr>');
		th.append('<th> ERRORE: Impossibile creare la tabella, l\'oggetto non e\' un JSon Array</th>');
		table.append(th);
	}
	return table;
	
}


function util_getHeaders(obj) 
{
    var cols = new Array();
    var p = obj[0];
    for (var key in p) 
    {
        cols.push(key);
    }
    return cols;
}


function util_isArray(obj)
{
	var isArr=false;
	if(obj instanceof Array)
	{
		isArr=true;
	}
    return isArr;
}

function util_doAjaxPdfCall(url, data)
{
	window.open(url+'?data='+data, '_blank');
}

function util_doAjaxCall(url,data,onFail,onDone,dataType,async)
{
	var aasync = true;
	if (typeof async != 'undefined')
	{
		aasync=async;
	}
	if(aasync==false)
	{
		util_showModal('waitModal');//$('#waitModal').modal('show');
	}
	
	var jqxhr = $.ajax
	({
		type: 'POST',
		url: url,
		dataType: dataType,
		data: data,
		cache: false
	})
	.done(function(data)
	{	
		window[onDone](data);
	})
	.fail(function(request,textStatus,errorThrown) 
	{
		window[onFail](request);
	});
	
	if(aasync==false)
	{
		$.when(jqxhr).then(function afterDone(){util_hideModal('waitModal');},function afterFail(){util_hideModal('waitModal');});
	}
}

function util_test()
{
alert('util up and running');	
}

function util_doPaging(numPage)
{

$('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = numPage;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.page-number:first').addClass('active');
});
}

function util_cf_class_control(className)
{
	
	$('.'+className).on('keyup',function(e)
			{
				var isok= myClassControl($(this).val(),$(this));
				if (isok)
				{
					$(this).css('border','2px solid green');
				}
				else
				{
					$(this).css('border','2px solid red');
					
					var nn=$(this).val().length;
					if(nn==0)
					{
						$(this).css('border','');
					}
				}
		
		
			});
	
	$('.'+className).on('paste',function(e)
			{

		  		var pastedText = undefined;
		  		if (window.clipboardData && window.clipboardData.getData) 
		  		{ 
		    			pastedText = window.clipboardData.getData('Text');
		  		} 
		  		else if (e.clipboardData && e.clipboardData.getData) 
		  		{
		    			pastedText = e.clipboardData.getData('text/plain');
		  		}
		  		else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData)
		  		{
		  			pastedText = e.originalEvent.clipboardData.getData('text');
		  		}
		  		
		  		var isok=myClassControl(pastedText,$(this));
				if (isok)
				{
					$(this).css('border','2px solid green');
				}
				else
				{
					$(this).css('border','2px solid red');
				}
				if($(this).val()=='')
				{
					$(this).css('border','2px solid green');
				}
		 		return false; 
			});
	
}

function util_cf_id_control(idName)
{
	
	$('#'+idName).on('keyup',function(e)
			{
				var isok= myClassControl($(this).val(),$(this));
				if (isok)
				{
					$(this).css('border','2px solid green');
				}
				else
				{
					$(this).css('border','2px solid red');
					
					var nn=$(this).val().length;
					if(nn==0)
					{
						$(this).css('border','');
					}
				}
		
		
			});
	
	$('.'+idName).on('paste',function(e)
			{

		  		var pastedText = undefined;
		  		if (window.clipboardData && window.clipboardData.getData) 
		  		{ 
		    			pastedText = window.clipboardData.getData('Text');
		  		} 
		  		else if (e.clipboardData && e.clipboardData.getData) 
		  		{
		    			pastedText = e.clipboardData.getData('text/plain');
		  		}
		  		else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData)
		  		{
		  			pastedText = e.originalEvent.clipboardData.getData('text');
		  		}
		  		
		  		var isok=myClassControl(pastedText,$(this));
				if (isok)
				{
					$(this).css('border','2px solid green');
				}
				else
				{
					$(this).css('border','2px solid red');
				}
				if($(this).val()=='')
				{
					$(this).css('border','2px solid green');
				}
		 		return false; 
			});
	
}


function myClassControl(t,element)
{
	try
	{
		var isOk=true;
		var ii=t;
		var tt = ii.replace(/\s+/g, '');
		var toTest = tt.toUpperCase();
		element.val(toTest);
		var re = new RegExp(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/);
		if(re.test(toTest))
		{
			// tappooooo
		}
		else
		{
			isOk=false;
		}
		return isOk;
	}
	catch(e)
	{
		//console.log(e);
	}
	
}

function util_toFixedFix(n, precisione) {
    // Funzione per arrotondare valore
    var k = Math.pow(10, precisione);            
    return '' + Math.round(n * k) / k;
}

function util_number_format(numero, decimali, dec_separatore, mig_separatore){
    // Elimino i caratteri che non sono numeri (lascio il segno meno e il punto)
    numero = (numero).replace(/[^0-9\.\-\,]?/gi,"");
    // Cambio la virgola con il punto 
    numero= numero.replace(/,/g, '.');
    // Controllo se valore numerico
    var n = 0;
    if(isFinite(+numero)){
        n=numero;
    }
    // Controllo se i decimali sono accettabili
    var precisione = 0;
    if(isFinite(+decimali) && decimali>-1){
        precisione = decimali;
    }
    // Recupero caratteri separatori
    var separatore = '.';
    if(typeof mig_separatore != 'undefined'){
        separatore = mig_separatore;
    }
    var dec = ',';
    if(typeof dec_separatore != 'undefined'){
        var dec = dec_separatore;     
    }
    
    // Arrotondo il valore se necessario - Utilizzo funzione toFixedFix
    var s = '' +n;
//    if(precisione!=0){
//        s = toFixedFix(n, precisione);    
//    }else{
//        s = '' + Math.round(n);
//    }
    // Taglio il valore in parte intera e parte decimale
    s = s.split('.');
    // Aggiungo il separatore delle migliaia - ogni 3 numeri sulla parte intera
    if (s[0].length > 3) {        
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separatore);
    }
   
    // Formatto la parte decimale - aggiungo degli 0 se necessari
    if ((s[1] || '').length < precisione) {
        s[1] = s[1] || '';
        s[1] += new Array(precisione - s[1].length + 1).join('0');    
    }
    else
    {
    	 s[1] = s[1].substring(0,2);
    }
    // Aggiungo parte decimale a parte intera - separati da separatore decimali
    if (s[0].length!=0)
    {
    	return s.join(dec);
    }
    
}

function util_isDate(txtDate)
{
  var currVal = txtDate;
  if(currVal == '')
  return false;
 
  //Declare Regex 
  var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
  var dtArray = currVal.match(rxDatePattern); // is format OK?
  if (dtArray == null)
  {
	  return false;
  }
 
  //Checks for dd/mm/yyyy format.
  dtDay = dtArray[1];
  dtMonth= dtArray[3];
  dtYear = dtArray[5];   
 
  if (dtMonth < 1 || dtMonth > 12)
  {
	  return false;
  }
  else if (dtDay < 1 || dtDay> 31)
  {
	  return false; 
  }
  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
  {
	  return false;
  }
  else if (dtMonth == 2)
  {
     var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
     if (dtDay> 29 || (dtDay ==29 && !isleap))
     {
    	 return false; 
     }
  }
  return true;
}

function util_isEmail(text)
{
	 var re = /\S+@\S+\.\S+/;
	 var isEmail = re.test(text);
	 return isEmail;
}

function util_string_to_number(numero)
{
	if(numero==null)
	{
		return 0;
	}
	 // Cambio la virgola con il punto 
	 numero= numero.replace(/,/g, '.');
	 // Controllo se valore numerico
	    var n = 0;
	    if(isFinite(+numero))
	    {
	        n=numero;
	    }
    return n*1;
}

function util_fix_number(numero)
{
	var snum = numero.toFixed(2);
	snum=snum.replace('.', ',');
    return snum;
}
function util_filterTable(tableBodyToFilterID,filterFieldID,counterSpanID)
{
	
	// AGGIUNTO PER IL NON CASE SENSITIVE
	$.extend($.expr[":"], 
	{
		"containsNC": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	
		
	var ii=0;
	var rdata= document.getElementById(filterFieldID).value;
    var data = document.getElementById(filterFieldID).value;
    var bbody=document.getElementById(tableBodyToFilterID);
    if (typeof bbody == "undefined") {
        alert('il body della tabella con ID= '+tableBodyToFilterID +" non esiste nella pagina");
        return false;
    }
    //create a jquery object of the rows
    var jo = $("#"+tableBodyToFilterID).find("tr");
  //  if (rdata == "") {
  //      jo.show();
  //      return;
  //  }
    //hide all the rows
    jo.hide();

    //Recusively filter the jquery object to get results.
    jo.filter(function (i, v) 
    {
    	
        var $t = $(this);
        if ($t.is(":containsNC('" + data + "')")) 
        {
        	ii=ii+1;
        	return true;
        }
        else
        {
        	return false;
        }
    })
    //show the rows that match.
    .show();
    $(this).unbind('focus');
    $('#'+counterSpanID).html(ii);
   // $('#countMaxIndex').html(ii);
}

function util_showModal(modalID)
{
	
	$('.modal').each(function(i, obj) 
	{
	  $('#'+obj.id).modal('hide');
	});
	$('#'+modalID).modal('show');
}

function util_hideModal(modalID)
{
	
	$('#'+modalID).modal('hide');
}

function util_getInternetExplorerVersion()
//Returns the version of Windows Internet Explorer or a -1
//(indicating the use of another browser) or IE > 10
{
	var rv = 999; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
	   var ua = navigator.userAgent;
	   var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	   if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	}
	return rv;
}

function util_checkIE7orLess()
{
	var isIE7=true;
	if(util_getInternetExplorerVersion()>7)
	{
		isIE7=false;
	}
	return isIE7;
}

function util_getBrowserDetails()
{
	var bb={};
	var objappVersion = navigator.appVersion;
	var objAgent = navigator.userAgent;
	var objbrowserName  = navigator.appName;
	var objfullVersion  = ''+parseFloat(navigator.appVersion); 
	var objBrMajorVersion = parseInt(navigator.appVersion,10);
	var objOffsetName,objOffsetVersion,ix;

	// In Chrome 
	if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) {
	 objbrowserName = "Chrome";
	 objfullVersion = objAgent.substring(objOffsetVersion+7);
	}
	// In Microsoft internet explorer
	else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) {
	 objbrowserName = "Microsoft Internet Explorer";
	 objfullVersion = objAgent.substring(objOffsetVersion+5);
	}

	// In Firefox
	else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) {
	 objbrowserName = "Firefox";
	}
	// In Safari 
	else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) {
	 objbrowserName = "Safari";
	 objfullVersion = objAgent.substring(objOffsetVersion+7);
	 if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) 
	   objfullVersion = objAgent.substring(objOffsetVersion+8);
	}
	// For other browser "name/version" is at the end of userAgent 
	else if ( (objOffsetName=objAgent.lastIndexOf(' ')+1) < 
	          (objOffsetVersion=objAgent.lastIndexOf('/')) ) 
	{
	 objbrowserName = objAgent.substring(objOffsetName,objOffsetVersion);
	 objfullVersion = objAgent.substring(objOffsetVersion+1);
	 if (objbrowserName.toLowerCase()==objbrowserName.toUpperCase()) {
	  objbrowserName = navigator.appName;
	 }
	}
	// trimming the fullVersion string at semicolon/space if present
	if ((ix=objfullVersion.indexOf(";"))!=-1)
	   objfullVersion=objfullVersion.substring(0,ix);
	if ((ix=objfullVersion.indexOf(" "))!=-1)
	   objfullVersion=objfullVersion.substring(0,ix);

	objBrMajorVersion = parseInt(''+objfullVersion,10);
	if (isNaN(objBrMajorVersion)) {
	 objfullVersion  = ''+parseFloat(navigator.appVersion); 
	 objBrMajorVersion = parseInt(navigator.appVersion,10);
	}
	bb.name=objbrowserName;
	bb.fullVersion=objfullVersion;
	bb.majorVersion=objBrMajorVersion;
	return bb;

}

//function util_setImportoClass(cl)
//{
//	$('.'+cl).on('keydown',function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,188])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
//	$('.'+cl).focusout(function() 
//	{
//		try
//		{
//			var comma = number_format($(this).val(), '2', ',', '');
//			$(this).val(comma);
//		}
//		catch (e) 
//		{
//			console.log(e);
//		}
//	 });
//}


function util_setImportoClass(cl)
{
	$('.'+cl).on('keypress',function(event) 
	{
	    var $this = $(this);
	    if ((event.which != 44 || $this.val().indexOf(',') != -1) && ((event.which < 48 || event.which > 57) && (event.which != 0 && event.which != 8))) 
	    {
	           event.preventDefault();
	    }
	    var text = $(this).val();
	    if ((event.which == 44) && (text.indexOf(',') == -1)) 
	    {
	        setTimeout(function() 
	        {
	            if ($this.val().substring($this.val().indexOf(',')).length > 3) 
	            {
	                $this.val($this.val().substring(0, $this.val().indexOf(',') + 3));
	            }
	        }, 1);
	    }

	    if ((text.indexOf(',') != -1) && (text.substring(text.indexOf(',')).length > 2) && (event.which != 0 && event.which != 8) && ($(this)[0].selectionStart >= text.length - 2)) 
	    {
	            event.preventDefault();
	    }      
	});

	

}


function util_setNumeric(cl)
{
	$('.'+cl).on('keydown',
	function(e)
	{
		//var e = e || window.event;
	    var key = e.keyCode || e.which;

	    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
	    // numbers   
	    key >= 48 && key <= 57 ||
	    // Numeric keypad
	    key >= 96 && key <= 105 ||
	    // Backspace and Tab and Enter
	    key == 8 || key == 9 || key == 13 ||
	    // Home and End
	    key == 35 || key == 36 ||
	    // left and right arrows
	    key == 37 || key == 39 ||
	    // Del and Ins
	    key == 46 || key == 45) {
	        // input is VALID
	        e.returnValue = true;
	    }
	    else {
	        // input is INVALID
	        e.returnValue = false;
	        if (e.preventDefault) e.preventDefault();
	    }
	});
	
}

function util_onlyNumbersAllowed(evt){
	var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
    // numbers   
    key >= 48 && key <= 57 ||
    // Numeric keypad
    key >= 96 && key <= 105 ||
    // Backspace and Tab and Enter
    key == 8 || key == 9 || key == 13 ||
    // Home and End
    key == 35 || key == 36 ||
    // left and right arrows
    key == 37 || key == 39 ||
    // Del and Ins
    key == 46 || key == 45) {
        // input is VALID
        e.returnValue = true;
    }
    else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
}

function util_truncDecimal(a)
{
	
	if(a.indexOf(',')!=-1)
	{
		a  = a.slice(0, (a.indexOf(','))+3);
	}
	return a;
}


function util_fillSelect(idSelect,jsonArray,defaultText)
{
	var sel = document.getElementById(idSelect);
	// ATTENZIONE CREARE L'OPZIONE DI DEFAULT SOLO LE LA LISTA.LENGTH E' > 1
	if(jsonArray.length>1)
	{
		var op = document.createElement('option');
		op.text = defaultText;
		op.value = '-';
		sel.add(op);
	}
	for(var i=0;i<jsonArray.length;i++)
	{
		var option = document.createElement('option');
		option.text = jsonArray[i].descrizione;
		option.value = jsonArray[i].codice;
		sel.add(option);
	}
}

/**da richiamare all'interno del js della pagina desiderata per popolare la modal in modalità fail */
function util_doFail(request) 
{
	var rState = request.readyState;
	if(rState==0) 
	{
		// PROBABILMENTE SCADUTA AUTENTICAZIONE
		document.getElementById('onFailModalDetails_ref').style.display='block';
		document.getElementById('onFailModalDetails_fault').style.display='none';
		document.getElementById('onFailModalDetails_err').style.display='none';
	} 
	else 
	{
		document.getElementById('onFailModalDetails_ref').style.display='none';
		document.getElementById('onFailModalDetails_fault').style.display='block';
		document.getElementById('onFailModalDetails_err').style.display='none';
	}
	util_showModal('onFailModal');	
}

/**da richiamare all'interno del js della pagina desiderata per popolare la modal in modalità errore */
function util_doError(errorText)
{
	document.getElementById('onFailModalDetails_ref').style.display='none';
	document.getElementById('onFailModalDetails_fault').style.display='none';
	document.getElementById('onFailModalDetails_err').style.display='block';
	$('#onFailModalDetails_err_area').val(errorText);
	util_showModal('onFailModal');	
}

/**utilità di creazione dell'header di una tabella generica: prende in input un array contenente i valori delle label delle colonne,
 * un booleano che indica se si vuole indietro l'header comprensivo di tag di chiusura oppure no in modo da completarlo nel metodo chiamante,
 * e un ulteriore booleano che permette di far restituire al chiamante solo l'insieme dei <th> relativi alle label passate senza che questi siano
 * inclusi nei tag più generali <thead><tr> */
function util_buildHeaderTable(labels, isClosed, enveloped)
{
	var intestazione= enveloped == true ? '<thead><tr>' : '';
	for(var i=0; i<labels.length; i++) 
	{
		intestazione+='<th style="text-align:center">'+labels[i]+'</th>';
	}
	intestazione+= isClosed == true ? '</tr></thead>' : '';
	return intestazione;
}

/**utilità che restituisce un array contenente le righe con la checkbox spuntata presenti nella tabella della pagina chiamante */
function util_checkedRowsTable(list)
{
	var arrayRic=[];
	$('input:checkbox.selectableCheckbox').each(function (i, obj) 
	{
		if(obj.checked)
		{
			var ric = list[$(obj).val()];
			arrayRic.push(ric);
		}
		
	});	
	return arrayRic;
}

/**utilità che effettua una chiamata AJAX generica parametrizzata */
function util_genericAJAXCall(urlPath, data, failedCallPath, succesfullCallPath, async)
{
	var url='REST/'+urlPath;
	var data={data:data};
	util_doAjaxCall(url,data,failedCallPath,succesfullCallPath,'json',async);	
}

/**utilità di funzionamento di un accordion di base con [+] e [-] per apertura/chiusura */
function util_generalAccordionSwitch(contentID, envelopSpanID)
{
	if($(contentID).css('display')=='none') {
		$(envelopSpanID).html('[-]');
		$(contentID).show();
	} else {
		$(envelopSpanID).html('[+]');
		$(contentID).hide();
	}	
}

/**utilità di redirect */
function util_redirect(path)
{
	util_showModal('waitModal');
	location.href=path;
}

/**utilità per messaggio di nessun risultato trovato */
function util_displayEmpty(idTable)
{
	if(idTable == null || idTable == '')
		idTable = 'searchOutput';
	document.getElementById(idTable).innerHTML='<div style="text-align:center">Non sono stati trovati risultati per i criteri di ricerca impostati</div>';
}

function util_clearByClass(className)
{
	$('.'+className).each(function( index ) 
	{
		// INPUT
		if($(this).is('input'))
		{
			$(this).val('');
		}
		// SELECT
		if($(this).is('select'))
		{
			var id = $(this).attr('id');
			var optFirst =id+' option:first';
			$('#'+id).val($('#' +optFirst).val());
		}
	});

}

function util_fromStringToDate(dateStr) 
{
    var parts = dateStr.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function util_fromDateToString(date)
{
	var strss = date.getDate() + '/' + (date.getMonth() +1) + '/' +  date.getFullYear();
	var dd = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate(); 
	var mm = ((date.getMonth() +1) < 10) ? '0' + (date.getMonth() +1) : (date.getMonth() +1); 	
	var yyyy = 	date.getFullYear();
	var str = dd+'/'+mm+'/'+yyyy;
	return str;
}
/*
function util_pageTable(tableId,resultForPage,divToAppend){
	
	if(resultForPage== 0 || resultForPage==''){
		$('#' + divToAppend).html('');
		return;
	}
	    var _resultForPage =  parseInt(resultForPage);
		var trList = $('#'+tableId).find('tbody').find('tr:visible');
		var resultSize = trList.size();
		var pagineIntere = Math.floor(resultSize/_resultForPage);
		var rimanenti = resultSize % _resultForPage;
		var pagineTotali = pagineIntere ;

		if(rimanenti!=0){
			pagineTotali++;
		}
		$('#pagination_' + tableId).remove();
		var buttonUl =$('<ul class="pagination" id="pagination_' + tableId +'" style="margin-top: 0;margin-bottom: 0" />');
				for(i=1;i<=pagineTotali;i++)
				{
					var sel ='';
					if(i==1)
					{
						sel='page-item-selected';
					}
					var singlelink = $(' <li class="page-item '+sel+'"><span class="page-link" style="cursor:pointer;color:#777">'+i+'</span></li>');
							singlelink.on("click", 
						   function() {
								var page = $( this ).text() - 1;
								util_show_page_number(tableId,page,_resultForPage,trList);
								$('#div_pagina').remove();
								//$('#paginationDiv').append('<div id="div_pagina" >Pagina:' + (parseInt(page)+ 1) + '</div>');
								$(this).addClass('page-item-selected');
						});
					util_show_page_number(tableId,0,_resultForPage,trList);
					
					buttonUl.append(singlelink);	
				}
		if(pagineTotali>1)
		{
				$('#' + divToAppend).html(buttonUl);
				$('#div_pagina').remove();
				//$('#paginationDiv').append('<div id="div_pagina" >Pagina:1</div>');
		}
	
}


function util_show_page_number(tableId,page,resultForPage,trList){
			
			$('.page-item').removeClass('page-item-selected');
	 		$(trList).css("display","none");
			var startElement = page  * resultForPage;
			for(var i=startElement;i<startElement+resultForPage;i++){
				$(trList[i]).css("display","");
			}
	
}
*/

function util_pageTable(tableId,resultForPage,divToAppend)
{
	if(resultForPage== 0 || resultForPage=='')
	{
		$('#' + divToAppend).html('');
		return;
	}
	
    var _resultForPage =  parseInt(resultForPage);
	var trList = $('#'+tableId).find('tbody').find('tr:visible');
	window.globalTrList=trList;
	
	$('.page-item').removeClass('page-item-selected');
	$(trList).css("display","none");
	for(var i=0;i<resultForPage;i++)
	{
		$(trList[i]).css("display","");
	}
	util_build_paginationDiv(tableId,0,_resultForPage,1,divToAppend);
}


function util_build_paginationDiv(tableId,page,resultForPage,actual,divToAppend)
{
	trList=window.globalTrList;
	var _resultForPage =  parseInt(resultForPage);
	var resultSize = trList.size();
	if(resultSize<_resultForPage)
	{
		$('#' + divToAppend).html('');
		return;
	}
	var pagineIntere = Math.floor(resultSize/_resultForPage);
	var rimanenti = resultSize % _resultForPage;
	var pagineTotali = pagineIntere;
	if(rimanenti!=0)
	{
		pagineTotali++;
	}
	var buttonUl =$('<ul class="pagination" id="pagination_' + tableId +'" style="margin-top: 0;margin-bottom: 0" />');
	var actualNumber = actual*1;
	var firstLink;
	var previousLink;
	var actualLink;
	var netxLink;
	var lastLink;
		
	if(actualNumber==1)
	{
		// PRIMO
		
		firstLink =  $(' <li class="disabled"><span class="page-link" style="color:#777" aria-label="Last">&laquo; Prima</span></li>');
		previousLink =$(' <li class="disabled"><span class="page-link" style="color:#777" aria-label="Prev">&lt;</span></li>');
		actualLink=$('<li><span style="background-color:#DBEBF8;color:#777">Pag: <b>'+actualNumber+'</b> di '+pagineTotali+'</span></li>');
		netxLink=$(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Next">&gt;</span></li>');
		netxLink.on("click",
		function() 
		{
			var actual = 2;
			var page = actual - 1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
		});
		lastLink = $(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Last">Ultima &raquo;</span></li>');
		lastLink.on("click",
		function() 
	    {
			var actual = pagineTotali;
			var page =actual-1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
			//$('#div_pagina').remove();
	    });
	}
	else if(actualNumber==pagineTotali)
	{
		// ULTIMO 
		firstLink =  $(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Last">&laquo; Prima</span></li>');
		firstLink.on("click",
		function() 
		{
			var actual = 1;
			var page = actual - 1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
		});
		previousLink =$(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Prev">&lt;</span></li>');
		previousLink.on("click",
		function() 
		{
			var actual = actualNumber - 1;
			var page = actual - 1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
		});
		actualLink=$('<li><span style="background-color:#DBEBF8;color:#777">Pag: <b>'+actualNumber+'</b> di '+pagineTotali+'</span></li>');
		netxLink=$(' <li class="disabled"><span class="page-link" style="color:#777" aria-label="Next">&gt;</span></li>');
		lastLink=$(' <li class="disabled"><span class="page-link" style="color:#777" aria-label="Last">Ultima &raquo;</span></li>');
	}
	else
	{
		// ACTUAL
		firstLink =  $(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Last">&laquo; Prima</span></li>');
		firstLink.on("click",
		function() 
		{
			var actual = 1;
			var page = actual - 1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
		});
		previousLink =$(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Prev">&lt;</span></li>');
		previousLink.on("click",
		function() 
		{
			var actual = actualNumber - 1;
			var page = actual - 1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
		});
		actualLink=$('<li><span style="background-color:#DBEBF8;color:#777">Pag: <b>'+actualNumber+'</b> di '+pagineTotali+'</span></li>');
		netxLink=$(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Next">&gt;</span></li>');
		netxLink.on("click",
		function() 
		{
			var actual = actualNumber + 1;
			var page = actual - 1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
		});
		lastLink = $(' <li class="page-item"><span class="page-link" style="cursor:pointer;color:#777" aria-label="Last">Ultima &raquo;</span></li>');
		lastLink.on("click",
		function() 
	    {
			var actual = pagineTotali;
			var page =actual-1;
			util_show_page_number(tableId,page,_resultForPage,actual,divToAppend);
			//$('#div_pagina').remove();
	    });
	}
		
		
	buttonUl.append(firstLink);
	buttonUl.append(previousLink);
	buttonUl.append(actualLink);
	buttonUl.append(netxLink);
	buttonUl.append(lastLink);
		
	
	if(pagineTotali>1)
	{
		$('#' + divToAppend).html('');
		$('#' + divToAppend).html(buttonUl);
	}
}

function util_show_page_number(tableId,page,resultForPage,actual,divToAppend)
{
	var trList=window.globalTrList;
	$('.page-item').removeClass('page-item-selected');
	$(trList).css("display","none");
	var startElement = page  * resultForPage;
	for(var i=startElement;i<startElement+resultForPage;i++)
	{
		$(trList[i]).css("display","");
	}
	util_build_paginationDiv(tableId,page,resultForPage,actual,divToAppend)
}
