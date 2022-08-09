// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Translat3 is Ownable {
  uint256 public projectId;
  uint256 private paragraphId;
  uint256 private traslateId;

  struct Translation {
    uint256 id;
    string text;
    address author;
    address[] voters;
    uint256 votes;
  }

  struct Pragraph {
    uint256 id;
    string text;
    uint256[] translations;
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
    uint256[] paragraphs;
  }

  struct Translator {
    address id;
    uint256 vault;
  }

  struct Author {
    address id;
    uint256[] projects;
  }

  struct Distribution {
    address[] translators;
    uint256[] amount;
  }

  mapping(address => Translator) public translators;
  mapping(uint256 => Project) public projects;
  mapping(uint256 => Pragraph) public paragraphs;
  mapping(uint256 => Translation) public translations;
  mapping(address => Author) public authors;

  //Posting Project
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
      _paragraph.id = paragraphId;
      _paragraph.text = _paragraphs[i];
      projects[projectId].paragraphs.push(paragraphId);
      paragraphs[paragraphId] = _paragraph;
      paragraphId++;
    }
    authors[msg.sender].projects.push(projectId);
    projectId++;
  }

  //Posting Translation
  function postTranslation(
    uint256 _projectId,
    uint256 _paragraphId,
    string memory _text
  ) external {
    require(projects[_projectId].status == 1, "Project is not in translation phase");
    Translation memory _translation;
    _translation.id = traslateId;
    _translation.text = _text;
    _translation.author = msg.sender;
    paragraphs[_paragraphId].translations.push(traslateId);
    translations[traslateId] = _translation;
    traslateId++;
  }

  //Voting for Translation
  function vote(uint256 _translationId) external {
    require(translations[_translationId].author != msg.sender, "You can't vote for your own translation");
    //Check if already voted
    for (uint256 i = 0; i < translations[_translationId].voters.length; i++) {
      if (translations[_translationId].voters[i] == msg.sender) {
        return;
      }
    }
    translations[_translationId].voters.push(msg.sender);
    translations[_translationId].votes++;
  }

  //Get the project details
  function getProject(uint256 _id) public view returns (Project memory) {
    return projects[_id];
  }

  //Get Latest Projects, flag is page number
  function getLatestProjects(uint256 _flag, uint256 _status) external view returns (Project[] memory) {
    require(projectId - ((_flag - 1) * 10) > 0);
    uint256 _localProjectId = projectId - ((_flag - 1) * 10);
    console.log("Local project id: ", _localProjectId);
    uint256 _count = 0;
    Project[] memory _projects = new Project[](10);
    while (_count < 10 && _localProjectId > 0) {
      if (projects[_localProjectId - 1].status == _status) {
        _projects[_count] = projects[_localProjectId - 1];
        _count++;
      }
      _localProjectId--;
    }
    return _projects;
  }

  //Get Translator Vault
  function getTranslatorVault() external view returns (uint256) {
    return translators[msg.sender].vault;
  }

  //Get Author Projects
  function getAuthorProjects() external view returns (Project[] memory) {
    require(authors[msg.sender].projects.length > 0);
    Project[] memory _projects = new Project[](authors[msg.sender].projects.length);
    for (uint256 i = 0; i < authors[msg.sender].projects.length; i++) {
      _projects[i] = projects[authors[msg.sender].projects[i]];
    }
    return _projects;
  }

  function getProjectParagraphs(uint256 _id) external view returns (Pragraph[] memory) {
    Pragraph[] memory _paragraphs = new Pragraph[](projects[_id].paragraphs.length);
    for (uint256 i = 0; i < projects[_id].paragraphs.length; i++) {
      _paragraphs[i] = paragraphs[projects[_id].paragraphs[i]];
    }
    return _paragraphs;
  }

  function getParagraphTranslations(uint256 _paragraphId) external view returns (Translation[] memory) {
    Translation[] memory _translations = new Translation[](paragraphs[_paragraphId].translations.length);
    for (uint256 i = 0; i < paragraphs[_paragraphId].translations.length; i++) {
      _translations[i] = translations[paragraphs[_paragraphId].translations[i]];
    }
    return _translations;
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
  function distribute(uint256 _projectId, Distribution memory _distribution) external onlyOwner {
    require(projects[_projectId].status == 1);
    for (uint256 i = 0; i <= _distribution.translators.length; i++) {
      translators[_distribution.translators[i]].vault += _distribution.amount[i];
    }
    projects[_projectId].vault = 0;
    projects[_projectId].status = 2;
  }

  function withdrawVault() external {
    require(translators[msg.sender].vault > 0);
    payable(msg.sender).transfer(translators[msg.sender].vault);
    translators[msg.sender].vault = 0;
  }
}
