import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// embedding model
import { OpenAIEmbeddings } from "@langchain/openai";
// to ingest documents
import { MemoryVectorStore } from "langchain/vectorstores/memory";
// to create Document chain
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

class PostGenerator {
  static instance: PostGenerator;

  #chain: any;
  //RunnableSequence<any, BaseMessageChunk>

  constructor() {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world class technical documentation writer."],
      ["user", "{input}"],
    ]);

    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const outputParser = new StringOutputParser();

    this.#chain = prompt.pipe(chatModel).pipe(outputParser);
  }

  async generatePostFromDocs() {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const loader = new CheerioWebBaseLoader(
      "https://docs.smith.langchain.com/overview"
    );

    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);

    console.log(splitDocs.length);
    console.log(splitDocs[0].pageContent.length);

    // initializing embedding vector
    const embeddings = new OpenAIEmbeddings();

    // ingesting document to embedding vector
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    // prompt for the document chain
    const prompt =
      ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:

      <context>
      {context}
      </context>

      Question: {input}`);

    // creating document chain
    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });

    // retriever to dynamically select the most relevant documents
    const retriever = vectorstore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    const result = await retrievalChain.invoke({
      input: "what is LangSmith?",
    });
    
    // console.log(result.answer);
    return result.answer;
  }

  async generatePost() {
    const resp = await this.#chain.invoke({
      input: "what is LangSmith?",
    });

    console.log("resp", resp);
  }
}

export const postGenerator = new PostGenerator();
