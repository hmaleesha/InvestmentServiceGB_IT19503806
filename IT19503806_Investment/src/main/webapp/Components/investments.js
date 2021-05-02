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
var status = validateItemForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidInvestIDSave").val() == "") ? "POST" : "PUT"; 
$.ajax( 
 { 
 url : "InvestmentAPI", 
 type : type, 
 data : $("#formInvestment").serialize(), 
 dataType : "text", 
 complete : function(response, status) 
 { 
 onInvestmentaveComplete(response.responseText, status); 
 } 
 }); 
});
// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
$("#hidInvestIDSave").val($(this).data("investid")); 
 $("#amountFund").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#equity").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#conDate").val($(this).closest("tr").find('td:eq(3)').text()); 
 $("#invDate").val($(this).closest("tr").find('td:eq(4)').text());
 $("#projId").val($(this).closest("tr").find('td:eq(5)').text()); 
}); 

function onInvestmentaveComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully saved."); 
 $("#alertSuccess").show(); 
 $("#divInvestGrid").html(resultSet.data); 
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
 $("#hidInvestIDSave").val(""); 
 $("#formInvestment")[0].reset(); 
}
 
 $(document).on("click", ".btnRemove", function(event)
{ 
 $.ajax( 
 { 
 url : "InvestmentAPI", 
 type : "DELETE", 
 data : "investID=" + $(this).data("investid"),
 dataType : "text", 
 complete : function(response, status) 
 { 
 onInvestmentDeleteComplete(response.responseText, status); 
 } 
 }); 
});
 
 function  onInvestmentDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divInvestGrid").html(resultSet.data); 
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
 
// CLIENT-MODEL================================================================
function validateItemForm() 
{ 
// AMOUNT
if ($("#amountFund").val().trim() == "") 
 { 
 return "Insert Amount Funded."; 
 } 
// EQUITY
if ($("#equity").val().trim() == "") 
 { 
 return "Insert Equity Assigned Value."; 
 }
 // CONFIRM DATE-------------------------------
if ($("#conDate").val().trim() == "") 
 { 
 return "Insert Confirmation Date."; 
 } 
 
 

// is numerical value
var tmpFund = $("#amountFund").val().trim();
var tmpEquity = $("#equity").val().trim(); 
 
if (!$.isNumeric(tmpFund)||!$.isNumeric(tmpEquity)) 
 { 
 return "Insert a numerical value for amount funded and equity assigned."; 
 }
  
// convert to decimal price
 $("#amountFunded").val(parseFloat(tmpFund).toFixed(2));
  $("#equity").val(parseFloat(tmpEquity).toFixed(2)); 
// PROJID------------------------
if ($("#projId").val().trim() == "") 
 { 
 return "Insert Project id."; 
 } 
 // is numerical value
 var tmpProj =  $("#projId").val().trim();
 if (!$.isNumeric(tmpProj)) 
 { 
 return "Insert a numerical value for project Id."; 
 }
 
 // dates validation
 var cDate = document.forms['formInvestment'].conDate.value;
 cDate = new Date(cDate).getTime();
 
 var inDate = document.forms['formInvestment'].invDate.value;
 inDate = new Date(inDate).getTime();
 
 if(inDate<cDate){
  return "Invalid dates. Investment must be confirmed before funding";
 }
return true; 
}
 