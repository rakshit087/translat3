// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Translat3 {
  uint256 public projectId;
  uint256 private paragraphId;

  struct Translation {
    uint256 id;
    uint256 text;
    address[] voters;
    uint256 votes;
  }

  struct Pragraph {
    uint256 id;
    string text;
    string[] translations;
  }

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
    Pragraph[] paragraphs;
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
  mapping(address => uint256[]) public authors;

  function postProject(
    string memory _title,
    string memory _description,
    string memory _primaryLanguage,
    string memory _translateTo,
    string[] memory _paragraphs
  ) external payable {
    require(msg.value > 0, "Initial funds needed");
    projects[projectId].id = projectId;
    projects[projectId].title = _title;
    projects[projectId].description = _description;
    projects[projectId].primaryLanguage = _primaryLanguage;
    projects[projectId].translateTo = _translateTo;
    projects[projectId].vault = msg.value;
    projects[projectId].author = msg.sender;
    projects[projectId].status = 0;
    for (uint256 i = 0; i < _paragraphs.length; i++) {
      Pragraph memory _paragraph;
      _paragraph.id = paragraphId++;
      _paragraph.text = _paragraphs[i];
      projects[projectId].paragraphs.push(_paragraph);
    }
    authors[msg.sender].push(projectId);
    projectId++;
  }

  function getProject(uint256 _id) public view returns (Project memory) {
    return projects[_id];
  }

  function getLatestPoolProjects(uint256 _flag) external view returns (Project[] memory) {
    require(projectId - ((_flag - 1) * 10) > 0);
    uint256 _localProjectId = projectId - ((_flag - 1) * 10);
    console.log("Local project id: ", _localProjectId);
    uint256 _count = 0;
    Project[] memory _projects = new Project[](10);
    while (_count < 10 && _localProjectId > 0) {
      if (projects[_localProjectId].status == 0) {
        _projects[_count] = projects[_localProjectId-1];
        _localProjectId--;
        _count++;
      }
    }
    return _projects;
  }

  function getLatestTranlationProjects(uint256 _flag) external view returns (Project[] memory) {
    require(projectId - ((_flag - 1) * 10) > 0);
    uint256 _localProjectId = projectId - ((_flag - 1) * 10);
    console.log("Local project id: ", _localProjectId);
    uint256 _count = 0;
    Project[] memory _projects = new Project[](10);
    while (_count < 10 && _localProjectId > 0) {
      if (projects[_localProjectId].status == 1) {
        _projects[_count] = projects[_localProjectId-1];
        _localProjectId--;
        _count++;
      }
    }
    return _projects;
  }

  function getLatestAuthorTranslationProjects(uint256 _flag) external view returns (Project[] memory) {
    require(authors[msg.sender].length - ((_flag - 1) * 10) > 0);
    uint256 _requiredCount = authors[msg.sender].length > 10 ? 10 : authors[msg.sender].length;
    uint256 _count = 0;
    uint256 _pointer = authors[msg.sender].length - ((_flag - 1) * 10);
    Project[] memory _projects = new Project[](_requiredCount);
    while (_count < _requiredCount) {
      if (projects[_pointer].status == 1) {
        _projects[_count] = projects[_pointer-1];
        _pointer--;
        _count++;
      }
    }
    return _projects;
  }
  function getLatestAuthorPoolProjects(uint256 _flag) external view returns (Project[] memory) {
    require(authors[msg.sender].length - ((_flag - 1) * 10) > 0);
    uint256 _requiredCount = authors[msg.sender].length > 10 ? 10 : authors[msg.sender].length;
    uint256 _count = 0;
    uint256 _pointer = authors[msg.sender].length - ((_flag - 1) * 10);
    Project[] memory _projects = new Project[](_requiredCount);
    while (_count < _requiredCount) {
      if (projects[_pointer].status == 0) {
        _projects[_count] = projects[_pointer-1];
        _pointer--;
        _count++;
      }
    }
    return _projects;
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

  //@TODO: Improve the security of this function
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
