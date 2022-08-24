# TW_Registry
The base FHIR Specification is a platform specification - a specification on which all sorts of different solutions are built. The specification focuses on defining capabilities, and creating an ecosystem. National standards, vendor consortiums, clinical societies, etc publish "implementation guides" that define how the capabilities defined by the FHIR specification are used in particular data exchanges, or to solve particular problems. Here is a list of some of the implementation guides defined by the FHIR community:

![image](https://user-images.githubusercontent.com/81738019/186425973-96ed4a2f-084d-4359-95d4-8a1d2296cef0.png)

## How to deploy
**1. Requirement** 
* [Node.js](https://nodejs.org/zh-tw/download/) > 16
* BackEnd --> main 
 
**2. Clone the repo**  
``` 
$ git clone https://gitlab.dicom.tw/webgroup/twregistry.git 
``` 
 
**3. Install dependencies**  
``` 
$ npm install  
``` 
 
**4. Config api Url** 
 
Proxy Setting example (./.env)
``` 
REACT_APP_BASE_URL = http://localhost:8080
```  
 
**5. Run the app**  
``` 
$ npm run start 
``` 

**6. Build the to Static Webpage**  
``` 
$ npm run build
``` 
After entering Folder in the ./build 

## Dependent module
* [react](https://www.npmjs.com/package/react) (18.2.0)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)(6.3.0)
* [antd](https://www.npmjs.com/package/antd)(4.22.5)
* [axios](https://www.npmjs.com/package/axios)(0.27.2)
* [react-cookie](https://www.npmjs.com/package/react-cookie)(4.1.1)
* [redux](https://www.npmjs.com/package/redux)(4.2.0)
* [react-redux](https://www.npmjs.com/package/react-redux)(8.0.2)
* [universal-cookie](https://www.npmjs.com/package/universal-cookie)(4.0.4)

## Author
* [johnny990628](https://github.com/johnny990628)
* [Louis](https://github.com/Yang-Jiaxiang)

## Refer to 
[HL7 FHIR Foundation Enabling health interoperability through FHIR](http://fhir.org/guides/registry/)  
[TW Core IG](http://hitstdio.ntunhs.edu.tw/ig/twcore/index.html)


