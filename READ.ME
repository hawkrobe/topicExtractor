Overall description
-------------------

This will be a js widget that you include in your web page to provide topics and topic-based ranking. You call `topicl(classHandle, options)` with a dom class, where the class should occur a lot of times on the page and each instance should contain some text. It extracts the text from each class instance to make a corpus, and runs a topic model over it. It returns an object with:
* topics in some simple format.
* an object that maps dom elements of the given class to topic weights.
* a new dom element that can be inserted to visualize the topics.
* a ranker that will return the class instances in rank-order for a given topic.
* some representation of the variational params so that inference can be continued?

Components
----------
* ```extractDocuments(classHandle)``` : given a class string, extract text from all the dom elements with that id, using the following steps:
	* Clean: take each dom element, strip out junk html, punctuation, stop words, and words appearing only one or two times.
	* Tokenize: make a dictionary from tokens to index numbers, turn documents into indices. 

* ```infer(corpus)``: run LDA over the tokenized corpus to get topic vectors and docTopic vectors.
	* Works for MH and Variational (in small batches). 
	* Collapsed LDA is implemented, but very slow.
	* Extract the relevant info from webppl inference.

* ```display(ldaResults)```: TODO: create/insert a dom element that shows the topics.
	* Re-order: make a helper function that re-orders (or re-colors or such) the target dom elements when a user clicks on a topic.

To-do
-----------

* Streaming: for pages that are updated over time (e.g. comments threads), do a few more gradient steps (for VI) each time.
* Browser pluggin: make a pluggin that does this for any web page. To show the right class, maybe click a few examples?
* Timeline: if there are dates associated to the entries (eg the year in our pubs) make a plot showing the prevalence of each topic over time.
