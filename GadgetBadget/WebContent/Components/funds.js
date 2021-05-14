$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
	 $("#alertSuccess").hide(); 
	 } 
	 $("#alertError").hide(); 
});


// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
// Clear alerts---------------------
	 $("#alertSuccess").text(""); 
	 $("#alertSuccess").hide(); 
	 $("#alertError").text(""); 
	 $("#alertError").hide(); 
// Form validation-------------------
var status = validateFundForm();
if (status != true) 
	 { 
	 $("#alertError").text(status); 
	 $("#alertError").show(); 
	 return; 
 } 

// If valid------------------------
var type = ($("#hidFundIDSave").val() == "") ? "POST" : "PUT"; 
	$.ajax( 
	{ 
		url : "FundsAPI", 
		type : type, 
		data : $("#formFund").serialize(), 
		dataType : "text", 
		complete : function(response, status) 
		{ 
		onFundSaveComplete(response.responseText, status); 
		} 
	});  
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
	 $("#hidFundIDSave").val($(this).data("fundid"));
	 $("#hidFundIDSave").val($(this).closest("tr").find('#hidFundIDUpdate').val()); 
	 $("#fundProvider").val($(this).closest("tr").find('td:eq(0)').text()); 
	 $("#researchName").val($(this).closest("tr").find('td:eq(1)').text()); 
	 $("#amount").val($(this).closest("tr").find('td:eq(2)').text()); 
	 
}); 


// DELETE
$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
			 url : "FundsAPI", 
			 type : "DELETE", 
			 data : "fundID=" + $(this).data("fundid"),
			 dataType : "text", 
			 complete : function(response, status) 
			 { 
				 onFundDeleteComplete(response.responseText, status); 
			 } 
		 }); 
		});


// CLIENT-MODEL================================================================
function validateFundForm() 
{ 
	
// FundProvider
if ($("#fundProvider").val().trim() == "") 
 { 
	return "Insert Fund Provider."; 
 } 

// ResearchName
if ($("#researchName").val().trim() == "") 
 { 
	return "Insert Research Name."; 
 } 

// Amount-------------------------------
if ($("#amount").val().trim() == "") 
 { 
	return "Insert Amount."; 
 } 

// is numerical value
var tmpAmount = $("#amount").val().trim(); 
if (!$.isNumeric(tmpAmount)) 
 { 
	return "Insert a numerical value for Amount."; 
 } 

// convert to decimal Amount
 $("#amount").val(parseFloat(tmpAmount).toFixed(2)); 

	return true; 
}


function onFundSaveComplete(response, status)
{ 
	if (status == "success") 
	 { 
		 var resultSet = JSON.parse(response); 
		 
		 if (resultSet.status.trim() == "success") 
		 { 
			 $("#alertSuccess").text("Successfully saved."); 
			 $("#alertSuccess").show(); 
			 $("#divFundsGrid").html(resultSet.data); 
		 } else if (resultSet.status.trim() == "error") 
		 { 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
		 } 
		 
 } else if (status == "error") 
 { 
	 $("#alertError").text("Error while saving."); 
	 $("#alertError").show(); 
 } else
 { 
	 $("#alertError").text("Unknown error while saving.."); 
	 $("#alertError").show(); 
 } 
	 $("#hidFundIDSave").val(""); 
	 $("#formFund")[0].reset(); 
}


function onFundDeleteComplete(response, status)
{ 
	if (status == "success") 
	 { 
		 var resultSet = JSON.parse(response); 
		 
		 if (resultSet.status.trim() == "success") 
		 { 
			 $("#alertSuccess").text("Successfully deleted."); 
			 $("#alertSuccess").show(); 
			 $("#divFundsGrid").html(resultSet.data); 
		 } else if (resultSet.status.trim() == "error") 
		 { 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
		 } 
		 
	 } else if (status == "error") 
	 { 
		 $("#alertError").text("Error while deleting."); 
		 $("#alertError").show(); 
	 } else
	 { 
		 $("#alertError").text("Unknown error while deleting.."); 
		 $("#alertError").show(); 
	 } 
}

