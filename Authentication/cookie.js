
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
        return  true;}}
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
  },
      
      setCookie:function(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
       }



};




