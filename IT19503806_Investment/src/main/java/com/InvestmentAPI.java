package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Investment;

/**
 * Servlet implementation class InvestmentAPI
 */
@WebServlet("/InvestmentAPI")
public class InvestmentAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Investment investObj = new Investment();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InvestmentAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

    private static Map getParasMap(HttpServletRequest request) 
    { 
	    Map<String, String> map = new HashMap<String, String>(); 
	    try
	    { 
		     Scanner scanner = new Scanner(request.getInputStream(), "UTF-8"); 
		     String queryString = scanner.hasNext() ? 
		     scanner.useDelimiter("\\A").next() : ""; 
		     scanner.close(); 
		     String[] params = queryString.split("&"); 
		    
		     for (String param : params){ 
		    	 String[] p = param.split("=");
		    	 map.put(p[0], p[1]); 
		     } 
	    } 
	    catch (Exception e) {} 
	    return map; 
    }
     
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String output = investObj.insertInvestment(request.getParameter("amountFund"), 
				request.getParameter("equity"), 
				request.getParameter("conDate"), 
				request.getParameter("invDate"),
				request.getParameter("projId")); 
				response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request); 
		String output = investObj.updateInvestment(paras.get("hidInvestIDSave").toString(), 
				paras.get("amountFund").toString(), 
				paras.get("equity").toString(), 
				paras.get("conDate").toString(), 
				paras.get("invDate").toString()); 
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map paras = getParasMap(request); 
		String output = investObj.deleteInvestment(paras.get("investID").toString()); 
		response.getWriter().write(output);
	}

}
