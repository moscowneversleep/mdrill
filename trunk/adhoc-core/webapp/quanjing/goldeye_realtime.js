
function NumAscSort(a,b)
{
    return a[0]-b[0];
}
function sortData(ddata)
{
	if(!ddata)
		{
		return ddata;
		}
	return ddata.sort(NumAscSort);
}

function makeAllSort(data)
{
	var rtn={};
	for(var p in data)
	{
		var pdata_tmp={};
		for(var pp in data[p])
		{
			pdata_tmp[pp]=sortData(data[p][pp]);	
		}	
		rtn[p]=pdata_tmp;
	}
	
	return rtn;
}



function showresultable(resultlist)
{	
	resultlist.sort(function(a,b){
			if(a['miniute_5']==b['miniute_5'])
			{
				return 0
			}
			
			if(a['miniute_5']>b['miniute_5'])
			{
				return -1
			}
			
			return 1;
		
		});
	$("#tablelist_id").empty();
$("#tablelist_id").html('<table id="list4"  dir="ltr" style="width: 2000px;"></table><div id="pager2"></div>');
				var resultliststr=JSON.stringify(resultlist);
				
				var paramsdata={};
				
				var colname_list=['日期','分钟' ];
				var colModel_list=[ 
	  {name:'thedate',index:'thedate', width:60,searchoptions:{"clearSearch":false,sopt:['eq']}}, 
	  {name:'miniute_5',index:'miniute_5', width:100,sortable:true,sorttype:"string",searchoptions:{"clearSearch":false,sopt:['eq','ne','le','lt','gt','ge']}}
	  ];


var keysObj=makeDataSet();
	for(var p in keysObj)
	{
		
		
		colname_list.push(labelName[p][0]);
		
		colModel_list.push({name:p,index:p, width:80, align:"right",sorttype:"float",searchoptions:{clearSearch:false,sopt:['eq','ne','le','lt','gt','ge']}});
		
}



		paramsdata={ datatype: "jsonstring",
	datastr:resultliststr,
	 height: 200,
	 colNames:colname_list, 
	 colModel:colModel_list, 
	  pager: '#pager2',
	  rowNum:100, 
	  rowList:[50,100,200,500],
	  sortname: 'miniute_5',
    viewrecords: true,
    sortorder: "desc",
    sortable:true,
    caption:"黄金眼"
};
				
				
				
								g_downloadlines=[];

		g_downloadlines.push(paramsdata["colNames"].join(","));
				for(var i=0;i<resultlist.length;i++)
				{
					var item=resultlist[i];
					var itemList=[];
					for(var j=0;j<paramsdata.colModel.length;j++)
					{
						var keyname=paramsdata["colModel"][j]["name"];
						itemList.push(item[keyname]);
						
					}
					g_downloadlines.push(itemList.join(","));
				}
				
						 $("#data").val(g_downloadlines.join("\r\n"));

				
				
jQuery("#list4").jqGrid(paramsdata);	
	
jQuery("#list4").jqGrid('filterToolbar',{searchOperators : true});	


}

	var labelName={};
		labelName["p4pprice"]=["点击消耗","p4pprice"];
		labelName["p4pclick"]=["二跳点击","p4pclick"];
		labelName["aclick"]=["一跳点击","aclick"];
		labelName["apv"]=["一跳PV","apv"];
		labelName["p4ppv"]=["二跳PV","p4ppv"];
		
		labelName["actr"]=["一跳CTR%","actr"];
		labelName["empc"]=["ECPM","empc"];
		labelName["rpm"]=["RPM","rpm"];
		labelName["sctr"]=["二跳CTR%","sctr"];
		labelName["sppc"]=["二跳PPC","sppc"];
		
		
	
		
	
		labelName["p4pprice_sum"]=["累计点击消耗","p4pprice"];
		labelName["p4pclick_sum"]=["累计二跳点击","p4pclick"];
		labelName["aclick_sum"]=["累计一跳点击","aclick"];
		labelName["apv_sum"]=["累计一跳PV","apv"];
		labelName["p4ppv_sum"]=["累计二跳PV","p4ppv"];
		
		
		labelName["actr_sum"]=["累计actr","actr"];
		labelName["empc_sum"]=["累计empc","empc"];
		labelName["rpm_sum"]=["累计rpm","rpm"];
		labelName["sctr_sum"]=["累计sctr","sctr"];
		labelName["sppc_sum"]=["累计sppc","sppc"];


		labelName["zeroarr"]=["基线","zeroarr"];


