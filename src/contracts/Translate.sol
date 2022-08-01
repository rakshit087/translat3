// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Translat3 {
  
  uint256 public projectId;
  struct Project {
    uint256 id;
    address author;
    string title;
    string description;
    string primaryLanguage;
    string translateTo;
    //0 => at pooling phase, 1 => at translation phase, 2 => finished
    uint256 status;
    uint256 vault;
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

  function addProject(
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

  function fundProject(uint256 _projectId) external payable {
    Project memory _project = projects[_projectId];
    require(_project.status == 0);
    _project.vault += msg.value;
  }

  function toTranslationPhase(uint256 _projectId) external {
    require(msg.sender == projects[_projectId].author);
    require(projects[_projectId].status == 0);
    projects[_projectId].status = 1;
  }

  function distribute(uint256 _projectId, Distribution memory _distribution) external payable {
    Project memory _project = projects[_projectId];
    require(_project.author == msg.sender);
    require(_project.status == 1);
    uint256 _totalAmount = 0;
    for (uint256 i = 0; i <= _distribution.length; i++) {
      _totalAmount += _distribution.amount[i];
    }
    require(_totalAmount <= _project.vault);
    for (uint256 i = 0; i <= _distribution.length; i++) {
      translators[_distribution.translators[i]].vault += _distribution.amount[i];
    }
    _project.vault -= _totalAmount;
    _project.status = 2;
  }
}
