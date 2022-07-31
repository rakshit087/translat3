// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Translat3 {
  uint256 public projectId;
  struct Project {
    uint256 id;
    address author;
    string title;
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

  function fundProject(uint256 _projectId) external payable {
    Project memory _project = projects[_projectId];
    require(_project.status == 0);
    _project.vault += msg.value;
  }

  function distribute(uint256 _projectId, Distribution memory _distribution) external payable {
    Project memory _project = projects[_projectId];
    require(_project.author == msg.sender);
    uint256 _totalAmount;
    for (uint256 i = 0; i <= _distribution.length; i++) {
      _totalAmount += _distribution.amount[i];
    }
    require(_totalAmount <= _project.vault);
    for (uint256 i = 0; i <= _distribution.length; i++) {
      translators[_distribution.translators[i]].vault += _distribution.amount[i];
    }
    _project.vault -= _totalAmount;
  }
}
