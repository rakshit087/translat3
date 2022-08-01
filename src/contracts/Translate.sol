// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Translat3 {
  
  uint256 public projectId;

  struct Project {
    uint256 id;
    //0 => at pooling phase, 1 => at translation phase, 2 => finished
    uint256 status;
    uint256 vault;
    string title;
    string description;
    string primaryLanguage;
    string translateTo;
    address author;
  }

  struct Translator {
    address id;
    uint256 vault;
  }

  struct Distribution {
    address[] translators;
    uint256[] amount;
    uint256 length;
  }

  mapping(address => Translator) public translators;
  mapping(uint256 => Project) public projects;

  function postProject(
    string memory _title,
    string memory _description,
    string memory _primaryLanguage,
    string memory _translateTo
  ) external payable {
    require(msg.value > 0, "Initial funds needed");
    Project memory _project;
    _project.title = _title;
    _project.description = _description;
    _project.primaryLanguage = _primaryLanguage;
    _project.translateTo = _translateTo;
    _project.vault = msg.value;
    _project.author = msg.sender;
    projects[projectId] = _project;
    projectId++;
  }

  function getProject(uint256 _id) public view returns (Project memory) {
    return projects[_id];
  }

  function fundProject(uint256 _projectId) external payable {
    require(projects[_projectId].status == 0, "Project is not in pooling phase");
    projects[_projectId].vault += msg.value;
  }

  function toTranslationPhase(uint256 _projectId) external {
    require(msg.sender == projects[_projectId].author);
    require(projects[_projectId].status == 0);
    projects[_projectId].status = 1;
  }

  function distribute(uint256 _projectId, Distribution memory _distribution) external payable {
    require(projects[_projectId].author == msg.sender);
    require(projects[_projectId].status == 1);
    uint256 _totalAmount = 0;
    for (uint256 i = 0; i <= _distribution.length; i++) {
      _totalAmount += _distribution.amount[i];
    }
    require(_totalAmount <= projects[_projectId].vault);
    for (uint256 i = 0; i <= _distribution.length; i++) {
      translators[_distribution.translators[i]].vault += _distribution.amount[i];
    }
    projects[_projectId].vault -= _totalAmount;
    projects[_projectId].status = 2;
  }
}
