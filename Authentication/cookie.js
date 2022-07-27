
export default {

    checkCookie:function(cname) {
 
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
      
        for(let i = 0; i <ca.length; i++) {
        
      var count=0
       
      
      for(let j=0;j<ca[i].length;j++){
        if(ca[i][j]=="="){
          break
        }
        count++
      }
      
        if(ca[i].substring(0,count)===cname){
        return  true;
      
        }
        
        }
    
        
      
      },
      getCookie: function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
};




