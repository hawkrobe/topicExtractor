library(rjson)
library(lda)
documentFile = "/Users/rxdh/Repos/topicl/testData/cocolabAbstractCorpus.json";
d = fromJSON(json_str = paste(readLines(documentFile), collapse=""))
numDocuments = length(d$documents)
vocab = as.character((unlist(d$indexToWordDict)))

d$ldaInput = d$documentsAsCounts

for(i in 1:numDocuments) {
  oldDocument <- d$documentsAsCounts[[i]]
  numWords <- length(oldDocument)
  newDocument <- NULL
  for(j in 1:numWords) {
    if(oldDocument[j] != 0) {
      newDocument <- cbind(newDocument, c(as.integer(j-1), as.integer(oldDocument[j])));
    }
  }
  d$ldaInput[[i]] = newDocument
}

K <- 5 # num topics

result <- lda.collapsed.gibbs.sampler(d$ldaInput, K, vocab, 1000, 0.1, 0.1, compute.log.likelihood=TRUE)

N <- 5 # num documents to display

top.words <- top.topic.words(result$topics, 5, by.score=TRUE)
top.words
topic.proportions <- t(result$document_sums) / colSums(result$document_sums)
topic.proportions <- topic.proportions[sample(1:dim(topic.proportions)[1], N),]
topic.proportions[is.na(topic.proportions)] <-  1 / K
colnames(topic.proportions) <- apply(top.words, 2, paste, collapse=" ")
topic.proportions.df <- melt(cbind(data.frame(topic.proportions),
                                   document=factor(1:N)),
                                   variable.name="topic",
                                   id.vars = "document")
(ggplot(topic.proportions.df, aes(x = topic, y = value, fill=document))
  + ylab("proportion")
  + geom_bar(stat="identity", position = "dodge") 
  + theme(axis.text.x = element_text(angle=90, hjust=1)) 
  + facet_wrap(~ document, ncol=5))
