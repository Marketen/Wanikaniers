// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {

  struct symptoms{
    uint date;
    uint fever;
  }

  struct patientData{
    string CIP;
    string email;
    uint registerTime;
    uint lastCheck;
    bool hasCheckedIn;
    uint CAP;
    //symptoms[] symptomsArray;
    bool exists;
  }

  mapping(address => symptoms[]) symptomsFromPatient;
  mapping(address => patientData) patients;
  mapping(string => address) addressFromCIP;
  mapping(uint => string[]) patientsFromCAP;
  mapping(uint => uint) activePatientsFromCAP;
  mapping(address => uint) CAPs;
  mapping(uint => uint) CAPThreshold;

  uint CAPnumber = 0;

  event patientRegistered(string CIP, string email);
  event CAPRegistered(uint id, address);
  event symptomsAdded(address);
  event patientWithFeverFound(patientData);

  function registerCAP(uint threshold) external {
    CAPnumber = CAPnumber+1;
    CAPs[msg.sender] = CAPnumber;
    CAPThreshold[CAPnumber] = threshold;

    emit CAPRegistered(CAPnumber, msg.sender);
  }

  function registerPatient(address patientAddress, string calldata CIP, string calldata email) external{
    patientData memory data;
    data.CIP = CIP;
    data.email = email;
    data.registerTime = now;
    data.lastCheck = now;
    data.CAP = CAPs[msg.sender];
    data.exists = true;
    patients[patientAddress] = data;
    addressFromCIP[CIP] = patientAddress;
    patientsFromCAP[CAPs[msg.sender]].push(CIP);
    activePatientsFromCAP[CAPs[msg.sender]] = activePatientsFromCAP[CAPs[msg.sender]]+1;

    emit patientRegistered(CIP,email);
  }

  function getAllPatientsFromCAP() external view returns( patientData[] memory){
    patientData[] memory ret = new patientData[](activePatientsFromCAP[CAPs[msg.sender]]);
    uint i = 0;
    uint retI = 0;
    for(i=0; i<activePatientsFromCAP[CAPs[msg.sender]]; ++i){
      if(patients[addressFromCIP[patientsFromCAP[CAPs[msg.sender]][i]]].exists){
        ret[retI] = patients[addressFromCIP[patientsFromCAP[CAPs[msg.sender]][i]]];
        ++retI;
      }
    }
    return ret;
  }

  function getSymptomsfromCIP(string calldata CIP) external returns(symptoms[] memory){
    address patient = addressFromCIP[CIP];
    return symptomsFromPatient[patient];
  }

  function getPatientfromCIP(string calldata CIP) external returns(patientData memory){
    address patient = addressFromCIP[CIP];
    return patients[patient];
  }

  function searchPatientSymptoms(string calldata CIP) external {
    //symptomsFromPatient[address];
  }

  function addSymptoms(uint fever) public {
    symptoms memory data = symptoms({date: now, fever:fever});
    symptomsFromPatient[msg.sender].push(data);
    patients[msg.sender].hasCheckedIn = true;
    patients[msg.sender].lastCheck = now;


    emit symptomsAdded(msg.sender);
    if(fever > 3700){
      emit patientWithFeverFound(patients[msg.sender]);
    }
  }

  function getCAPThreshold() external view returns(uint){
    return CAPThreshold[CAPs[msg.sender]];
  }

  function getCAPNumber() external view returns(uint){
    return CAPs[msg.sender];
  }

  function patientExists() external returns(bool){
    if(patients[msg.sender].exists) return true;
    return false;
  }
  
}
