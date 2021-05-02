<%@page import="model.Investment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/investments.js"></script>

<title>Investment Management</title>
</head>
<body> 
<div class="container"><div class="row"><div class="col-6"> 
<h1>Project Investments</h1>
<form id="formInvestment" name="formInvestment">
 Amount Funded: 
 <input id="amountFund" name="amountFund" type="text" 
 class="form-control form-control-sm">
 <br> Equity Assigned: 
 <input id="equity" name="equity" type="text" 
 class="form-control form-control-sm">
 <br> Confirmed Date: 
 <input id="conDate" name="conDate" type="date" 
 class="form-control form-control-sm">
 <br> Investment Date: 
 <input id="invDate" name="invDate" type="date" 
 class="form-control form-control-sm">
 <br> Project Id:
 <input id="projId" name="projId" type="text" 
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="hidInvestIDSave" 
 name="hidInvestIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divInvestGrid">
 <%
 Investment investObj = new Investment();
 out.print(investObj.readInvestment()); 
 %>
</div>
</div> </div> </div> 
</body>
</html>