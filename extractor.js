function topicl(classHandle, options) {
  // Extract raw classes
  var classInstancesRaw = document.getElementsByClassName(classHandle);

  // Convert to array
  var classInstanceArr = [].slice.call(classInstancesRaw);

  // Build documents and clean-up text
  var documents = classInstanceArr.map(function(classInstance) {
    var words = classInstance.innerHTML.split(/[ ,.–:;()]+/); // Pull out text from class instance
    return words.map(function(word) {
      var noHtmlWord = word.replace(/<\/?[^>]+(>|$)/g, ""); // Strip out html tags
      var noPunctuationWord = noHtmlWord.replace(/[’\/{}=\_`~]/g,""); // and within-word
      return noPunctuationWord.replace("&amp", "");
    }).filter(Boolean); // Remove empty strings
  });

  return documents;
};
