public with sharing class weatherAppController {
    
    @AuraEnabled
    public static String getWeatherDetails(String cityname){
     String url='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&units=metric&appid='+getKey();
     String response=getResponse(url);

     return response;
    }

    public static string getKey(){
        String key ='c5e83120ba549c02da1de296dd3ca8ff';
        return key;
    }

   
    
    public static string getResponse(String url){

        try {
            Http h=new Http();
            HttpRequest req=new HttpRequest();
            HttpResponse res=new HttpResponse();
            req.setMethod('GET');
            req.setEndpoint(url);
            req.setTimeout(120000);
            res=h.send(req);
            String responseBody=res.getBody();
            return responseBody;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
      
    }
}