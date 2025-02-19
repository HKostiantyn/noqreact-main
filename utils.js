import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (keyName,value) => {
    try {
      await AsyncStorage.setItem(keyName, value);
    } catch (e) {
      // saving error
    }
  };


  export const getStorData = async (keyName) => {
    try {
      const value = await AsyncStorage.getItem(keyName);
      if (value !== null) {
        return value
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };


  export const removeValue = async (keyName) => {
    try {
      await AsyncStorage.removeItem(keyName)
    } catch(e) {
      // remove error
    }
    }

    export const getParameterByName = (name, url) => {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
    export const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    export const getFormatContact = (data,deviceToken) => {

      try{
     
        if (data && data.length > 0) {
          const filters = data.filter((x,i)=> x?.phoneNumbers?.[0]?.number || x?.phoneNumbers?.[1]?.number)
          const syncContact = filters.map((x) => {
              return {
                phone: x?.phoneNumbers?.[0]?.number || x?.phoneNumbers?.[1]?.number || '',
                contact_name: `${x?.displayName || 'No Name'}`,
                device_id: deviceToken,
                user_email: null,
              };
          });
          return syncContact
        }else{
        }
      }
      catch(error){
        console.log(error,"ERRROOROOROROR:")
      }
     
    };

    export const updateFormatContact = (data,deviceToken) => {
      try{
        if (data && data.length > 0) {
          const filters = data.filter((x,i)=> x?.phoneNumbers?.[0]?.number || x?.phoneNumbers?.[1]?.number)
          const syncContact = filters.map((x) => {
              return {
                phone: x?.phoneNumbers?.[0]?.number || x?.phoneNumbers?.[1]?.number || '',
                contact_name: `${x?.displayName || 'No Name'}`
              };
          });
          return syncContact
        }else{
        }
      }
      catch(error){
        console.log(error,"ERRROOROOROROR:")
      }
     
    };