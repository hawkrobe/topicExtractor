function topicl(classHandle, options) {
  // Extract raw classes
  var classInstancesRaw = document.getElementsByClassName(classHandle);

  // Convert to array
  var classInstanceArr = [].slice.call(classInstancesRaw);

  // Build documents and clean-up text
  var documents = classInstanceArr.map(function(classInstance) {

    // Pull out list of words from class instance
    var words = classInstance.innerHTML.split(/[ ,.–:;()?"]+/);

    // Strip words of html tags & punctuation, remove empty strings
    return words.map(function(word) {
      return stripWord(word);
    }).filter(Boolean); 
  });
  
  return documents;
};

function stripWord(word) {
  return word
    .replace(/<\/?[^>]+(>|$)/g, "")  // Strip out html tags
    .replace(/[’\/{}=\_`~]/g,"")  // Strip out within-word punctuation
    .replace("&amp", ""); // Strip out weird ampersand thing
};
