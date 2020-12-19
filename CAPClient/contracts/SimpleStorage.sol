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

  event patientRegistered(string CIP);
  event CAPRegistered(uint id);
  event symptomsAdded(address);
  event patientWithFeverFound(address);

  function registerCAP(uint threshold) external {
    CAPnumber = CAPnumber+1;
    CAPs[msg.sender] = CAPnumber;
    CAPThreshold[CAPnumber] = threshold;

    emit CAPRegistered(CAPnumber);
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

    emit patientRegistered(CIP);
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

  function addSymptoms(uint fever) public {
    symptoms memory data = symptoms({date: now, fever:fever});
    symptomsFromPatient[msg.sender].push(data);
    patients[msg.sender].hasCheckedIn = true;
    patients[msg.sender].lastCheck = now;


    emit symptomsAdded(msg.sender);
    if(fever > 3700){
      emit patientWithFeverFound(msg.sender);
    }
  }

  function getCAPThreshold() external view returns(uint){
    return CAPThreshold[CAPs[msg.sender]];
  }
  
}
