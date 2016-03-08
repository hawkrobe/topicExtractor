function extractDocuments(classHandle, options) {
  // Initialize variables
  var wordCountDict = {};

  // Extract raw classes
  var classInstancesRaw = document.getElementsByClassName(classHandle);

  // Convert to array
  var classInstanceArr = [].slice.call(classInstancesRaw);

  // Build documents and clean-up text
  var documents = classInstanceArr.map(function(classInstance) {

    // Pull out list of words from class instance
    var words = classInstance.innerHTML.split(/[ ,.–:;()?"]+/);

    // Strip words of html tags & punctuation, count, remove empty strings
    return words.map(function(rawWord) {
      var word = stripWord(rawWord);
      if (wordCountDict[word] === undefined) {
	wordCountDict[word] = 1;
      } else {
	wordCountDict[word] += 1;
      }
      return word;
    }).filter(Boolean);
  });

  // Find words that occur more than twice
  var commonWords = _.filter(_.keys(wordCountDict), function(key) {
    return wordCountDict[key] > 2;
  });

  return wordsToIndices(documents, commonWords);
};

function stripWord(word) {
  return word
    .toLowerCase()
    .replace(/<\/?[^>]+(>|$)/g, "")  // Strip out html tags
    .replace(/[’\/{}=\_`~]/g,"")  // Strip out within-word punctuation
    .replace("&amp", ""); // Strip out weird ampersand thing
};

function wordsToIndices(documents, commonWords) {
  var wordToIndexDict = {};
  var indexToWordDict = {};
  var index = 0;

  var documentsByIndex = documents.map(function(doc){
    return doc.map(function(word) {
      if (_.contains(commonWords, word) & !_.contains(STOP_WORDS, word)) {
	if (wordToIndexDict[word] === undefined) {
          wordToIndexDict[word] = index;
	  indexToWordDict[index] = word;
          index++;
	}
	return wordToIndexDict[word];
      } else {
	return "nullWord";
      }
    }).filter(function(x){return x != "nullWord";});
  });

  console.log("Number of unique words: " + (index - 1));

  return {
    wordToIndexDict: wordToIndexDict,
    indexToWordDict: indexToWordDict,
    documents: documentsByIndex,
    documentsAsCounts: docsAsCounts(documentsByIndex,index),
    origDocuments: documents,
    numWords : index
  };
}

function docsAsCounts(docs, numWords) {
  return docs.map(function(doc){
    //init count vector to zeros
    var counts = _.range(0, numWords, 0)
    doc.forEach(function(v,i){counts[v]++})
    return counts
  })
}

function topTenWords(mhResults, data){
  var mapKey = _.keys(mhResults.hist)[0];
  var mapVal = mhResults.hist[mapKey].val;
  return _.mapObject(mapVal, function(weights, topic) {
    var sortedWeights = _.sortBy(weights, function(num){return num;}).slice(-10);
    console.log("sorted weights" + sortedWeights);
    sortedWeights.reverse();
    console.log("sliced & reversed:" + sortedWeights);
    return sortedWeights.map(function(val) {
      // Get index in list, then get corresponding word
      return data.indexToWordDict[_.indexOf(weights, val)];
    });
  });
};

var STOP_WORDS = ["a", "about", "above", "across", "after", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "among", "an", "and", "another", "any", "anybody", "anyone", "anything", "anywhere", "are", "area", "areas", "around", "as", "ask", "asked", "asking", "asks", "at", "away", "b", "back", "backed", "backing", "backs", "be", "became", "because", "become", "becomes", "been", "before", "began", "behind", "being", "beings", "best", "better", "between", "big", "both", "but", "by", "c", "came", "can", "cannot", "case", "cases", "certain", "certainly", "clear", "clearly", "come", "could", "d", "did", "differ", "different", "differently", "do", "does", "done", "down", "down", "downed", "downing", "downs", "during", "e", "each", "early", "either", "end", "ended", "ending", "ends", "enough", "even", "evenly", "ever", "every", "everybody", "everyone", "everything", "everywhere", "f", "face", "faces", "fact", "facts", "far", "felt", "few", "find", "finds", "first", "for", "four", "from", "full", "fully", "further", "furthered", "furthering", "furthers", "g", "gave", "general", "generally", "get", "gets", "give", "given", "gives", "go", "going", "good", "goods", "got", "great", "greater", "greatest", "group", "grouped", "grouping", "groups", "h", "had", "has", "have", "having", "he", "her", "here", "herself", "high", "high", "high", "higher", "highest", "him", "himself", "his", "how", "however", "i", "if", "important", "in", "interest", "interested", "interesting", "interests", "into", "is", "it", "its", "itself", "j", "just", "k", "keep", "keeps", "kind", "knew", "know", "known", "knows", "l", "large", "largely", "last", "later", "latest", "least", "less", "let", "lets", "like", "likely", "long", "longer", "longest", "m", "made", "make", "making", "man", "many", "may", "me", "member", "members", "men", "might", "more", "most", "mostly", "mr", "mrs", "much", "must", "my", "myself", "n", "necessary", "need", "needed", "needing", "needs", "never", "new", "new", "newer", "newest", "next", "no", "nobody", "non", "noone", "not", "nothing", "now", "nowhere", "number", "numbers", "o", "of", "off", "often", "old", "older", "oldest", "on", "once", "one", "only", "open", "opened", "opening", "opens", "or", "order", "ordered", "ordering", "orders", "other", "others", "our", "out", "over", "p", "part", "parted", "parting", "parts", "per", "perhaps", "place", "places", "point", "pointed", "pointing", "points", "possible", "present", "presented", "presenting", "presents", "problem", "problems", "put", "puts", "q", "quite", "r", "rather", "really", "right", "right", "room", "rooms", "s", "said", "same", "saw", "say", "says", "second", "seconds", "see", "seem", "seemed", "seeming", "seems", "sees", "several", "shall", "she", "should", "show", "showed", "showing", "shows", "side", "sides", "since", "small", "smaller", "smallest", "so", "some", "somebody", "someone", "something", "somewhere", "state", "states", "still", "still", "such", "sure", "t", "take", "taken", "than", "that", "the", "their", "them", "then", "there", "therefore", "these", "they", "thing", "things", "think", "thinks", "this", "those", "though", "thought", "thoughts", "three", "through", "thus", "to", "today", "together", "too", "took", "toward", "turn", "turned", "turning", "turns", "two", "u", "under", "until", "up", "upon", "us", "use", "used", "uses", "v", "very", "w", "want", "wanted", "wanting", "wants", "was", "way", "ways", "we", "well", "wells", "went", "were", "what", "when", "where", "whether", "which", "while", "who", "whole", "whose", "why", "will", "with", "within", "without", "work", "worked", "working", "works", "would", "x", "y", "year", "years", "yet", "you", "young", "younger", "youngest", "your", "yours", "z"];

module.exports = {
  extractDocuments : extractDocuments,
  topTenWords : topTenWords
};