function autofix(a)
{
	if(a>10)
	{
		
		return a.toFixed(0);
	}
	return a.toFixed(2);
}
function showresult(filterdata)
{
	
		filterdata=makeAllSort(filterdata);
		hideload();
		
		
	

		var thedate_data={};

		for(var thedate in filterdata)
		{
					var sumstartdata=makeAllSum(filterdata[thedate]);
					
					sumstartdata["empc_sum"]=makedoubleDivPrice_sum();
						//			returnresult[thedatestr]["empc"].push([ttts5,makedoubleDivPrice(item["sum(p4pprice)"],item["sum(apv)"],1000,100).toFixed(2)]);
					//				returnresult[thedatestr]["rpm"].push([ttts5,makedoubleDivPrice(item["sum(p4pprice)"],item["sum(aclick)"],1000,100).toFixed(2)]);
					//				returnresult[thedatestr]["sctr"].push([ttts5,makedoubleDivPrice(item["sum(p4pclick)"],item["sum(aclick)"],100,1).toFixed(2)]);
					//				returnresult[thedatestr]["sppc"].push([ttts5,makedoubleDivPrice(item["sum(p4pprice)"],item["sum(p4pclick)"],1,100).toFixed(2)]);								
							
					
					var zeroarr=[];

					if(sumstartdata["apv"])
					{
							zeroarr=[];
							for(var i=0;i<sumstartdata['apv'].length;i++)
							{
								zeroarr.push([sumstartdata['apv'][i][0],0]);
							}
					}
				sumstartdata["zeroarr"]=[zeroarr[0]];
		thedate_data[thedate]=sumstartdata;
		}
		
		
		var data_row_key={};
		
		for(var thedate in thedate_data)
		{
			
			var day_data=thedate_data[thedate];
			for(var p in day_data)
			{
				var list=day_data[p];
				
				for(var i=0;i<list.length;i++)
				{
					
					if(list[i]&&list[i].length>=2)
					{
						var minstr=formatData(new Date(list[i][0]),"hhmm")
						var combineKey=thedate+"_"+minstr;
						if(!data_row_key[combineKey])
						{
							data_row_key[combineKey]={};
							data_row_key[combineKey]["miniute_5"]=thedate+"_"+minstr;
						  data_row_key[combineKey]["thedate"]=thedate;
						}
						
						data_row_key[combineKey][p]=list[i][1];
					}
				}
			}
						
		}
		
		var data_row_list=[];
		for(var p in data_row_key)
		{
			data_row_list.push(data_row_key[p]);
		}
		

		
	datasets={};



	var keysObj=makeDataSet();
	for(var p in keysObj)
	{
		var pos=keysObj[p];
		if(!datasets[pos])
		{
				datasets[pos]={};
		}
		
		for(var thedate in thedate_data)
		{
					var sumstartdata=thedate_data[thedate];

			if(sumstartdata[p]&&sumstartdata[p].length>0)
			{
					datasets[pos][p+"_"+thedate]={'data':sortData(sumstartdata[p]),'label':labelName[p][0]+"_"+thedate+"　　","Y":labelName[p][1],"ischoose":1};
			}
	}
}
		
		
		for(var p in datasets)
		{
		
		var choiceContainer = $("#choices_"+p);

	    var yaxisobj={};
	    var yi=1;
	    var i = 0;
	    $.each(datasets[p], function(key, val) {
	    		
	          val.color = i;
	        	var kkkk=val.Y;
	       	 	var yindex=yaxisobj[kkkk];
	       	 	if(!yindex)
	       	 	{
	       	 		yindex=yi;
	       	 		yaxisobj[kkkk]=yindex;
	       	 		yi++;
	       	 	}
	       	 	
	          val.yaxis = yindex;
	           yaxis: { max: 1 }
	
	        ++i;
	    });
	    
	    
	    choiceContainer.empty();
	     $("#placeholder_"+p).unbind("plothover");
	     
	     var label_a="";
	     var label_b="";
	    $.each(datasets[p], function(key, val) {
	    	
	    	var strdisable="";
	    	if(key.indexOf("zeroarr")>=0)
	    	{
	    		strdisable='disabled="disabled"';
	    	}
	    	
	    	var strcheck="";
	    	if(val["ischoose"]&&val["ischoose"]=="1")
	    	{
	    		strcheck="checked=\"checked\"";
	    	}
	    	
	    	var strlabel=' <input type="checkbox" '+strdisable+' name="' + key +
            '"  '+strcheck+' id="id' + key + '"   mdrillinfo="' + p + '" />' +
            '<label for="id' + key + '"  mdrillinfo="' + p + '"  >'
             + val.label + '</label>';
	    	if(val.label.indexOf("对比")>=0)
	    		{
	    		label_b+=strlabel;
	    		}else{
	    			
		    		label_a+=strlabel;
	    		}
	      }
	    
	    );
	    
	    choiceContainer.append(label_a+"<br>"+label_b);
	    choiceContainer.find("input").click(function(){plotAccordingToChoices($(this).attr("mdrillinfo"))});
	    plotAccordingToChoices(p);
	    
	  

	    
	  }
	  
	    $(document).ready(function() { 
	    showresultable(data_row_list);
	  });
}




function searchData(strtype,data)
{
	g_result[strtype]=data;
	if(!g_result["realtime"]||!g_result["hour"])
	{
		return ;
	}
	

	
	var filterdata={};
	mergerdata(filterdata,g_result["hour"],"hour");

	mergerdata(filterdata,g_result["realtime"],"realtime");

	showresult(filterdata);
	
}

function mergerdata(result,data,strtype)
{
	for(var thedate in data)
	{
		if(!result[thedate])
		{
			result[thedate]={};
		}
				
		for(var p in data[thedate])
		{
			if(!result[thedate][p])
			{
				result[thedate][p]=[];
			}
			
			 var miniute_list=filterData(data[thedate][p],strtype,thedate);
			for(var i=0;i<miniute_list.length;i++)
			{
				result[thedate][p].push(miniute_list[i]);
			}
			
		}
		
	}
}


	updateLegendTimeout = {};
	latestPosition = {};
	var previousPoint = {};
	var plot={};
