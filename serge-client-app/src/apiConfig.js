const sergeApis = {
    production: "https://whispering-springs-35839.herokuapp.com",
    development: "http://localhost:3000",
  };
  
  let sergeApi = sergeApis.development;
  // if (window.location.hostname === "localhost") {
  //   sergeApi = sergeApis.development;
  // } else {
  //   sergeApi = sergeApis.production;
  // }
  
export default sergeApi;