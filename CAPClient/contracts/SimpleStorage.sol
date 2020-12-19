// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
  struct patientData{
    string CIP;
    uint lastCheck;
    bool hasCheckedIn;
    uint CAP;
    bool exists;
  }

  mapping(address => patientData) patients;
  mapping(string => address) addressFromCIP;
  mapping(uint => string[]) patientsFromCAP;
  mapping(uint => uint) activePatientsFromCAP;
  mapping(address => uint) CAPs;

  uint CAPnumber = 0;

  function registerCAP() external {
    CAPnumber = CAPnumber+1;
    CAPs[msg.sender] = CAPnumber;
  }

  function registerPatient(address patientAddress, string calldata CIP) external{
    patientData memory data;
    data.CIP = CIP;
    data.lastCheck = now;
    data.CAP = CAPs[msg.sender];
    data.exists = true;
    patients[patientAddress] = data;
    addressFromCIP[CIP] = patientAddress;
    patientsFromCAP[CAPs[msg.sender]].push(CIP);
    activePatientsFromCAP[CAPs[msg.sender]] = activePatientsFromCAP[CAPs[msg.sender]]+1;
  }

  function getAllPatientsFromCAP() external returns( patientData[] memory){
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

  /*event test(address from, uint number);

  function set(uint x) public {
    storedData = x;
    emit test(msg.sender, x);
  }

  function get() public view returns (uint) {
    return storedData;
  }*/
}
