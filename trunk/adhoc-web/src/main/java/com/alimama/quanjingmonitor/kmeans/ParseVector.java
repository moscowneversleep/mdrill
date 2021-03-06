package com.alimama.quanjingmonitor.kmeans;

import org.apache.hadoop.conf.Configuration;

public class ParseVector {
	
	Number[][] importcols=null;
	Number[][] importcolsNumber=null;
	Number[][] StringCols=null;
	Number[][] NumbericCols=null;
	public void setup(Configuration conf)
	{
		String abtestconfig=conf.get("abtest.kmeans.config");
		String[] cols=abtestconfig.split(";");
		this.importcols=this.Trans(cols[0].split(","));
		this.importcolsNumber=this.Trans(cols[1].split(","));
		this.StringCols=this.Trans(cols[2].split(","));
		this.NumbericCols=this.Trans(cols[3].split(","));
	}
	
	private Number[][] Trans(String[] StringCols)
	{
		Number[][] rtn=new Number[StringCols.length][];
		for(int i=0;i<rtn.length;i++)
		{
			String[] cols=StringCols[i].split("@");
			rtn[i]=new Number[3];
			rtn[i][0]=Integer.parseInt(cols[0]);
			rtn[i][1]=10;//maxdiff	
			rtn[i][2]=1.0;//weight
			if(cols.length>1)
			{
				rtn[i][1]=parseDouble(cols[1]);
			}
			if(cols.length>2)
			{
				rtn[i][2]=parseDouble(cols[2]);
			}

		}
		return rtn;
	}
	public Vector parseVector(String line)
	{
		String[] cols=line.split("\001",-1);
		if(cols.length<3)
		{
			return null;
		}
		Vector rtn=new Vector();
		for(Number[] index:importcols)
		{
			rtn.addImportand("im_"+String.valueOf(index[0].intValue()), cols[index[0].intValue()], index[2].doubleValue()*10);
		}
		
		for(Number[] index:importcolsNumber)
		{
			rtn.addImporatnt(String.valueOf(index[0].intValue()), parseDouble(cols[index[0].intValue()]), index[2].doubleValue()*5,index[1].doubleValue());//
		}
		for(Number[] index:StringCols)
		{
			rtn.add(String.valueOf(index[0].intValue()), cols[index[0].intValue()],index[2].doubleValue());
		}
		
		for(Number[] index:NumbericCols)
		{
			rtn.add(String.valueOf(index[0].intValue()), parseDouble(cols[index[0].intValue()]), index[2].doubleValue());
		}
		return rtn;
	}
	
	public double parseDouble(String num)
	{
		if(num.isEmpty())
		{
			return 0d;
		}
		try{
			return Double.parseDouble(num);
		}catch (Throwable e) {
			return 0d;
		}
	}
	
	
	public String parseKey(String line)
	{
		String[] cols=line.split("\001",-1);
		if(cols.length<3)
		{
			return "";
		}	
		StringBuffer buff=new StringBuffer();
		for(Number[] index:importcols)
		{
			buff.append("@").append(cols[index[0].intValue()]);
		}
		
		for(Number[] index:importcolsNumber)
		{
			double div=parseDouble(cols[index[0].intValue()])/(index[1].intValue()*2);
			buff.append("@").append((int)div);
		}
		return buff.toString();
		
	}
}
