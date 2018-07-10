var Sequelize = require('sequelize');
var sequelize = new Sequelize('terrorism', 'terrorism', 'terrorism', {dialect: 'postgres'});

var Keyword = sequelize.define('keyword', {
  name: {type: Sequelize.STRING, unique: true, allowNull: false},
});

sequelize.sync().then(function() {
        
  listKeywords();
});

const scan = document.querySelector('#add-url');
scan.addEventListener('click', function(e){
    const urlField = document.querySelector('#url');
    const url = urlField.value;
    console.log(url);
});

const addKeywordButton = document.querySelector('#add-keyword');
addKeywordButton.addEventListener('click', function(e){
    const keywordField = document.querySelector('#add');
    const keyword = keywordField.value;
    addKeywordToDB(keyword);
});

function addKeywordToDB(keyword){
    keyword = keyword.trim();
    if (keyword === ''){
        return;
    }

    Keyword.findOrCreate({
        where: {name: keyword}
    }).spread(function(instance, created){
        if (created) {
        const keywordsField = document.querySelector('#keywords');
        const option = document.createElement('option');
        option.value = instance.name;
        option.textContent = instance.name;
        keywordsField.append(option);
    }
    })
}

function listKeywords(){
    Keyword.all().then(function(keywords) {
  const options = keywords.map(function(keyword){
      const option = document.createElement('option');
      option.value = keyword.name;
      option.textContent = keyword.name;
      return option;
  });
  const keywordsField = document.querySelector('#keywords');
  options.forEach(function(option){
    keywordsField.append(option);

  });
})
}
